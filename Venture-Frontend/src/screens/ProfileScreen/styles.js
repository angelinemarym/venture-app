import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    height: Dimensions.get('screen').height - 80,
  },
  header: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    paddingLeft: 20,
  },
  logout: {
    color: '#f15454',
    fontSize: 18,
    position: 'absolute',
    marginLeft: Dimensions.get('screen').width / 1.85,
    paddingTop: 25,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
  profileImg: {
    height: 80,
    width: 80,
  },
  nameContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  name: {
    color: 'black',
    fontSize: 18,
    position: 'absolute',
    paddingTop: Dimensions.get('screen').height / 22,
    paddingLeft: Dimensions.get('screen').width / 3,
    fontWeight: 'bold',
  },
  email: {
    color: '#888',
    position: 'absolute',
    paddingTop: Dimensions.get('screen').height / 12,
    paddingLeft: Dimensions.get('screen').width / 3,
  },
  detailContainer: {
    backgroundColor: 'white',
    marginLeft: 20,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  detail: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  detailValue: {
    color: 'black',
    fontSize: 16,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    textAlign: 'right',
    padding: 0
  },
  changePass: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#0069d9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginLeft: 20,
    borderRadius: 10,
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
