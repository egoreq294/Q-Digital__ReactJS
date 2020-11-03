import React from 'react';

import store from '../redux/store';
import {toggleLocalOrRemote} from '../redux/actions';

function Slider(props){
    console.log(store.getState());
    function handleClickPrev(){
        console.log(store.getState());
        store.dispatch({ type: toggleLocalOrRemote, toggle: toggleLocalOrRemote.toggle?false:true});
        console.log(store.getState());
    }
    return(
        <React.Fragment>            
            <button onClick={handleClickPrev}>prev</button>
            <img src={props.imgSrc} alt='sliderImg'></img>
            <button>next</button>
        </React.Fragment>
    )
}

export default Slider;