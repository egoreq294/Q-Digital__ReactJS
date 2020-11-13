import * as THREE from 'three';
import {
    calcVector,
    calcVectorLength,
    calcUnitVector,
    createTriangularPrism,
} from '../helpers/helpers';

export default class Arrow {
    constructor(idTo) {
        this.idTo = idTo;
    }
    init = (x1, y1, z1, x2, y2, z2) => {
        this.vectorFromTo = calcVector(x1, y1, z1, x2, y2, z2);
        this.vectorLengh = calcVectorLength(
            this.vectorFromTo.x,
            this.vectorFromTo.y,
            this.vectorFromTo.z
        );
        this.unitVector = calcUnitVector(
            this.vectorFromTo.x,
            this.vectorFromTo.y,
            this.vectorFromTo.z,
            this.vectorLengh
        );
        const reductionFactor = 0.1;
        const shearFactor = 0.3;

        let triangleGeometry = new THREE.Geometry();

        createTriangularPrism(
            triangleGeometry,
            this.unitVector.x,
            this.unitVector.y,
            this.unitVector.z,
            reductionFactor,
            shearFactor
        );

        const triangleMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

        this.mesh.idTo = this.idTo;
        this.mesh.unitVector = this.unitVector;
        this.mesh.position.y = -0.3;
        this.mesh.position.x = this.unitVector.x * 0.5;
        this.mesh.position.z = this.unitVector.z * 0.5;

        /*if (this.unitVector.z < 0) {
            this.mesh.rotation.x = (30 * Math.PI) / 180;
        }
        if (this.unitVector.z > 0) {
            this.mesh.rotation.x = (-30 * Math.PI) / 180;
        }
        if (this.unitVector.x < 0) {
            this.mesh.rotation.z = (-30 * Math.PI) / 180;
        }
        if (this.unitVector.x > 0) {
            this.mesh.rotation.z = (30 * Math.PI) / 180;
        }*/
    };
}
