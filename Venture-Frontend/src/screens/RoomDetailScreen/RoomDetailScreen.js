import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Carousel from '../../components/Carousel/Carousel';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axios from 'axios';
import styles from './styles';
import style from 'react-native-datepicker/style';
import NumberFormat from 'react-number-format';

const HotelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const Room = route.params.Room;
  const Hotel = route.params.Hotel;
  const CheckInDate = route.params.CheckInDate;
  const CheckOutDate = route.params.CheckOutDate;

  const goToPaymentPage = () => {
    navigation.navigate('Payment', {
      Room: Room,
      Hotel: Hotel,
      CheckInDate: CheckInDate,
      CheckOutDate: CheckOutDate,
    });
  };

  return (
    <ScrollView>
      <Carousel
        images={[{ image: Room.image1 }, { image: Room.image2 }].filter(
          key => key.image != null,
        )}
      />
      {/* Header */}
      <View style={styles.generalDescription}>
        <View>
          <Text style={styles.hotelName}>{Room.roomName}</Text>
        </View>
      </View>
      {/* Description */}
      <View style={styles.description}>
        <Text style={styles.descText}>Description</Text>
        <Text style={styles.text}>{Room.roomDescription}</Text>
      </View>
      {/* Details */}
      <View style={styles.detailDescription}>
        <Text style={styles.descText}>Details</Text>
        <View style={styles.detailContainer}>
          {/* Price */}
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
        {/* Total Rooms */}
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Rooms Available</Text>
          <Text style={styles.detailValue}>{Room.totalRoom}</Text>
        </View>
        {/* Bed Types */}
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Bed Type</Text>
          <Text style={styles.detailValue}>{Room.bedType}</Text>
        </View>
        {/* Total Guests */}
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Max. Guests</Text>
          <Text style={styles.detailValue}>{Room.totalGuest}</Text>
        </View>
      </View>

      {/* Purchase Button */}
      {Hotel == null ? null :
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={goToPaymentPage} style={styles.bookButton}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              Purchase
            </Text>
          </TouchableOpacity>
        </View>}

    </ScrollView>
  );
};

export default HotelScreen;
