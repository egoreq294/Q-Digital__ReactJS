import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '../components/button';
import styles from '../scss';
function HomePage() {
  return (
    <React.Fragment>
      <View style={{...styles.screenContainer, ...styles.alignCenter}}>
        <Text style={styles.title}>Hello</Text>
        <Button
          style={styles.screenButton}
          to="/slider"
          styleText={styles.screenButton__text}
          title="Go to Slider"
        />
      </View>
    </React.Fragment>
  );
}

export default HomePage;
