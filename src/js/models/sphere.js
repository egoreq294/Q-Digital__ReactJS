import * as THREE from 'three';
import Location from './location';
import data from './data';
export default class Sphere {
    constructor(app) {
        this.app = app;
    }

    init = async () => {
        this.location = new Location(data[0], this.app);
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        if (!this.app.locations.length) {
            this.app.locations.push(this.location);
            await this.location.loadTexture();
            this.material = new THREE.MeshBasicMaterial({
                map: this.location.texture,
                side: THREE.DoubleSide,
            });
            this.location.createArrows();
        } else {
            this.material = new THREE.MeshBasicMaterial({
                map: this.app.locations[0].texture,
                side: THREE.DoubleSide,
            });
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(-1, 1, -1);
    };

    changeTo = async (id) => {
        this.location.removeArrows();
        this.location = this.app.locations.find((item) => item.id === id);
        if (this.location) {
            this.mesh.material.map = this.location.texture;
            this.location.createArrows();
        } else {
            let newLocationObject = data.find((item) => item.id === id);
            this.location = new Location(newLocationObject, this.app);
            this.location.createArrows();
            this.app.locations.push(this.location);
            await this.location.loadTexture();
            this.mesh.material.map = this.location.texture;
        }
    };
}
