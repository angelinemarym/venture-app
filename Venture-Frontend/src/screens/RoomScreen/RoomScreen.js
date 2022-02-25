import {View, Text, Pressable} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
import RoomCard from '../../components/RoomCard/RoomCard';

const RoomScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const Rooms = route.params.Rooms;
  const Hotel = route.params.Hotel;
  const CheckInDate = route.params.CheckInDate;
  const CheckOutDate = route.params.CheckOutDate;

  // props.navigation.setOptions({ headerTitle: 'test', });
  //navigation.setOptions({ title: 'Updated!' });
  return (
    <View style={styles.container}>
      <FlatList
        data={Rooms}
        // contentContainerStyle={{paddingTop: 10, paddingLeft: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => <RoomCard room={item} index={index} hotel={Hotel} checkInDate={CheckInDate} checkOutDate={CheckOutDate} />}
      />
    </View>
  );
};

export default RoomScreen;
