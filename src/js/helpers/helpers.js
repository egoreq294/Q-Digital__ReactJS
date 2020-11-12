import * as THREE from 'three';

export function calcVectorLength(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}
export function calcVector(x1, y1, z1, x2, y2, z2) {
    return { x: x2 - x1, y: y2 - y1, z: z2 - z1 };
}
export function calcUnitVector(x, y, z, length) {
    return { x: x / length, y: y / length, z: z / length };
}
export function createTriangularPrism(
    geometry,
    vectorX,
    vectorY,
    vectorZ,
    reductionFactor,
    shearFactor
) {
    geometry.vertices.push(
        new THREE.Vector3(
            reductionFactor * vectorZ,
            reductionFactor * vectorY,
            reductionFactor * -vectorX
        )
    );
    geometry.vertices.push(
        new THREE.Vector3(
            reductionFactor * vectorX,
            reductionFactor * vectorY,
            reductionFactor * vectorZ
        )
    );
    geometry.vertices.push(
        new THREE.Vector3(
            reductionFactor * -vectorZ,
            reductionFactor * vectorY,
            reductionFactor * vectorX
        )
    );

    geometry.vertices.push(
        new THREE.Vector3(
            reductionFactor * vectorZ,
            reductionFactor * (vectorY + shearFactor),
            reductionFactor * -vectorX
        )
    );
    geometry.vertices.push(
        new THREE.Vector3(
            reductionFactor * vectorX,
            reductionFactor * (vectorY + shearFactor),
            reductionFactor * vectorZ
        )
    );
    geometry.vertices.push(
        new THREE.Vector3(
            reductionFactor * -vectorZ,
            reductionFactor * (vectorY + shearFactor),
            reductionFactor * vectorX
        )
    );

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(3, 4, 5));

    geometry.faces.push(new THREE.Face3(0, 2, 5));
    geometry.faces.push(new THREE.Face3(0, 3, 5));
    geometry.faces.push(new THREE.Face3(0, 4, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(2, 4, 1));
    geometry.faces.push(new THREE.Face3(5, 2, 4));

    geometry.computeFaceNormals();
}
