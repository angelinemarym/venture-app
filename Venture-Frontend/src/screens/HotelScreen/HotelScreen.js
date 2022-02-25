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
import HotelRoomCard from '../../components/HotelRoomCard/HotelRoomCard';

const HotelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [Loading, setLoading] = useState(false);
  const HotelID = route.params.HotelID;
  const HotelUrl = global.API_URL + '/hotel/specific?id=' + HotelID;
  const [IsLoading, setIsLoading] = useState(true);
  const [Hotel, setHotel] = useState();

  const [CheckInDate, setCheckInDate] = useState(new Date());
  const CheckInInputRef = useRef();
  const [CheckOutDate, setCheckOutDate] = useState(new Date());
  const CheckOutInputRef = useRef();
  const [MaximumCheckInDate, setMaximumCheckInDate] = useState(
    new Date(2300, 10, 20),
  );
  const [MinimumCheckOutDate, setMinimumCheckOutDate] = useState(new Date());
  const [ShowCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [ShowCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
  const [ShowCheckInInputFilled, setShowCheckInInputFilled] = useState(false);
  const [ShowCheckOutInputFilled, setShowCheckOutInputFilled] = useState(false);

  const parseDateTime = (strDateTime) => {
    const dt = new Date(strDateTime);
    //console.log(dt);
    //const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    //console.log(dtDateOnly);
    return format(dt, 'MMMM do, yyyy');
  };

  const showCheckInDatePicker = () => {
    setShowCheckInDatePicker(true);
  };

  const showCheckOutDatePicker = () => {
    setShowCheckOutDatePicker(true);
  };

  const onCheckInChange = (event, CheckInInput) => {
    const currentDate = CheckInInput || CheckInDate;
    setShowCheckInDatePicker(Platform.OS === 'ios');
    setCheckInDate(CheckInInput);
    // console.log("test");
    // console.log(currentDate);
    setShowCheckInInputFilled(true);
    setMinimumCheckOutDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    CheckInInputRef.current.blur();
    CheckInInputRef.current.setNativeProps({
      text: parseDateTime(currentDate),
    });
  };

  const onCheckOutChange = (event, CheckOutInput) => {
    const currentDate = CheckOutInput || CheckOutDate;
    setShowCheckOutDatePicker(Platform.OS === 'ios');
    setCheckOutDate(currentDate);
    setMaximumCheckInDate(currentDate);
    setShowCheckOutInputFilled(true);
    CheckOutInputRef.current.blur();
    CheckOutInputRef.current.setNativeProps({
      text: parseDateTime(currentDate),
    });
  };

  const getHotels = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(HotelUrl);
      setHotel(res.data.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  const handleGetAvailableRooms = async () => {
    if ((!ShowCheckInInputFilled || !ShowCheckOutInputFilled)) {
      Alert.alert('Invalid Input', 'Please fill in all the fields.', [
        { text: 'OK', onPress: () => null },
      ]);

      return;
    }

    if (CheckInDate.getFullYear() === CheckOutDate.getFullYear() &&
      CheckInDate.getMonth() === CheckOutDate.getMonth() &&
      CheckInDate.getDate() === CheckOutDate.getDate()) {
      Alert.alert('Invalid Input', 'Cannot be same day!', [
        { text: 'OK', onPress: () => null },
      ]);

      return;
    }

    setLoading(true);
    const Url = global.API_URL + '/room/available';
    await axios
      .post(Url, {
        HotelID: HotelID,
        CheckInDate: CheckInDate,
        CheckOutDate: CheckOutDate,
      })
      .then(response => {
        navigation.navigate('Room', {
          HotelName: Hotel.hotelName,
          Rooms: response.data.rooms,
          Hotel: Hotel,
          CheckInDate: CheckInDate.toDateString(),
          CheckOutDate: CheckOutDate.toDateString(),
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          const ErrorResponse = JSON.parse(error.request.response);
          Alert.alert('Unavailable', ErrorResponse.errorMessage, [
            { text: 'OK', onPress: () => null },
          ]);
        } else {
          console.log(error);
        }
      });

    setLoading(false);
  };

  return IsLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScrollView>
      <Carousel
        images={[
          { image: Hotel.image1 },
          { image: Hotel.image2 },
          { image: Hotel.image3 },
          { image: Hotel.image4 },
        ].filter(key => key.image != null)}
      />
      {/* Header */}
      <View style={styles.generalDescription}>
        <View>
          <Text style={styles.hotelName}>{Hotel.hotelName}</Text>
        </View>
        <View style={styles.rating}>
          <Fontisto name="star" size={25} color="#fff" />
          <View style={styles.cardRating}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
              {Hotel.rating}
            </Text>
          </View>
        </View>
      </View>
      {/* Location */}
      <View style={styles.description}>
        <Text style={styles.descText}>Location</Text>
        <Text style={styles.text}>{Hotel.address}</Text>
      </View>
      {/* Description */}

      <View style={styles.description}>
        <Text style={styles.descText}>Description</Text>
        <Text style={styles.text}>{Hotel.hotelDescription}</Text>
      </View>
      {/* Room Carousell */}
      <View style={styles.description}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>
          Room Types
        </Text>
      </View>
      <FlatList
        horizontal
        data={Hotel.rooms}
        contentContainerStyle={{ paddingVertical: 10, paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <HotelRoomCard room={item} index={index} />
        )}
      />
      {/* Check In & Check Out Date */}
      <View style={styles.check}>
        <Text style={styles.checkText}>Pick Your Date</Text>
        {/* Check In */}
        {ShowCheckInDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={CheckInDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onCheckInChange}
            minimumDate={new Date()}
          />
        )}
        <Text style={{ color: 'black', fontSize: 18 }}>Check In Date</Text>
        <TextInput
          ref={CheckInInputRef}
          style={styles.inputStyle}
          placeholder="Enter check in date"
          placeholderTextColor="#8b9cb5"
          returnKeyType="next"
          blurOnSubmit={false}
          onFocus={showCheckInDatePicker}
        />
        {/* Check Out */}
        {ShowCheckOutDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={CheckOutDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onCheckOutChange}
            minimumDate={MinimumCheckOutDate}
          />
        )}
        <Text style={{ color: 'black', fontSize: 18 }}>Check Out Date</Text>
        <TextInput
          ref={CheckOutInputRef}
          style={styles.inputStyle}
          placeholder="Enter check out date"
          placeholderTextColor="#8b9cb5"
          returnKeyType="next"
          blurOnSubmit={false}
          onFocus={showCheckOutDatePicker}
        />
      </View>
      {/* 
      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>Contact Info</Text>
        <Text style={styles.text}>Email: {Hotel.email}</Text>
        <Text style={styles.text}>Phone: {Hotel.phoneNumber}</Text>
      </View> */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={handleGetAvailableRooms}
          style={styles.bookButton}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            Pick a Room Type
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HotelScreen;
