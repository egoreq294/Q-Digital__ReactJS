import * as THREE from 'three';

export default class Arrow {
    constructor(name) {
        this.name = name;
    }
    init = (coords) => {
        let triangle = new THREE.Geometry();
        let v1 = new THREE.Vector3(...coords[0]);
        let v2 = new THREE.Vector3(...coords[1]);
        let v3 = new THREE.Vector3(...coords[2]);

        triangle.vertices.push(v1);
        triangle.vertices.push(v2);
        triangle.vertices.push(v3);

        triangle.faces.push(new THREE.Face3(0, 1, 2));
        triangle.computeFaceNormals();

        this.mesh = new THREE.Mesh(triangle, new THREE.MeshNormalMaterial());
    };
}
