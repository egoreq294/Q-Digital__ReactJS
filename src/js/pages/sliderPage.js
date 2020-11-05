import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../redux/store';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import mapStateToProps from '../redux/mapStateToProps';

import AwesomeSlider from 'react-awesome-slider';

import image0 from '../../img/img0.jpg';
import image1 from '../../img/img1.jpg';
import image2 from '../../img/img2.jpg';

const localStore = [
    { id: 1, source: image0 },
    { id: 2, source: image1 },
    { id: 3, source: image2 },
];
const remoteStore = [
    { id: 1, source: 'https://imagesapi.osora.ru/images/0.jpg' },
    { id: 2, source: 'https://imagesapi.osora.ru/images/1.jpg' },
    { id: 3, source: 'https://imagesapi.osora.ru/images/2.jpg' },
];

function SliderSection(props) {
    function handleClickSwitch() {
        props.changeToggle();
    }
    return (
        <section className="slider">
            <AwesomeSlider className="awesome-slider" bullets={false}>
                {store.getState().imgStore === 'localStore'
                    ? localStore.map((item) => (
                          <div key={item.id} data-src={item.source} />
                      ))
                    : remoteStore.map((item) => (
                          <div key={item.id} data-src={item.source} />
                      ))}
            </AwesomeSlider>
            <button className="slider__btn" onClick={handleClickSwitch}>
                switch to remote
            </button>
            <Link className="link slider__link" to="/">
                Back to main
            </Link>
        </section>
    );
}

const SliderSection_W = connect(
    mapStateToProps('SliderSection'),
    mapDispatchToProps('SliderSection')
)(SliderSection);
export default SliderSection_W;
