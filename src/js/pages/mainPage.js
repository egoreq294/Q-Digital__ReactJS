import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <section className="main-page">
            <div className="main-page__text">HELLO</div>
            <Link className="link" to="/slider">
                Слайдер
            </Link>
        </section>
    );
}

export default MainPage;
