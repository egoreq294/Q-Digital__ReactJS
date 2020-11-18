import React from 'react';
import {Alert, BackHandler, StyleSheet, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './src/js/pages/homepage';
import SliderPage from './src/js/pages/sliderpage';
import PlayerPage from './src/js/pages/playerpage';
import EmptyPage from './src/js/pages/emptypage';

import store from './src/js/redux/store';
import {Provider} from 'react-redux';

const Tab = createBottomTabNavigator();

function App() {
  function createExitAlert(event) {
    event.preventDefault();
    Alert.alert(
      'Exit',
      'Сlose the application?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
  }

  async function openBrowser(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            tabStyle: styles.tabStyle,
          }}>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Slider" component={SliderPage} />
          <Tab.Screen name="Player" component={PlayerPage} />
          <Tab.Screen
            name="Web"
            listeners={{
              tabPress: (event) => {
                event.preventDefault();
                openBrowser('https://q-digital.org/?lang=ru');
              },
            }}
            component={EmptyPage}
          />
          <Tab.Screen
            listeners={{
              tabPress: createExitAlert,
            }}
            name="Exit"
            component={EmptyPage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    justifyContent: 'center',
  },
});
export default App;
