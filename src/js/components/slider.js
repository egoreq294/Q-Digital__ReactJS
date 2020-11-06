import React, { useState } from 'react';
import Button from './button';

function Slider(props) {
    const [count, setCount] = useState([0]);

    const handleClickPrev = () => {
        const images = props.imgs;
        let count1 = count;
        if (--count1 < 0) {
            count1 = images.length - 1;
        }
        setCount(count1);
    };
    const handleClickNext = () => {
        const images = props.imgs;
        let count1 = count;
        if (++count1 > images.length - 1) {
            count1 = 0;
        }
        setCount(count1);
    };

    return (
        <div className="slider">
            <Button onClick={handleClickPrev} text="prev" />
            {props.imgs[0] && (
                <img
                    className="slider__img"
                    src={props.imgs[count].source}
                    alt=""
                />
            )}
            <Button onClick={handleClickNext} text="next" />
        </div>
    );
}

export default Slider;
