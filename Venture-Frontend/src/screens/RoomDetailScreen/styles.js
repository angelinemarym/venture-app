import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  generalDescription: {
    backgroundColor: '#f15454',
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 25,
    flexDirection: 'row',
  },
  cardRating: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  hotelName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  address: {
    color: 'black',
    fontSize: 15,
  },
  rating: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: Dimensions.get('screen').width / 1.35,
    marginTop: '5%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  description: {
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 50,
  },
  detailDescription: {
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 20,
  },
  descText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  check: {
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 25,
  },
  checkText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  inputStyle: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    width: '90%',
    color: 'black',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  contactInfo: {
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 10,
  },
  contactText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
    lineHeight: 20,
  },
  bookButton: {
    marginBottom: 20,
    backgroundColor: '#f15454',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    backgroundColor: 'white',
    marginRight: 20,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  detail: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailValue: {
    color: 'black',
    fontSize: 16,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    padding: 0,
  },
});

export default styles;
