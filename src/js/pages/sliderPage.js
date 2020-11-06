import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from '../components/slider';
import Button from '../components/button';

import { setRemote } from '../redux/actions';

import image0 from '../../img/img0.jpg';
import image1 from '../../img/img1.jpg';
import image2 from '../../img/img2.jpg';

const localStore = [
    { id: 1, source: image0 },
    { id: 2, source: image1 },
    { id: 3, source: image2 },
];

function SliderPage(props) {
    const [toggle, setToggle] = useState('local');

    useEffect(() => {
        fetch('https://imagesapi.osora.ru/')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return json.map((item, index) => {
                    return { id: index, source: item };
                });
            })
            .then((elem) => {
                props.setRemote(elem);
            })
            .catch((err) => {
                alert(err);
            });
        // eslint-disable-next-line
    }, []);

    function handleClickSwitch() {
        toggle === 'local' ? setToggle('remote') : setToggle('local');
    }

    const images = toggle === 'local' ? localStore : props.remoteStore;

    return (
        <section className="slider-page">
            {props.remoteStore && <Slider className="slider" imgs={images} />}
            <Button
                className="slider__btn"
                onClick={handleClickSwitch}
                text={'switch to remote'}
            />
            <Link className="link slider__link" to="/">
                Back to main
            </Link>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        remoteStore: state.remote,
    };
};

export default connect(mapStateToProps, { setRemote })(SliderPage);
