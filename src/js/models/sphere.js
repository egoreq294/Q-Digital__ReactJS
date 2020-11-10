import * as THREE from 'three';
import Location from './location';
import panorama1 from '../../img/pano_1.png';
export default class Sphere {
    init = async () => {
        return new Promise((resolve) => {
            const firstLocation = new Location(panorama1);
            firstLocation.loadTexture().then((texture) => {
                this.geometry = new THREE.SphereGeometry(1, 32, 32);
                this.material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.BackSide,
                });
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                resolve(this);
            });
        });
    };
    changeTo = async (newTexture) => {
        return new Promise((resolve) => {
            const newLocation = new Location(newTexture);
            this.texture = newLocation.loadTexture();
            resolve(this.texture);
        }).then((texture) => {
            this.mesh.material.map = texture;
        });
    };
}
