import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from '../components/slider';

import { localRemote } from '../redux/actions';

import image0 from '../../img/img0.jpg';
import image1 from '../../img/img1.jpg';
import image2 from '../../img/img2.jpg';

export const localStore = [
    { id: 1, source: image0 },
    { id: 2, source: image1 },
    { id: 3, source: image2 },
];
let remoteStore = [];

function SliderPage(props) {
    const [toggle, setToggle] = useState('local');

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
    }, [props]);

    function handleClickSwitch() {
        if (toggle === 'local') {
            props.localRemote(remoteStore);
            setToggle('remote');
        } else {
            props.localRemote(localStore);
            setToggle('local');
        }
    }
    console.log(props.imgStore);
    return (
        <section className="slider-page">
            {toggle === 'local' ? <h1>LOCAL</h1> : <h1>REMOTE</h1>}
            {props.imgStore && (
                <Slider className="slider" imgs={props.imgStore} />
            )}
            <button className="slider__btn" onClick={handleClickSwitch}>
                switch to remote
            </button>
            <Link className="link slider__link" to="/">
                Back to main
            </Link>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        imgStore: state.imgs,
    };
};

export default connect(mapStateToProps, { localRemote })(SliderPage);
