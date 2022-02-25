import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';

const SuggestionRow = ({item}) => (
  <View style={styles.row}>
    <View style={styles.iconContainer}>
      <Image source={{uri: item.image}} style={styles.cardImage} />
    </View>
    <View style={styles.col}>
      <Text style={styles.locationText}>{item.hotelName}</Text>
      <Text style={styles.locationText}>{item.address}</Text>
    </View>
  </View>
);

export default SuggestionRow;