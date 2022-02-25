import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 74,
    fontWeight: 'bold',
    color: 'white',
    width: '70%',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: -1, height: 1 },
    textAlign: 'center',
    textShadowRadius: 20,
    paddingBottom: 25,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width: '70%',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    paddingBottom: 30,
    marginTop: -15,
    textAlign: 'right',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  datePicker: {
    fontSize: 5,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: 300,
  },
  inputWrap: {
    flex: 1,
    width: 10,
  },
  inputName: {
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  firstName: {
    marginRight: 3,
  },
  lastName: {
    marginLeft: 3,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2d2e',
  },
  inputStyle: {
    width: 300,
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  popularText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    color: 'black',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    alignSelf: 'center',
    padding: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    textDecorationLine: 'underline',
  },
});

export default styles;
