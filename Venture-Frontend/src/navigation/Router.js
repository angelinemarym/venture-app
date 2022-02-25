import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import RegisterScreen from '../screens/AuthScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HomeTabNavigator from './HomeTabNavigator';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import HotelScreen from '../screens/HotelScreen/HotelScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import RoomScreen from '../screens/RoomScreen/RoomScreen';
import HistoryDetailScreen from '../screens/HistoryDetailScreen/HistoryDetailScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen/RoomDetailScreen';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'RegisterScreen'}
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'HomeScreen'}
          component={HomeTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Search'}
          component={SearchScreen}
          options={{
            title: 'Search your destination',
          }}
        />
        <Stack.Screen
          name={'Hotel'}
          component={HotelScreen}
          options={{
            title: 'Hotel Information',
          }}
        />
        <Stack.Screen
          name={'Room'}
          component={RoomScreen}
          options={({ route }) => ({ title: route.params.HotelName })}
        />
        <Stack.Screen
          name={'RoomDetail'}
          component={RoomDetailScreen}
          options={{
            title: 'Room Detail',
          }}
        />
        <Stack.Screen
          name={'Payment'}
          component={PaymentScreen}
          options={{
            title: 'Finish Your Payment',
          }}
        />
        <Stack.Screen
          name={'HistoryDetail'}
          component={HistoryDetailScreen}
          options={{
            title: 'History Detail',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
