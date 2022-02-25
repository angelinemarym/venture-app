import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import data from '../../../assets/data/data';
import Card from '../../components/Card/Card';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
/*
  Commented by Angeline
  Date: Friday February 4, 2022
  Note: Run 'npm install react-native-vector-icons'
*/

const HomeScreen = () => {
  const navigation = useNavigation();

  // Fetch data from API
  const HotelUrl = global.API_URL + '/hotel';
  const [IsLoading, setIsLoading] = useState(true);
  const [Hotel, setHotel] = useState();

  const getHotels = async () => {
    try {
      const res = await axios.get(HotelUrl);
      setHotel(res.data.hotels.filter(hotelFilter));
      // console.log(res.data.hotels);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHotels();
  }, []);

  // Show only hotels that has rating greater than or equal to 4 on the popular section
  const hotelFilter = hotel => {
    if (hotel.rating >= 4) {
      return hotel;
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search')}>
        <Fontisto name="search" size={25} color={'#f15454'} />
        <Text style={styles.searchButtonText}>Where are you going?</Text>
      </Pressable>
      {/* 
        Modified by Angeline
        Date : Wednesday Feb 9, 2022 
        Purpose : Change background image
      */}
      <ImageBackground
        source={require('../../../assets/images/wallpaper.jpg')}
        style={styles.image}>
        <Text style={styles.title}>Begin Your Adventure</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>Explore nearby stays</Text>
        </Pressable>
      </ImageBackground>
      <Text style={styles.popularText}>Popular</Text>
      <View>
        {IsLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            horizontal
            data={Hotel}
            contentContainerStyle={{paddingVertical: 30, paddingLeft: 20}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card hotel={item} index={index} />}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
