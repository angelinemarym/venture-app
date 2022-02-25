import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Paginator from './Paginator';
import styles from './styles';

const RoomSelectCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slideRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={{
      height: 130,
    }}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        bounces={false}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}>
        {images.map((key, index) => (
          <Image key={index} source={{ uri: key.image }} style={styles.image} />
        ))}

      </ScrollView>
      <Paginator data={images} scrollX={scrollX} />
    </View>
  );
};

export default RoomSelectCarousel;
