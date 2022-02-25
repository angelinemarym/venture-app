import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    height: Dimensions.get('screen').height,
    paddingBottom: 95,
  },
  loadingContainer: {
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: (Dimensions.get('screen').height / 2) + 50,
  },
  header: {
    paddingLeft: 20,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,    
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default styles;
