import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';

const HistoryCard = ({ item }) => {
  const parseDateTime = (strDateTime) => {
    const dt = new Date(strDateTime);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, 'MMMM do, yyyy');
  };

  return (
    <View style={[styles.container, styles.row]}>
      <Image style={styles.image} source={{ uri: item.roomType.image1 }} />
      <View style={styles.col}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
        <View style={styles.detail}>
          <FontAwesome5 name="calendar" color={'#f15454'} size={17} />
          <Text style={styles.detailText}>
            {parseDateTime(item.transactionDate)}
          </Text>
        </View>
        <View style={styles.detail}>
          <FontAwesome5 name="hotel" color={'#f15454'} size={17} />
          <Text style={styles.detailText}>
            {item.roomType.roomName} Type
          </Text>
        </View>
        <View style={styles.detail}>
          <FontAwesome5 name="bed" color={'#f15454'} size={17} />
          <Text style={styles.detailText}>
            {item.roomType.bedType}
          </Text>
        </View>
      </View>

      <NumberFormat
        style={styles.priceTxt}
        value={item.totalPrice}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp. '}
        renderText={value => (
          <View style={styles.price}>
            <Text style={styles.priceTxt}>{value}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryCard;
