import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {Dimensions} from 'react-native';

function Slider(props) {
  const [count, setCount] = useState([0]);

  const handleClickPrev = () => {
    const images = props.imgs;
    let count1 = count;
    if (--count1 < 0) {
      count1 = images.length - 1;
    }
    setCount(count1);
  };
  const handleClickNext = () => {
    const images = props.imgs;
    let count1 = count;
    if (++count1 > images.length - 1) {
      count1 = 0;
    }
    setCount(count1);
  };
  return (
    <View style={styles.slider}>
      <Button
        buttonStyle={styles.button}
        onPress={handleClickPrev}
        title="prev"
      />
      {props.imgs[0] && props.imgs[count].loadImage ? (
        <Image
          style={styles.sliderImg}
          source={{uri: props.imgs[count].source}}
        />
      ) : (
        <Image style={styles.sliderImg} source={props.imgs[count].source} />
      )}
      <Button
        buttonStyle={styles.button}
        onPress={handleClickNext}
        title="next"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: '#000',
    padding: 15,
  },
});
export default Slider;
