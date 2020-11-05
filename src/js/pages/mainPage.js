import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <section className="main-page">
            <h1>HELLO</h1>
            <Link className="link" to="/slider">
                Слайдер
            </Link>
        </section>
    );
}

export default MainPage;
