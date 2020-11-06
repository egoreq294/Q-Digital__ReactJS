import React from 'react';

import * as THREE from 'three';

/*function MainPage() {    
    return (
        <section className="main-page">
            <div className="main-page__text">HELLO</div>
            <Link className="link" to="/slider">
                Слайдер
            </Link>
        </section>
    );
    return <div className="threejs-root">{renderer.domElement}</div>;
}*/

class MainPage extends React.Component {
    mount = React.createRef();

    componentDidMount() {
        let scene = new THREE.Scene();

        let camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.current.appendChild(renderer.domElement);

        let geometry = new THREE.SphereGeometry(1, 32, 32); //Сфара

        let material = new THREE.MeshNormalMaterial(); //Навешиваем на нее материал

        let sphere = new THREE.Mesh(geometry, material); //Объединяем

        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        scene.add(sphere);
        camera.position.z = 3;

        /*let animate = function render() {
            requestAnimationFrame(render);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();*/
        renderer.render(scene, camera);
    }

    render() {
        return <div ref={this.mount} />;
    }
}
export default MainPage;
