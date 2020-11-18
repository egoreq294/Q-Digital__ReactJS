import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
function HomePage(props) {
  function handlePress() {
    props.navigation.navigate('Slider');
  }
  return (
    <React.Fragment>
      <View style={styles.screenContainer}>
        <Text style={styles.text}>Hello</Text>
        <Button
          buttonStyle={styles.button}
          onPress={handlePress}
          title="Go to Slider"
        />
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
  },
});
export default HomePage;
