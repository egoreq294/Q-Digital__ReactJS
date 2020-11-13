import React from 'react';

import * as THREE from 'three';
import TWEEN from 'tween';

import Sphere from '../models/sphere';

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
    lon = 0;
    phi = 0;
    theta = 0;
    state = {
        isLoading: true,
    };
    toggleControl = true;
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

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
        this.scene.add(this.light);

        this.mainSphere = new Sphere(this);
        this.mainSphere.init();
        this.scene.add(this.mainSphere.mesh);
        await this.mainSphere.changeTo(0, true);

        console.log(this.mainSphere.mesh.material.map);
        this.secondSphere = new Sphere(this);
        this.secondSphere.init();
        this.secondSphere.mesh.position.z = -2;
        this.scene.add(this.secondSphere.mesh);
        await this.secondSphere.changeTo(0, false);

        /*this.camera.rotation.y = (45 * Math.PI) / 180;
        this.camera.rotation.x = (-45 * Math.PI) / 180;
        this.camera.rotation.z = (30 * Math.PI) / 180;
        this.camera.position.y = 2;
        this.camera.position.x = 3;
        this.camera.position.z = 2;*/

        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.mount.current.addEventListener('click', this.onArrowClick);
        window.addEventListener('mousedown', this.onPointerStart);
        window.addEventListener('mousemove', this.onPointerMove);
        window.addEventListener('mouseup', this.onPointerUp);
        window.addEventListener('resize', this.onWindowResize);
        this.animate();
    }
    componentWillUnmount() {
        this.removeEvents();
    }
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    onPointerStart = (event) => {
        if (this.toggleControl) {
            let clientX = event.clientX || event.touches[0].clientX;
            let clientY = event.clientY || event.touches[0].clientY;
            this.mouseDownMouseX = clientX;
            this.mouseDownMouseY = clientY;
            this.mouseDownLon = this.lon;
            this.mouseDownLat = this.lat;
        }
    };
    onPointerMove = (event) => {
        if (this.toggleControl) {
            if (!this.mouseDownMouseX) return;
            let clientX = event.clientX || event.touches[0].clientX;
            let clientY = event.clientY || event.touches[0].clientY;
            this.lon =
                ((this.mouseDownMouseX - clientX) * this.camera.fov) / 600 +
                this.mouseDownLon;
            this.lat =
                ((clientY - this.mouseDownMouseY) * this.camera.fov) / 600 +
                this.mouseDownLat;
        }
    };
    onPointerUp = () => {
        if (this.toggleControl) {
            this.mouseDownMouseX = null;
        }
    };
    onArrowClick = async (event) => {
        if (this.toggleControl) {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(
                this.mainSphere.location.arrows,
                true
            );
            if (intersects.length) {
                this.toggleControl = false;
                this.phi = Math.acos(intersects[0].object.unitVector.y);
                this.theta = Math.atan2(
                    intersects[0].object.unitVector.z,
                    intersects[0].object.unitVector.x
                );
                this.lon = THREE.Math.radToDeg(this.theta);
                this.lat = 90 - THREE.Math.radToDeg(this.phi);

                await this.secondSphere.changeTo(
                    intersects[0].object.idTo,
                    false
                );

                let tweenData = Object.assign(intersects[0].object.unitVector, {
                    opc1: 1,
                    opc2: 0,
                });

                new TWEEN.Tween(tweenData)
                    .to({ x: 0, y: 0, z: 0, opc1: 0, opc2: 1 }, 1000)
                    .onUpdate(() => {
                        this.secondSphere.mesh.position.set(
                            0.8 * tweenData.x,
                            0.8 * tweenData.y,
                            0.8 * tweenData.z
                        );
                        this.mainSphere.mesh.material.opacity = tweenData.opc1;
                        this.secondSphere.mesh.material.opacity =
                            tweenData.opc2;
                    })
                    .start()
                    .onComplete(async () => {
                        this.mainSphere.mesh.material.opacity = 1;
                        this.secondSphere.mesh.material.opacity = 0;
                        this.secondSphere.mesh.position.set(10, 10, 10);
                        await this.mainSphere.changeTo(
                            intersects[0].object.idTo,
                            true
                        );
                        this.toggleControl = true;
                    });
            }
        }
    };
    animate = () => {
        requestAnimationFrame(this.animate);
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = THREE.Math.degToRad(90 - this.lat);
        this.theta = THREE.Math.degToRad(this.lon);
        this.camera.target.x = Math.sin(this.phi) * Math.cos(this.theta);
        this.camera.target.y = Math.cos(this.phi);
        this.camera.target.z = Math.sin(this.phi) * Math.sin(this.theta);
        this.camera.lookAt(this.camera.target);
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading && (
                    <div className="loader-block">
                        <div id="cube-loader">
                            <div class="caption">
                                <div class="cube-loader">
                                    <div class="cube loader-1"></div>
                                    <div class="cube loader-2"></div>
                                    <div class="cube loader-4"></div>
                                    <div class="cube loader-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={this.mount} />
            </React.Fragment>
        );
    }
}
export default MainPage;
