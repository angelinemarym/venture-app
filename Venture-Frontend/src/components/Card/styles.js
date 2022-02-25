import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 250,
    width: Dimensions.get('screen').width / 1.8,
    // elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  cardImage: {
    height: 160,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 50,
    width: 80,
    backgroundColor: '#f15454',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetail: {
    height: 120,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardRating: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 'auto'
  },
});

export default styles;
