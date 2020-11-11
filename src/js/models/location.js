import * as THREE from 'three';
import data from '../models/data';

import Arrow from '../models/arrow';

export default class Location {
    constructor({ id, path, coords, siblings }, app) {
        this.id = id;
        this.path = path;
        this.coords = coords;
        this.siblings = siblings;
        this.app = app;
    }
    loadTexture = () => {
        return new Promise((resolve) => {
            this.texture = new THREE.TextureLoader().load(this.path);
            resolve(this.texture);
        });
    };
    createArrows = () => {
        this.siblings.forEach((id) => {
            const siblingData = data.find((element) => element.id === id);
            const arrow = new Arrow();
            arrow.init(
                this.coords.x,
                this.coords.y,
                this.coords.z,
                siblingData.coords.x,
                siblingData.coords.y,
                siblingData.coords.z
            );
            this.app.scene.add(arrow.mesh);
        });
    };
}
