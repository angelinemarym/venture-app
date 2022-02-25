import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import RoomSelectCarousel from '../RoomSelectCarousel/RoomSelectCarousel';
import NumberFormat from 'react-number-format';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RoomCard = ({ room, index, hotel, checkInDate, checkOutDate }) => {
  const navigation = useNavigation();

  const goToPurchasePage = () => {
    navigation.navigate('Payment', {
      Room: room,
      Hotel: hotel,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutDate,
    });
  };

  const goToRoomDetailPage = () => {
    navigation.navigate('RoomDetail', {
      Room: room,
      Hotel: hotel,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutDate,
    });
  };
  
  const RoomImages = [
    { image: room.image1 },
    { image: room.image2 },
    { image: room.image3 },
    { image: room.image4 },
  ].filter(key => key.image != null);

  return (
    <View style={styles.container}>
      {/* Image  */}
      <RoomSelectCarousel images={RoomImages} />
      <View style={styles.text}>
        {/* Room Name */}
        <Text style={styles.roomName}>{room.roomName}</Text>
        <Text style={styles.seeDetails} onPress={goToRoomDetailPage}>See Details</Text>

        {/*  Number of Room Available */}
        <Text style={styles.roomAvailable}>
          Only {room.totalRoom} room available!
        </Text>

        <View style={[styles.roomFeaturesContainer, styles.horizontal]} childStyle={{ padding: 8 }}>
          <FontAwesome5 name="bed" color={'#f15454'} size={17} />
          <Text> {room.bedType}  </Text>
          <FontAwesome5 name="users" color={'#f15454'} size={17} />
          <Text> {room.totalGuest} guests  </Text>

          <FontAwesome5 name="wifi" color={'#f15454'} size={17} />
          <Text> Wi-Fi</Text>
        </View>
        {/*Description  */}
        {/* <Text style={styles.description}>{room.roomDescription}</Text> */}

        <View style={{
          borderTopWidth: 1,
          borderColor: 'lightgrey',
          marginTop: 10,
          paddingTop: 10,
        }}>
          <View style={[styles.roomPriceContainer, styles.horizontal]}>
            <Text style={{ fontSize: 12 }}>IDR </Text>
            {/*  Price */}
            <NumberFormat
              value={room.price}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => <Text style={{ fontSize: 20, fontWeight: "bold" }}>{value}</Text>}
            />
            <Pressable style={styles.button} onPress={goToPurchasePage}>
              <Text style={styles.buttonText}>Book Now</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </View>
  );
};

export default RoomCard;
