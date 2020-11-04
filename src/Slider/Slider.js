import React from 'react';



function Slider(props){
    
    return(
        <React.Fragment>            
            <button>prev</button>
            <img src={props.imgSrc} alt='sliderImg'></img>
            <button>next</button>
        </React.Fragment>
    )
}

export default Slider;