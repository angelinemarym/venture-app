import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import NumberFormat from 'react-number-format';
import axios from 'axios';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setAuthenticationKey } from '../../store/LoginReducer';

const PaymentScreen = () => {
  const Navigation = useNavigation();
  const Route = useRoute();
  const [Loading, setLoading] = useState(false);
  const Room = Route.params.Room;
  const Hotel = Route.params.Hotel;
  const CheckInDate = new Date(Route.params.CheckInDate);
  const CheckOutDate = new Date(Route.params.CheckOutDate);
  const Nights = (CheckOutDate.getTime() - CheckInDate.getTime()) / (1000 * 3600 * 24);
  const TotalPrice = Room.price * Nights;

  const [PaymentType, setPaymentType] = useState('Transfer Bank');

  const LoginUserID = useSelector((state: RootState) => state.data.UserID);
  const LoginAuthenticatationKey = useSelector(
    (state: RootState) => state.data.AuthenticationKey,
  );

  const parseDateTime = (strDateTime) => {
    const dt = new Date(strDateTime);
    // const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dt, 'MMMM do, yyyy');
  };

  const handleBooking = async () => {
    setLoading(true);
    const Url = global.API_URL + '/booking/add';
    // console.log({
    //   CustomerID: LoginUserID,
    //   Authorization: LoginAuthenticatationKey,
    // });
    // console.log({
    //   CustomerID: LoginUserID,
    //   RoomTypeID: Room.roomTypeID,
    //   CheckInDate: format(CheckInDate, "yyyy-MM-dd HH:mm:ss"),
    //   CheckOutDate: format(CheckOutDate, "yyyy-MM-dd HH:mm:ss"),
    //   UserIn: 'User ID: ' + LoginUserID,
    //   PaymentMethod: PaymentType,
    // });
    //console.log(CheckInDate.toISOString().slice(0, 19).replace('T', ' '));
    // console.log(CheckInDate);
    //console.log(format(CheckInDate, "MMMM do, yyyy H:mma"))
    //return;
    await axios
      .post(
        Url,
        {
          CustomerID: LoginUserID,
          RoomTypeID: Room.roomTypeID,
          CheckInDate: CheckInDate.toISOString(),
          CheckOutDate: CheckOutDate.toISOString(),
          UserIn: 'User ID: ' + LoginUserID,
          PaymentMethod: PaymentType,
        },
        {
          headers: { Authorization: LoginAuthenticatationKey },
        },
      )
      .then(response => {
        Alert.alert('Payment Succesful', 'Thank you for your purchase!', [
          {
            text: 'Ok',
          },
        ]);

        Navigation.navigate('HomeScreen');
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          const ErrorResponse = JSON.parse(error.request.response);
          Alert.alert('Booking Error', ErrorResponse.errorMessage, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        } else {
          console.log(error);
        }
      });

    setLoading(false);
  };

  const RoomImages = [
    { image: Room.image1 },
    { image: Room.image2 },
    { image: Room.image3 },
    { image: Room.image4 },
  ].filter(key => key.image != null);

  return Loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.generalDescription}>
          <Text style={[styles.title]}>Order Summary</Text>
        </View>
        <View style={styles.orderDetail}>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Hotel </Text>
            <Text style={styles.detailValue}>{Hotel.hotelName}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Check In </Text>
            <Text style={styles.detailValue}>{parseDateTime(CheckInDate)}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Check Out </Text>
            <Text style={styles.detailValue}>{parseDateTime(CheckOutDate)}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Price Per Night</Text>
            <NumberFormat
              value={Room.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
              renderText={value => (
                <Text style={styles.detailValue}>{value}</Text>
              )}
            />
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Total Cost</Text>
            <NumberFormat
              value={TotalPrice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
              renderText={value => (
                <Text style={styles.detailValue}>{value}</Text>
              )}
            />
          </View>

        </View>
        <Text style={styles.paymentTitle}>Select Payment Method</Text>
        <View style={[styles.inputStyle, { marginBottom: 20 }]}>
          <Picker
            selectedValue={PaymentType}
            onValueChange={(itemValue, itemIndex) => setPaymentType(itemValue)}
            mode={'dropdown'}
            style={{
              color: 'black',
              backgroundColor: '#e6e6e6',
              marginLeft: 20,
              marginTop: 15,
            }}>
            <Picker.Item label="Bank Transfer" value="Bank Transfer" />
            <Picker.Item label="Virtual Account" value="Virtual Account" />
            <Picker.Item label="PayPal" value="PayPal" />
          </Picker>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', }}>
          <TouchableOpacity style={styles.payButton} onPress={handleBooking}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Finish Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
