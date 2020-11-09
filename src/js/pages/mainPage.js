import React from 'react';

import * as THREE from 'three';

import Sphere from '../models/sphere';
/*import Arrow from '../models/arrow';*/

class MainPage extends React.Component {
    mount = React.createRef();
    async componentDidMount() {
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

        let mainSphere = new Sphere();
        await mainSphere.init();
        scene.add(mainSphere.mesh);

        /*let arrow = new Arrow();
        arrow.init([
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ]);
        scene.add(arrow.mesh);*/

        const planeGeometry = new THREE.PlaneGeometry(4, 4);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = (-90 * Math.PI) / 180;
        plane.position.y = -1;
        scene.add(plane);

        camera.rotation.y = (45 * Math.PI) / 180;
        camera.rotation.x = (-45 * Math.PI) / 180;
        camera.rotation.z = (30 * Math.PI) / 180;
        camera.position.y = 2;
        camera.position.x = 3;
        camera.position.z = 2;

        const animate = function render() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };
        animate();
    }

    render() {
        return <div ref={this.mount} />;
    }
}
export default MainPage;
