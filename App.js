import React from 'react';
import {NativeRouter, Route, Switch} from 'react-router-native';
import Menu from './src/js/components/menu';
import ROUTES from './src/js/routes';

import store from './src/js/redux/store';
import {Provider} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Switch>
            {Object.keys(ROUTES).map((name, key) => (
              <Route {...ROUTES[name]} key={key} />
            ))}
          </Switch>
          <Menu />
        </NativeRouter>
      </Provider>
    );
  }
}
export default App;
