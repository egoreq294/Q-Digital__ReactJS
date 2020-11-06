import React, { useEffect, useState } from 'react';
import Button from './button';

function Slider(props) {
    const [renderImage, setRenderImage] = useState([]);

    useEffect(() => {
        setRenderImage(props.imgs);
    }, [props.imgs]);

    function handleClickPrev() {
        const lastelem = renderImage[renderImage.length - 1];
        let newImagesArray = renderImage.concat();
        newImagesArray.unshift(lastelem);
        newImagesArray.pop();
        setRenderImage(newImagesArray);
    }
    function handleClickNext() {
        const firstelem = renderImage[0];
        let newImagesArray = renderImage.concat();
        newImagesArray.shift();
        newImagesArray.push(firstelem);
        setRenderImage(newImagesArray);
    }

    return (
        <div className="slider">
            <Button onClick={handleClickPrev} text="prev" />
            {renderImage[0] && (
                <img
                    className="slider__img"
                    src={renderImage[0].source}
                    alt=""
                />
            )}
            <Button onClick={handleClickNext} text="next" />
        </div>
    );
}

export default Slider;
