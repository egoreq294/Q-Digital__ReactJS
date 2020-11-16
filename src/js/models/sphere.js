import * as THREE from 'three';
import Location from './location';
import data from '../data';
export default class Sphere {
    constructor(app) {
        this.app = app;
    }

    init = async () => {
        this.location = new Location(data[0], this.app);
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(-1, 1, -1);
    };

    changeTo = async (id, toggleArrows) => {
        this.location.removeArrows();
        this.mesh.rotation.y = 0;
        this.location = this.app.locations.find((item) => item.id === id);
        if (this.location) {
            this.mesh.material.map = this.location.texture;
        } else {
            this.app.setState({ isLoading: true });
            this.app.toggleControl = false;
            let newLocationObject = data.find((item) => item.id === id);
            this.location = new Location(newLocationObject, this.app);
            this.app.locations.push(this.location);
            await this.location.loadTexture().then(() => {
                this.app.setState({ isLoading: false });
                this.app.toggleControl = true;
            });
            this.mesh.material.map = this.location.texture;
        }
        if (toggleArrows) {
            this.location.createArrows();
        }
        if (this.location.direction) {
            this.rotateSphere(this.location.direction);
        }

        this.location.siblings.forEach(async (id) => {
            let checkLocation = this.app.locations.find(
                (item) => item.id === id
            );
            if (!checkLocation) {
                let preloadLocationObject = data.find((item) => item.id === id);
                let preloadLocation = new Location(
                    preloadLocationObject,
                    this.app
                );
                await preloadLocation.loadTexture();
                this.app.locations.push(preloadLocation);
            }
        });
    };
    rotateSphere = (deg) => {
        this.mesh.rotation.y = THREE.MathUtils.degToRad(deg);
    };
}
