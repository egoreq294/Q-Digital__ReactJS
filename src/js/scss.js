import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  menuButton: {
    flex: 1,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  menuButton__text: {},
  screenContainer: {
    flex: 1,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
  },
  screenButton: {
    backgroundColor: '#000',
    padding: 15,
  },
  screenButton__text: {
    color: '#fff',
  },
  sliderButton: {
    marginTop: 15,
  },
  slider: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderImg: {
    width: Dimensions.get('window').width - 150,
    height: 200,
    resizeMode: 'contain',
  },
});
export default styles;
