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
  card: {
    width: '80%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  playerTitle: {
    marginTop: 10,
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});
export default styles;
