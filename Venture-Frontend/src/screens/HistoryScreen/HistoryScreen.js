import {
  View, Text, ScrollView, FlatList, ActivityIndicator, Pressable, TouchableOpacity, useWindowDimensions,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import data from '../../../assets/data/data';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { resetLogin } from '../../store/LoginReducer';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const layout = useWindowDimensions();
  const isFocused = useIsFocused();
  const [IsLoading, setIsLoading] = useState(true);
  const [ActiveBooking, setActiveBooking] = useState();
  const [PastBooking, setPastBooking] = useState();
  const LoginUserID = useSelector((state: RootState) => state.data.UserID);
  const LoginAuthenticatationKey = useSelector(
    (state: RootState) => state.data.AuthenticationKey,
  );
  const LoggedIn = LoginUserID && LoginAuthenticatationKey;

  useEffect(() => {
    if (isFocused) {
      setActiveBooking([]);
      setPastBooking([]);
      handleActiveBooking();
      handlePastBooking();
      setIsLoading(false);
      // console.log("Active Booking");
      // console.log(ActiveBooking);
      // console.log("Past Booking");
      // console.log(PastBooking);
    }
  }, [isFocused]);

  const handleActiveBooking = async () => {
    const Url = global.API_URL + '/booking/customer?customerID=' + LoginUserID + '&isActive=true';
    const res = await axios
      .get(
        Url,
        {
          headers: { Authorization: LoginAuthenticatationKey },
        },
      )
      .then(response => {
        if (response.data !== null) {
          setActiveBooking(response.data.bookings);
        }
      })
      .catch(error => {
       // ignore 404 booking (empty)
      });
  };

  const handlePastBooking = async () => {
    const Url = global.API_URL + '/booking/customer?customerID=' + LoginUserID + '&isActive=false';
    const res = await axios
      .get(
        Url,
        {
          headers: { Authorization: LoginAuthenticatationKey },
        },
      )
      .then(response => {
        if (response.data !== null) {
          setPastBooking(response.data.bookings);
        }
      })
      .catch(error => {
        // ignore 404 booking (empty)
      });
  };

  const FirstRoute = () => {
    return (
      <View>
        {IsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={ActiveBooking}
            renderItem={({ item }) =>
              <Pressable
                onPress={() => {
                  navigation.navigate('HistoryDetail', { data: item });
                }}>

                <HistoryCard item={item} />
              </Pressable>
            }
          />
        )}
      </View>
    )
  };

  const SecondRoute = () => {
    return (
      <View>
        {IsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={PastBooking}
            renderItem={({ item }) =>
              <Pressable
                onPress={() => {
                  //console.log(item);
                  navigation.navigate('HistoryDetail', { data: item });
                }}>

                <HistoryCard item={item} />
              </Pressable>
            }
          />
        )}
      </View>
    )
  };

  return (
    <NavigationContainer independent={true}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Active Bookings" component={FirstRoute} />
        <Tab.Screen name="Past Bookings" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HistoryScreen;
