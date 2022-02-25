import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import NumberFormat from 'react-number-format';

/*
  Commented by Angeline
  Date: Friday February 4, 2022
  Note: Run 'npm install react-native-vector-icons'
*/

const HotelRoomCard = ({ room, index }) => {
  const navigation = useNavigation();
  //console.log(room);
  const goToRoomDetailPage = () => {
    //navigation.navigate('LoginScreen');
    navigation.navigate('RoomDetail', {
      Room: room,
      Hotel: null,
      CheckInDate: null,
      CheckOutDate: null,
    });
  };

  return (
    <TouchableOpacity onPress={() => goToRoomDetailPage()}>
      <View style={styles.card}>
        <Image source={{ uri: room.image1 }} style={styles.cardImage} />
        <View style={styles.cardDetail}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'black',
              paddingRight: 5,
            }}>
            {room.roomName}
          </Text>
          <Text style={{ color: '#6e6e6e', fontSize: 12 }}>{room.bedType}</Text>
          <NumberFormat
            value={room.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
            renderText={value => (
              <Text style={{ color: '#6e6e6e', fontSize: 12 }}>
                {value} / night
              </Text>
            )}
          />

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelRoomCard;
