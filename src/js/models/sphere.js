import * as THREE from 'three';
import Location from './location';
import data from './data';
export default class Sphere {
    constructor(app) {
        this.app = app;
    }
    init = async () => {
        if (!this.app.locations.length) {
            return new Promise((resolve) => {
                this.firstLocation = new Location(data[0]);
                this.app.locations.push(this.firstLocation);
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
        } else {
            this.geometry = new THREE.SphereGeometry(1, 32, 32);
            this.material = new THREE.MeshBasicMaterial({
                map: this.app.locations[0].texture,
                side: THREE.BackSide,
            });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
        }
    };
    changeTo = async (id) => {
        this.location = this.app.locations.find((item) => item.id === id);
        if (this.location) {
            this.mesh.material.map = this.location.texture;
        } else {
            let newlocationObject = data.find((item) => item.id === id);
            this.newLocation = new Location(newlocationObject);
            this.app.locations.push(this.newLocation);
            await this.newLocation.loadTexture();
            this.mesh.material.map = this.newLocation.texture;
        }
    };
}
