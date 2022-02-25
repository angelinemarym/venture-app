import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.7;
const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 5,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
});

export default styles;
