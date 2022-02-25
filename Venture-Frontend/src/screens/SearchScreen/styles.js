import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#e7e7e7',
    padding: 1,
    borderRadius: 10,
  },
  locationText: {
    color: 'black',
    width: '89%',
  },
  cardImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
});

export default styles;
