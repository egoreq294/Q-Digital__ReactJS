import React  from 'react';
import { Link } from 'react-router-dom';
import store from '../redux/store';
import mapDispatchToProps from './../redux/mapDispatchToProps';
import mapStateToProps from './../redux/mapStateToProps';
import { connect } from 'react-redux';

import Slider from './Slider';

import './Slider.scss';
import '../App.scss';

function SliderSection(props){
    console.log(store.getState());
    function handleClickSwitch(){
        props.changeToggle();
    }

    return (        
        <section className='slider'>
            <Slider imgSrc=''/>
            <button onClick={handleClickSwitch}>switch to remote</button>
            <Link className='link' to="/">Back to main</Link>            
        </section>
    )
}

const SliderSection_W =  connect(mapStateToProps("SliderSection"), mapDispatchToProps("SliderSection"))(SliderSection);
export default SliderSection_W;