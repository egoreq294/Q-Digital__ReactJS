import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../redux/store';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import mapStateToProps from '../redux/mapStateToProps';

import Slider from '../components/slider';

import image0 from '../../img/img0.jpg';
import image1 from '../../img/img1.jpg';
import image2 from '../../img/img2.jpg';

const localStore = [
    { id: 1, source: image0 },
    { id: 2, source: image1 },
    { id: 3, source: image2 },
];
let remoteStore = [];

function SliderPage(props) {
    useEffect(() => {
        fetch('https://imagesapi.osora.ru/')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                remoteStore = json.map((item, index) => {
                    return { id: index, source: item };
                });
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    function handleClickSwitch() {
        props.changeToggle();
    }
    const renderImages =
        props.imgStore === 'localStore' ? localStore : remoteStore;

    return (
        <section className="slider-page">
            {store.getState().imgStore === 'localStore' ? (
                <h1>LOCAL</h1>
            ) : (
                <h1>REMOTE</h1>
            )}
            <Slider className="slider" imgs={renderImages} />
            <button className="slider__btn" onClick={handleClickSwitch}>
                switch to remote
            </button>
            <Link className="link slider__link" to="/">
                Back to main
            </Link>
        </section>
    );
}

const SliderPage_W = connect(
    mapStateToProps('SliderPage'),
    mapDispatchToProps('SliderPage')
)(SliderPage);
export default SliderPage_W;
