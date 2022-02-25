import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import { useState, useRef } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axios from 'axios';
import md5 from 'md5';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setAuthenticationKey } from '../../store/LoginReducer';
// import md5 from 'md5';

const RegisterScreen = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const [UserFirstName, setUserFirstName] = useState('');
  const [UserLastName, setUserLastName] = useState('');
  const [UserBirthDate, setUserBirthDate] = useState(new Date());
  const [UserGender, setUserGender] = useState('MALE');
  const [UserNumber, setUserNumber] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const BirthDateInputRef = useRef();
  const [ShowDatePicker, setShowDatePicker] = useState(false);
  const showDatePicker = () => {
    setShowDatePicker(true);
  };

  const parseDateTime = (strDateTime) => {
    const dt = new Date(strDateTime);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, 'MMMM do, yyyy');
  };

  const onBirthDateChange = (event, BirthDateInput) => {
    const currentDate = BirthDateInput || UserBirthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setUserBirthDate(currentDate);
    BirthDateInputRef.current.blur();
    BirthDateInputRef.current.setNativeProps({
      text: parseDateTime(currentDate, 'MMMM do, yyyy'),
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const Url = global.API_URL + '/customer/register';
      const HashedPassword = md5(UserPassword).toUpperCase();
      // console.log({
      //   Email: UserEmail,
      //   Password: HashedPassword,
      //   FirstName: UserFirstName,
      //   LastName: UserLastName,
      //   DateOfBirth: UserBirthDate,
      //   Email: UserEmail,
      //   Phone: UserNumber,
      //   Gender: UserGender,
      //   UserIn: UserFirstName + ' ' + UserLastName,
      // });
      await axios
        .post(Url, {
          Email: UserEmail,
          Password: HashedPassword,
          FirstName: UserFirstName,
          LastName: UserLastName,
          DateOfBirth: UserBirthDate,
          Email: UserEmail,
          Phone: UserNumber,
          Gender: UserGender,
          UserIn: UserFirstName + ' ' + UserLastName,
        })
        .then(response => {
          //console.log('Register Success!');
          //const AuthKey = md5(response.data.userID + HashedPassword).toUpperCase();
          //console.log(response.data);
 
          // dispatch(setUserID(response.data.userID));
          // dispatch(setAuthenticationKey(AuthKey));          
          Navigation.navigate('LoginScreen');
        })
        .catch(error => {
          const ErrorResponse = JSON.parse(error.request.response);
          Alert.alert('Invalid Credentials', ErrorResponse.errorMessage, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        });
    } catch (ExceptionMessage) {
      console.log(ExceptionMessage);
    } finally {
      setLoading(false);
    }
  };

  if (Loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // if (Loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <ImageBackground
      source={require('../../../assets/images/bg002.jpg')}
      style={[styles.image]}>
      <ScrollView>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Venture</Text>
          <View style={[styles.row]}>
            <View style={styles.inputWrap}>
              <TextInput
                style={[styles.inputName, styles.firstName]}
                placeholder="Enter first name"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next" D
                blurOnSubmit={false}
                onChangeText={UserInput => setUserFirstName(UserInput)}
              />
            </View>

            {ShowDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={UserBirthDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onBirthDateChange}
              />
            )}
            <View style={styles.inputWrap}>
              <TextInput
                style={[styles.inputName, styles.lastName]}
                placeholder="Enter last name"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={UserInput => setUserLastName(UserInput)}
              />
            </View>
          </View>

          <TextInput
            ref={BirthDateInputRef}
            style={styles.inputStyle}
            placeholder="Enter date of birth"
            placeholderTextColor="#8b9cb5"
            returnKeyType="next"
            blurOnSubmit={false}
            onFocus={showDatePicker}
          />

          {/* 
                    Commented by Naufal
                    Date: Sunday February 6, 2022
                    Note: A bug in picker library that causes the picker to not show border radius was found
                            The hotfix is to wrap it with view according to the following discussion:
                            https://github.com/react-native-picker/picker/issues/343            
                */}
          <View style={styles.inputStyle}>
            <Picker
              selectedValue={UserGender}
              onValueChange={(itemValue, itemIndex) => setUserGender(itemValue)}>
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
            </Picker>
          </View>

          <TextInput
            style={styles.inputStyle}
            placeholder="Enter e-mail address"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={UserInput => setUserEmail(UserInput)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="Enter phone number"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={UserInput => setUserNumber(UserInput)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Password" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            onChangeText={UserInput => setUserPassword(UserInput)}
          />

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Text
            style={styles.registerTextStyle}
            onPress={() => Navigation.navigate('LoginScreen')}>
            Already have an account?
          </Text>
        </View>


      </ScrollView>
    </ImageBackground>
  );
};

/*
  Commented by Naufal  
  Date: Saturday February 5, 2022
  Note: Run the commands below to download additional libaries:
        npm install @react-native-picker/picker
        npm install react-native-datepicker --save
        npm install date-fns --save
*/
export default RegisterScreen;
