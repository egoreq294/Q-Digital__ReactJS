import * as THREE from 'three';
import { calcVectorLength, calcUnitVector } from '../helpers/helpers';

export default class Arrow {
    init = (x, y, z) => {
        this.vectorLengh = calcVectorLength(x, y, z);
        this.unitVector = calcUnitVector(x, y, z, this.vectorLengh);
        console.log(this.vectorLengh);
        console.log(...this.unitVector);
        let coef = 0.1;

        let triangleGeometry = new THREE.Geometry();

        /*triangleGeometry.vertices.push(new THREE.Vector3(0.1, 0, 0));
        triangleGeometry.vertices.push(new THREE.Vector3(0, 0, -0.2));
        triangleGeometry.vertices.push(new THREE.Vector3(-0.1, 0, 0));

        triangleGeometry.vertices.push(new THREE.Vector3(0.1, 0.03, 0));
        triangleGeometry.vertices.push(new THREE.Vector3(0, 0.03, -0.2));
        triangleGeometry.vertices.push(new THREE.Vector3(-0.1, 0.03, 0));*/

        triangleGeometry.vertices.push(
            new THREE.Vector3(
                coef * this.unitVector[2],
                coef * this.unitVector[1],
                coef * -this.unitVector[0]
            )
        );
        triangleGeometry.vertices.push(
            new THREE.Vector3(
                coef * this.unitVector[0],
                coef * this.unitVector[1],
                coef * this.unitVector[2]
            )
        );
        triangleGeometry.vertices.push(
            new THREE.Vector3(
                coef * -this.unitVector[2],
                coef * this.unitVector[1],
                coef * this.unitVector[0]
            )
        );

        triangleGeometry.vertices.push(
            new THREE.Vector3(
                coef * this.unitVector[2],
                coef * (this.unitVector[1] + 0.3),
                coef * -this.unitVector[0]
            )
        );
        triangleGeometry.vertices.push(
            new THREE.Vector3(
                coef * this.unitVector[0],
                coef * (this.unitVector[1] + 0.3),
                coef * this.unitVector[2]
            )
        );
        triangleGeometry.vertices.push(
            new THREE.Vector3(
                coef * -this.unitVector[2],
                coef * (this.unitVector[1] + 0.3),
                coef * this.unitVector[0]
            )
        );

        triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
        triangleGeometry.faces.push(new THREE.Face3(3, 4, 5));

        triangleGeometry.faces.push(new THREE.Face3(0, 2, 5, 0x00ff00));
        triangleGeometry.faces.push(new THREE.Face3(0, 3, 5, 0x00ff00));
        triangleGeometry.faces.push(new THREE.Face3(0, 4, 1, 0x00ff00));
        triangleGeometry.faces.push(new THREE.Face3(0, 3, 4, 0x00ff00));
        triangleGeometry.faces.push(new THREE.Face3(2, 4, 1, 0x00ff00));
        triangleGeometry.faces.push(new THREE.Face3(5, 2, 4, 0x00ff00));

        triangleGeometry.computeFaceNormals();

        const triangleMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

        this.mesh.position.y = -0.3;
        this.mesh.position.x = this.unitVector[0] * 0.5;
        this.mesh.position.z = this.unitVector[2] * 0.5;

        if (this.unitVector[2] < 0) {
            this.mesh.rotation.x = (30 * Math.PI) / 180;
        }
        if (this.unitVector[2] > 0) {
            this.mesh.rotation.x = (-30 * Math.PI) / 180;
        }
        if (this.unitVector[0] < 0) {
            this.mesh.rotation.z = (-30 * Math.PI) / 180;
        }
        if (this.unitVector[0] > 0) {
            this.mesh.rotation.z = (30 * Math.PI) / 180;
        }
    };
}
