import React from 'react';

import * as THREE from 'three';

import Sphere from '../models/sphere';
import Arrow from '../models/arrow';

import { calcVector } from '../helpers/helpers';

class MainPage extends React.Component {
    locations = [];
    scene;
    camera;
    renderer;
    mainSphere;
    mouseDownMouseX;
    mouseDownMouseY;
    mouseDownLon;
    mouseDownLat;
    lat = 0;
    lon = -90;
    phi = 0;
    theta = 0;
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

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.light = new THREE.PointLight(0xffffff);
        this.light.position.y = 10;
        this.scene.add(this.light);
        //===============================================================================
        //
        //      ТЕСТ СТРЕЛОК
        //
        let newVector1 = calcVector(0, 0, 0, 0, 0, 3);
        this.arrow1 = new Arrow();
        this.arrow1.init(...newVector1);

        let newVector2 = calcVector(0, 0, 0, 0, 0, -3);
        this.arrow2 = new Arrow();
        this.arrow2.init(...newVector2);

        let newVector3 = calcVector(0, 0, 0, 3, 0, 0);
        this.arrow3 = new Arrow();
        this.arrow3.init(...newVector3);

        let newVector4 = calcVector(0, 0, 0, -3, 0, 0);
        this.arrow4 = new Arrow();
        this.arrow4.init(...newVector4);

        let newVector5 = calcVector(0, 0, 0, 2.5, 0, -1.5);
        this.arrow5 = new Arrow();
        this.arrow5.init(...newVector5);

        this.scene.add(
            this.arrow1.mesh,
            this.arrow2.mesh,
            this.arrow3.mesh,
            this.arrow4.mesh,
            this.arrow5.mesh
        );
        //
        //
        //
        //=================================================================================

        this.mainSphere = new Sphere(this);
        await this.mainSphere.init();
        this.scene.add(this.mainSphere.mesh);

        this.secondSphere = new Sphere(this);
        await this.secondSphere.init();
        this.secondSphere.mesh.position.z = -2;
        this.scene.add(this.secondSphere.mesh);

        const planeGeometry = new THREE.PlaneGeometry(4, 20);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = (-90 * Math.PI) / 180;
        plane.position.y = -1;
        this.scene.add(plane);

        /*this.camera.rotation.y = (45 * Math.PI) / 180;
        this.camera.rotation.x = (-45 * Math.PI) / 180;
        this.camera.rotation.z = (30 * Math.PI) / 180;
        this.camera.position.y = 2;
        this.camera.position.x = 3;
        this.camera.position.z = 2;*/

        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.mount.current.addEventListener('mousedown', this.onPointerStart);
        this.mount.current.addEventListener('mousemove', this.onPointerMove);
        this.mount.current.addEventListener('mouseup', this.onPointerUp);
        window.addEventListener('resize', this.onWindowResize);
        this.animate();
    }
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    onPointerStart = (event) => {
        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;
        this.mouseDownMouseX = clientX;
        this.mouseDownMouseY = clientY;
        this.mouseDownLon = this.lon;
        this.mouseDownLat = this.lat;
    };
    onPointerMove = (event) => {
        if (!this.mouseDownMouseX) return;
        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;
        this.lon =
            ((this.mouseDownMouseX - clientX) * this.camera.fov) / 600 +
            this.mouseDownLon;
        this.lat =
            ((clientY - this.mouseDownMouseY) * this.camera.fov) / 600 +
            this.mouseDownLat;
    };
    onPointerUp = () => {
        this.mouseDownMouseX = null;
    };
    animate = () => {
        requestAnimationFrame(this.animate);
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = THREE.Math.degToRad(90 - this.lat);
        this.theta = THREE.Math.degToRad(this.lon);
        this.camera.target.x =
            0.001 * Math.sin(this.phi) * Math.cos(this.theta);
        this.camera.target.y = 0.001 * Math.cos(this.phi);
        this.camera.target.z =
            0.001 * Math.sin(this.phi) * Math.sin(this.theta);
        this.camera.lookAt(this.camera.target);

        /*this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            console.log(intersects);
        }*/

        this.renderer.render(this.scene, this.camera);
    };
    render() {
        return <div ref={this.mount} />;
    }
}
export default MainPage;
