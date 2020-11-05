import React, { useEffect, useState } from 'react';

function Slider(props) {
    const [renderImage, setRenderImage] = useState([]);

    useEffect(() => {
        setRenderImage(props.imgs);
    }, [props.imgs]);

    function handleClickPrev() {
        const lastelem = renderImage[renderImage.length - 1];
        let newImagesArray = renderImage.concat();
        console.log(newImagesArray);
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
            <button onClick={handleClickPrev}>prev</button>
            <div className="slider__img">
                {renderImage[0] && <img src={renderImage[0].source} alt="" />}
            </div>
            <button onClick={handleClickNext}>next</button>
        </div>
    );
}

export default Slider;
