import * as THREE from 'three';
import Location from './location';
import panorama1 from '../../img/pano_1.png';
export default class Sphere {
    init = async () => {
        return new Promise((resolve) => {
            this.firstLocation = new Location({
                path: panorama1,
            });
            this.firstLocation.loadTexture().then((texture) => {
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
}
