import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  hotelName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 12,
    color: 'black',
    paddingLeft: 5,
  },
  price: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  priceTxt: {
    color: '#f15454',
    fontWeight: 'bold',
    fontSize: 14,
  },
  image: {    
    width: '25%',
    aspectRatio: 2 / 2,
    resizeMode: 'cover',
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
  },
});

export default styles;
