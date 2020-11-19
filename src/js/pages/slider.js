import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Button} from '../components/button';
import styles from '../scss';

import Slider from '../components/slider';

import {setRemote} from '../redux/actions';

const localStore = [
  {id: 1, source: require('../../img/img0.jpg'), loadImage: false},
  {id: 2, source: require('../../img/img1.jpg'), loadImage: false},
  {id: 3, source: require('../../img/img2.jpg'), loadImage: false},
];

function SliderPage(props) {
  const [toggle, setToggle] = useState('local');
  useEffect(() => {
    fetch('https://imagesapi.osora.ru/')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.map((item, index) => {
          return {id: index, source: item, loadImage: true};
        });
      })
      .then((elem) => {
        props.setRemote(elem);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line
  }, []);

  function handleClickSwitch() {
    toggle === 'local' ? setToggle('remote') : setToggle('local');
  }
  function handlePress() {
    props.navigation.navigate('Home');
  }
  const images = toggle === 'local' ? localStore : props.remoteStore;

  return (
    <View style={{...styles.screenContainer, ...styles.alignCenter}}>
      {props.remoteStore && <Slider imgs={images} />}
      <Button
        style={{...styles.screenButton, ...styles.sliderButton}}
        styleText={styles.screenButton__text}
        onPress={handleClickSwitch}
        title={'switch to remote'}
      />
      <Button
        style={{...styles.screenButton, ...styles.sliderButton}}
        styleText={styles.screenButton__text}
        to="/"
        title={'Go home'}
      />
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    remoteStore: state.remote,
  };
};
export default connect(mapStateToProps, {setRemote})(SliderPage);
