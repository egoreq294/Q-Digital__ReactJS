import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Button} from '../components/button';
import styles from '../scss';

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
        style={styles.screenButton}
        styleText={styles.screenButton__text}
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
        style={styles.screenButton}
        styleText={styles.screenButton__text}
        onPress={handleClickNext}
        title="next"
      />
    </View>
  );
}

export default Slider;
