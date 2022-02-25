import {View, Text, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from '../../components/Card/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

/*
  Commented by Angeline
  Date: Friday February 4, 2022
  Note: Run 'npm install react-native-vector-icons'
*/

const Card = ({hotel, index}) => {
  const navigation = useNavigation();

  const goToHotelPage = () => {
    navigation.navigate('Hotel', {HotelID: hotel.hotelID});
  };

  return (
    <TouchableOpacity onPress={() => goToHotelPage()}>
      <View style={styles.card}>
        <Image source={{uri: hotel.image1}} style={styles.cardImage} />
        <View style={styles.cardDetail}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: 'black',
                  paddingRight: 5,
                }}>
                {hotel.hotelName}
              </Text>
              <Text style={{color: '#6e6e6e', fontSize: 12}}>
                {hotel.address}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 'auto',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Fontisto name="star" size={15} color="#ffc400" />
              <View style={styles.cardRating}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  {hotel.rating}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
