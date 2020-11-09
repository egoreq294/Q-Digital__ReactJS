import * as THREE from 'three';

export default class Location {
    constructor(path) {
        this.path = path;
    }

    loadTexture = () => {
        return new Promise((resolve) => {
            const texture = new THREE.TextureLoader().load(this.path);
            resolve(texture);
        });
    };
}
