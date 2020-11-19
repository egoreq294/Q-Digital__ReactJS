import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import style from '../scss';
import {Link} from 'react-router-native';

export class Button extends React.Component {
  render() {
    const {title, onPress, to} = this.props;
    let props = {style: {...style.button, ...this.props.style}};
    if (to) {
      props.to = to;
    } else {
      props.onPress = onPress;
    }
    return (
      <Link component={TouchableOpacity} {...props}>
        <Text style={{...style.button__text, ...this.props.styleText}}>
          {title}
        </Text>
      </Link>
    );
  }
  static defaultProps = {
    to: undefined,
    title: '',
    onPress: () => false,
    style: {},
    styleText: {},
  };
}
