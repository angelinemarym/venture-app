import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ExploreNavigator from './ExploreNavigator';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#f15454',
      }}>
      <Tab.Screen
        name={'Home'}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="home" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'History'}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="bars" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
