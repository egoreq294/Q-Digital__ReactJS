import * as THREE from 'three';

export default class Location {
    constructor({ id, path }) {
        this.id = id;
        this.path = path;
    }
    loadTexture = () => {
        return new Promise((resolve) => {
            this.texture = new THREE.TextureLoader().load(this.path);
            resolve(this.texture);
        });
    };
}
