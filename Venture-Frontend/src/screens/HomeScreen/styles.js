import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  title: {
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20,
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    width: '70%',
    marginLeft: 25,
  },
  button: {
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  searchButton: {
    backgroundColor: '#fff',
    height: 55,
    width: Dimensions.get('screen').width - 30,
    borderRadius: 30,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    zIndex: 100,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 20,
  },
  popularText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    color: 'black',
  },
});

export default styles;
