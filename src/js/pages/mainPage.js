import React from 'react';

import * as THREE from 'three';

import Sphere from '../models/sphere';
import Arrow from '../models/arrow';

class MainPage extends React.Component {
    locations = [];
    mount = React.createRef();
    async componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.current.appendChild(this.renderer.domElement);

        this.light = new THREE.PointLight(0xffffff);
        this.light.position.y = 10;
        this.light.position.z = 10;
        this.scene.add(this.light);

        this.arrow = new Arrow();
        this.arrow.init();
        this.scene.add(this.arrow.mesh);

        this.mainSphere = new Sphere(this);
        await this.mainSphere.init();
        this.scene.add(this.mainSphere.mesh);

        this.secondSphere = new Sphere(this);
        await this.secondSphere.init();
        this.secondSphere.mesh.position.z = -2;
        this.scene.add(this.secondSphere.mesh);

        this.planeGeometry = new THREE.PlaneGeometry(4, 20);
        this.planeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
        });
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.rotation.x = (-90 * Math.PI) / 180;
        this.plane.position.y = -1;
        this.scene.add(this.plane);

        /*this.camera.rotation.y = (45 * Math.PI) / 180;
        this.camera.rotation.x = (-45 * Math.PI) / 180;
        this.camera.rotation.z = (30 * Math.PI) / 180;
        this.camera.position.y = 2;
        this.camera.position.x = 3;
        this.camera.position.z = 2;*/

        /*const animate = function render() {
            requestAnimationFrame(render);
            renderer.render(this.scene, this.camera);
        };
        animate();*/
        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    };
    render() {
        return <div ref={this.mount} />;
    }
}
export default MainPage;
