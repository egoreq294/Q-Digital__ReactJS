import React from 'react';

import * as THREE from 'three';

class MainPage extends React.Component {
    mount = React.createRef();

    componentDidMount() {
        let scene, camera, renderer, sphere, plane;

        const init = () => {
            scene = new THREE.Scene(); //Сцена
            camera = new THREE.PerspectiveCamera( //Камера
                90,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.mount.current.appendChild(renderer.domElement);
            const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                wireframe: true,
            });
            sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            scene.add(sphere);
            const planeGeometry = new THREE.PlaneGeometry(4, 4);
            const planeMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000,
            });
            plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = (-90 * Math.PI) / 180;
            plane.position.y = -1;
            scene.add(plane);

            camera.rotation.y = (45 * Math.PI) / 180;
            camera.rotation.x = (-45 * Math.PI) / 180;
            camera.rotation.z = (30 * Math.PI) / 180;
            camera.position.z = 2;
            camera.position.y = 2;
            camera.position.x = 3;
        };

        const animate = function render() {
            requestAnimationFrame(render);
            sphere.rotation.x += 0.01;
            renderer.render(scene, camera);
        };

        init();
        animate();
    }

    render() {
        return <div ref={this.mount} />;
    }
}
export default MainPage;
