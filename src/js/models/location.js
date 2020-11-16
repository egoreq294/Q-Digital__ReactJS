import * as THREE from 'three';
import data from '../data';

import Arrow from '../models/arrow';

export default class Location {
    constructor({ id, path, coords, siblings, direction }, app) {
        this.id = id;
        this.path = path;
        this.coords = coords;
        this.siblings = siblings;
        this.direction = direction;
        this.app = app;
    }
    arrows = [];
    loadTexture = () => {
        return new Promise((resolve) => {
            new THREE.TextureLoader().load(`${this.path}`, (texture) => {
                this.texture = texture;
                resolve(texture);
            });
        });
    };

    createArrows = () => {
        this.siblings.forEach((id) => {
            const siblingData = data.find((element) => element.id === id);
            const arrow = new Arrow(id);
            arrow.init(
                this.coords.x,
                this.coords.y,
                this.coords.z,
                siblingData.coords.x,
                siblingData.coords.y,
                siblingData.coords.z
            );
            this.arrows.push(arrow.mesh);
            this.app.scene.add(arrow.mesh);
        });
    };
    removeArrows = () => {
        this.arrows.forEach((item) => {
            this.app.scene.remove(item);
        });
        this.arrows = [];
    };
}
