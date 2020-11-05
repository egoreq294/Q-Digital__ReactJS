import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainPage from './pages/mainPage';
import SliderPage from './pages/sliderPage';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/" component={MainPage} />
                <Route path="/slider" component={SliderPage} />
            </Router>
        </Provider>
    );
}

export default App;
