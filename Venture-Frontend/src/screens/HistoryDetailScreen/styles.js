import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingRight: 20,
    height: Dimensions.get('screen').height - 80,
  },
  header: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    paddingLeft: 20,
  },
  detailContainer: {
    backgroundColor: 'white',
    marginLeft: 20,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  locationContainer: {
    backgroundColor: 'white',
    marginLeft: 20,
    borderRadius: 10,
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
    position: 'absolute',
    right: 15,
    top: 10,
  },
  location: {
    color: 'black',
    fontSize: 16,
  },  
  generalDescription: {
    backgroundColor: '#f15454',
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 25,
    flexDirection: 'row',
  },
  descriptionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  rating: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: Dimensions.get('screen').width / 1.35,
    marginTop: '5%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardRating: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
});

export default styles;
