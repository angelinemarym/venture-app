import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  paymentTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 7,
    marginLeft: 25,
  },
  payButton: {
    marginBottom: 20,
    backgroundColor: '#f15454',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  detailContainer: {
    backgroundColor: 'white',
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
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
  inputStyle: {
    width: '100%',
    color: 'black',
    borderRadius: 10,
    borderColor: '#dadae8',
    paddingRight: 20,
    marginRight: 20,
  },
  paymentInput: {
    width: 20,
    color: 'black',
    borderRadius: 10,
    borderColor: '#dadae8',
    paddingRight: 20,
    marginRight: 20,
  },
  orderDetail: {
    marginLeft: 20,
    marginTop: 10,
  },
  generalDescription: {
    backgroundColor: '#f15454',
    paddingLeft: Dimensions.get('screen').width / 20,
    paddingTop: Dimensions.get('screen').width / 25,
    paddingBottom: Dimensions.get('screen').width / 25,
    flexDirection: 'row',
  }
});

export default styles;
