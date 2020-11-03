import React from 'react';
import { Link } from 'react-router-dom';

import Slider from './Slider';

import './Slider.scss';
import '../App.scss';

function SliderSection(){
    return (        
        <section className='slider'>
            <Slider imgSrc=''/>
            <button>switch to remote</button>
            <Link className='link' to="/">Back to main</Link>            
        </section>
    )
}

export default SliderSection;