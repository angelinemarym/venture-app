import {View, ActivityIndicator} from 'react-native';
import React, {useState, createRef, useEffect} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {setUserID, setAuthenticationKey} from '../../store/LoginReducer';

const SplashScreen = () => {
  const Navigation = useNavigation();

  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const PasswordInputRef = createRef();

  const LoginUserID = useSelector((state: RootState) => state.data.UserID);
  const LoginAuthenticatationKey = useSelector(
    (state: RootState) => state.data.AuthenticationKey,
  );
  const LoggedIn = LoginUserID && LoginAuthenticatationKey;

  // const dispatch = useDispatch();
  // dispatch(setUserID('1'));
  // dispatch(setAuthenticationKey('1'));

  const handleLogin = async () => {
    try {
      setLoading(true);
      const Url = global.API_URL + '/customer/login';
      await axios
        .post(Url, {
          UserID: LoginUserID,
          AuthKey: LoginAuthenticatationKey.toUpperCase(),
        })
        .then(response => {
          console.log('Login Successful');
          Navigation.navigate('HomeScreen');
        })
        .catch(error => {
          console.log(error.request.response);
          console.log(
            'Login credentials are invalid! AuthKey: ' +
              LoginAuthenticatationKey,
          );
          Navigation.navigate('LoginScreen');
        });
    } catch (ExceptionMessage) {
      console.log(ExceptionMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (LoggedIn) {
      handleLogin();
    } else {
      console.log('Not logged in');
      Navigation.navigate('LoginScreen');
    }
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
