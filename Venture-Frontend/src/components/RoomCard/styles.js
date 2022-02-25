import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    // elevation: 15,
    backgroundColor: 'white',
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  button: {
    position: 'absolute',
    right: 0,
    top: -5,
    marginTop: 10,
    backgroundColor: '#24a0ed',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {    
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    color: '#5b5b5b',
  },
  roomName: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  roomAvailable: {
    color: '#c40027',
    fontSize: 11,
  },
  seeDetails: {
    position: 'absolute',
    right: 20,
    top: 15,
    color: "#1c65ff",
  },
  roomFeaturesContainer: {    
    justifyContent: "space-between",
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    padding: 10,
    flexWrap:"wrap"
  },
  roomPriceContainer: {    
    justifyContent: "flex-start",
    flex: 1,
  },
  wrapFeatures: {
    flex: 1, 
    flexWrap: 'wrap'
  },
});

export default styles;
