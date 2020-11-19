import React from 'react';
import ROUTES from '../routes';
import {Alert, Linking, BackHandler, View} from 'react-native';
import style from '../scss';
import {Button} from './button';
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {to: ROUTES.main.path, title: 'Main'},
        {to: ROUTES.slider.path, title: 'Slider'},
        {to: ROUTES.player.path, title: 'Player'},
        {onPress: this.onSite, title: 'Web'},
        {onPress: this.onExit, title: 'Exit'},
      ],
    };
  }
  onSite = () => {
    Linking.openURL('https://q-digital.org/?lang=ru');
  };
  onExit = () =>
    Alert.alert('Close the application?', '', [
      {text: 'cancel', style: 'cancel'},
      {
        text: 'ok',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
  render() {
    const {buttons} = this.state;
    return (
      <View style={style.menu}>
        {buttons.map((button, key) => (
          <Button
            title={button.title}
            to={button.to}
            onPress={button.onPress}
            key={key}
            style={style.menuButton}
            styleText={style.menuButton__text}
          />
        ))}
      </View>
    );
  }
}

export default Menu;
