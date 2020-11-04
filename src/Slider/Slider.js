import React from 'react';

import store from '../redux/store';
import mapDispatchToProps from './../redux/mapDispatchToProps';
import mapStateToProps from './../redux/mapStateToProps';
import { connect } from 'react-redux';


function Slider(props){
    function handleClickPrev(){
        let prevStore = store.getState().toggle;
        props.changeToggle(prevStore ? false : true);
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


const Slider_1_W =  connect(mapStateToProps("Slider"), mapDispatchToProps("Slider"))(Slider);
export default Slider_1_W;