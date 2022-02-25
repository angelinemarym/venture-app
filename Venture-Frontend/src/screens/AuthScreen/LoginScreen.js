import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  Image,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, createRef } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setAuthenticationKey } from '../../store/LoginReducer';
import md5 from 'md5';

const LoginScreen = () => {
  const Navigation = useNavigation();

  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const PasswordInputRef = createRef();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const HashedPassword = md5(UserPassword).toUpperCase();
    setLoading(true);
    const Url = global.API_URL + '/customer/login';
    await axios
      .post(Url, { Email: UserEmail, Password: HashedPassword })
      .then(response => {
        const AuthKey = md5(response.data.userID + HashedPassword).toUpperCase();
        Navigation.navigate('HomeScreen');
        dispatch(setUserID(response.data.userID));
        dispatch(setAuthenticationKey(AuthKey));
        // console.log("Hashed PW: " + HashedPassword);
        // console.log("AuthKey: " + AuthKey);
      })
      .catch(error => {
        if (error.response) {
          const ErrorResponse = JSON.parse(error.request.response);
          Alert.alert('Invalid Credentials', ErrorResponse.errorMessage, [
            { text: 'OK', onPress: () => null },
          ]);
        } else {
          console.log(error);
        }
      });

    setLoading(false);
  };

  return Loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ImageBackground
      source={require('../../../assets/images/bg002.jpg')}
      style={[styles.image, styles.centerContainer]}>
      <Text style={styles.title}>Venture</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter e-mail address"
        placeholderTextColor="#8b9cb5"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() =>
          PasswordInputRef.current && PasswordInputRef.current.focus()
        }
        onChangeText={UserInput => setUserEmail(UserInput)}
      />
      <TextInput
        style={styles.inputStyle}
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
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text
        style={styles.registerTextStyle}
        onPress={() => Navigation.navigate('RegisterScreen')}>
        Don't have an account?
      </Text>
    </ImageBackground>
  );
};

export default LoginScreen;
