import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import NumberFormat from 'react-number-format';
import Carousel from '../../components/Carousel/Carousel';
import Fontisto from 'react-native-vector-icons/Fontisto';

const HistoryDetailScreen = () => {
  const route = useRoute();
  const booking = route.params.data;

  const parseDateTime = (strDateTime) => {
    const dt = new Date(strDateTime);
    // const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dt, 'MMMM do, yyyy');
  };
  //console.log(booking.image1);
  //console.log(new Date(booking.checkInDate));
  return (
    <ScrollView>
      <Carousel
        images={[
          { image: booking.roomType.image1 },
          { image: booking.roomType.image2 },
          { image: booking.roomType.image3 },
          { image: booking.roomType.image4 },
        ].filter(key => key.image != null)} />
      <View style={styles.generalDescription}>
        <View>
          <Text style={styles.descriptionTitle}>{booking.hotelName}</Text>
        </View>
        {/* <View style={styles.rating}>
          <Fontisto name="star" size={25} color="#fff" />
          <View style={styles.cardRating}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
              {booking.rating}
            </Text>
          </View>
        </View> */}
      </View>
      <View style={styles.container}>
        {/* <View style={styles.detailContainer}>
          <Text style={styles.detail}>Hotel</Text>
          <Text style={styles.detailValue}>{booking.hotelName}</Text>
        </View> */}
        <View style={styles.locationContainer}>
          <Text style={styles.detail}>Location</Text>
          <Text style={styles.location}>{booking.hotelAddress}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Room Type</Text>
          <Text style={styles.detailValue}>{booking.roomType.roomName}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Check In Date</Text>
          <Text style={styles.detailValue}>{parseDateTime(booking.checkInDate)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Check Out Date</Text>
          <Text style={styles.detailValue}>{parseDateTime(booking.checkOutDate)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Total Price</Text>
          <NumberFormat
            style={styles.detailValue}
            value={booking.totalPrice}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
            renderText={value => (
              <Text style={styles.detailValue}>{value}</Text>
            )}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Payment Method</Text>
          <Text style={styles.detailValue}>{booking.paymentMethod}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Transaction Date</Text>
          <Text style={styles.detailValue}>{parseDateTime(booking.transactionDate)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryDetailScreen;
