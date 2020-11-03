import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import MainPage from './MainPage/MainPage';
import SliderSection from './Slider/SliderSection';
import store from './redux/store';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={MainPage} />        
        <Route path="/slider" component={SliderSection} />      
      </Router> 
    </Provider>
  );
}

export default App;
