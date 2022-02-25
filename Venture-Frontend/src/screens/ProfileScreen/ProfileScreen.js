import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import React, { useState, useEffect, useRef, createRef } from 'react';
import { color } from 'react-native-reanimated';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setAuthenticationKey, resetLogin } from '../../store/LoginReducer';
import axios from 'axios';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import md5 from 'md5';

const ProfileScreen = () => {
  const Navigation = useNavigation();
  const isFocused = useIsFocused();
  const CustomerData = useSelector((state: RootState) => state.data);
  const SpecificCustomerURL = global.API_URL + '/customer/specific?id=' + CustomerData.UserID;
  const UpdateCustomerURL = global.API_URL + '/customer/specific';
  const dispatch = useDispatch();
  //const [Customer, setCustomer] = useState({});
  const [Loading, setLoading] = useState(true);
  const [UserFirstName, setUserFirstName] = useState(null);
  const [UserLastName, setUserLastName] = useState(null);
  const [UserEmail, setUserEmail] = useState(null);
  const [UserDOB, setUserDOB] = useState(new Date());
  const [UserGender, setUserGender] = useState("");
  const [UserNumber, setUserNumber] = useState(null);
  const [UserPassword, setUserPassword] = useState(null);
  const [ShowDateTimePicker, setShowDateTimePicker] = useState(false);
  const DOBInputRef = useRef();
  const PasswordInputRef = createRef();

  if (Loading) {
    <ActivityIndicator size="large" />;
  }

  useEffect(() => {
    if (isFocused) {
      // console.log("Focused");
      getCustomerData();
    }
  }, [isFocused]);

  const getCustomerData = async () => {
    setLoading(true);
    const res = await axios
      .get(SpecificCustomerURL, {
        headers: { Authorization: CustomerData.AuthenticationKey },
      })
      .then(response => {
        let Customer = response.data.customer;
        setUserFirstName(Customer.firstName);
        setUserLastName(Customer.lastName);
        setUserEmail(Customer.email);
        setUserGender(Customer.gender.trim());
        setUserNumber(Customer.phone);
        setUserDOB(new Date(Customer.dateOfBirth));
        // console.log(Customer);
      })
      .catch(error => {
        if (error.response) {
          const ErrorResponse = JSON.parse(error.request.response);
          Alert.alert('Customer Profile Error', ErrorResponse.errorMessage, [
            { text: 'OK', onPress: () => null },
          ]);
        } else {
          console.log(error);
        }
      });
    setLoading(false);
  };

  const onlyFirstLetterCapital = word => {
    word = word.charAt(0) + word.slice(1).toLowerCase();
    return word;
  };

  const parseDateTime = (strDateTime) => {
    const dt = new Date(strDateTime);
    //const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dt, 'MMMM do, yyyy');
  };

  const onUserBirthChange = (event, DOBInput) => {
    const currentDate = DOBInput || UserDOB;
    setShowDateTimePicker(Platform.OS === 'ios');
    setUserDOB(currentDate);
    DOBInputRef.current.blur();
    DOBInputRef.current.setNativeProps({
      text: parseDateTime(currentDate, 'MMMM do, yyyy'),
    });
  };

  const onSubmit = async () => {
    //console.log(UserGender.toUpperCase() == "MALE".toUpperCase());    
    // console.log("+" + UserGender.toUpperCase() + "+");
    //console.log(UserGender.toUpperCase() == "MALE");
    //console.log("MALE".equals("MALE"));
    if (UserGender.toUpperCase() != 'MALE' && UserGender.toUpperCase() != 'FEMALE') {
      Alert.alert('Gender can only be "MALE" or "FEMALE"');
      return
    }

    const passwordDidNotChanged = UserPassword === null || UserPassword.length == 0;
    const HashedPassword = passwordDidNotChanged ? null : md5(UserPassword).toUpperCase();

    // console.log({
    //   CustomerID: CustomerData.UserID,
    //   FirstName: UserFirstName,
    //   LastName: UserLastName,
    //   Email: UserEmail,
    //   Gender: UserGender,
    //   Password: HashedPassword,
    //   Phone: UserNumber,
    //   DateOfBirth: UserDOB,
    //   UserUp: new Date()
    // });

    setLoading(true);
    const update = await axios({
      method: 'patch',
      url: UpdateCustomerURL,
      data: {
        CustomerID: CustomerData.UserID,
        FirstName: UserFirstName,
        LastName: UserLastName,
        Email: UserEmail,
        Gender: UserGender.toUpperCase(),
        Password: HashedPassword,
        Phone: UserNumber,
        DateOfBirth: UserDOB,
        UserUp: new Date()
      },
      headers: {
        Authorization: CustomerData.AuthenticationKey
      }
    }).then(response => {
      const AuthKey = md5(CustomerData.UserID + HashedPassword).toUpperCase();
      // Masih error ganti authentication key nya
      if (!passwordDidNotChanged) {
        dispatch(setAuthenticationKey(AuthKey));
      }
      Alert.alert("Update Successful", "Your profile information has been updated.")
      console.log(AuthKey);
    }).catch(error => {
      if (error.response) {
        const ErrorResponse = JSON.parse(error.request.response);
        console.log(ErrorResponse)
        Alert.alert('Update Failed', ErrorResponse.errorMessage, [
          { text: 'OK', onPress: () => null },
        ]);
      } else {
        console.log(error);
      }
    });
    setLoading(false)
  };

  return Loading ?
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
    : (
      <ScrollView>
        <View style={styles.container}>
          {ShowDateTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={UserDOB}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onUserBirthChange}
            />
          )}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(resetLogin());
                Navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Image
              source={require('../../../assets/images/profile.png')}
              style={styles.profileImg}
            />
            <Text style={styles.name}>{UserFirstName + ' ' + UserLastName}</Text>
            <Text style={styles.email}>{UserEmail}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Gender</Text>
            <TextInput style={styles.detailValue} onChangeText={(e) => setUserGender(e.trim())} defaultValue={UserGender} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Date of Birth</Text>
            <TextInput ref={DOBInputRef} onFocus={setShowDateTimePicker} style={styles.detailValue} defaultValue={format(UserDOB, 'MMMM do, yyyy')} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Phone Number</Text>
            <TextInput style={styles.detailValue} onChangeText={(e) => setUserNumber(e.trim())} defaultValue={UserNumber} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Password</Text>
            {/* <TouchableOpacity style={styles.changePass}>
            <Text style={{ color: '#f15454', fontSize: 16 }}>
              Change Password
            </Text>
          </TouchableOpacity> */}
            <TextInput
              style={styles.detailValue}
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              PasswordInputRef={PasswordInputRef}
              onChangeText={UserInput => setUserPassword(UserInput)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Pressable style={styles.button} onPress={onSubmit}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Apply Changes</Text>
            </Pressable>
          </View>

          {/* <TouchableOpacity
          onPress={handleGetAvailableRooms}
          style={styles.bookButton}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            Pick a Room Type
          </Text>
        </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
};

export default ProfileScreen;
