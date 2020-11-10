import * as THREE from 'three';

export default class Arrow {
    init = () => {
        const triangle = new THREE.Shape();
        triangle.moveTo(0, 0);
        triangle.lineTo(-0.1, 0.2);
        triangle.lineTo(0.1, 0.2);
        triangle.lineTo(0, 0);
        const extrudeSettings = { bevelEnabled: false, depth: 0.03 };
        const geometry = new THREE.ExtrudeBufferGeometry(
            triangle,
            extrudeSettings
        );
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = (135 * Math.PI) / 180;
        this.mesh.position.z = -0.7;
        this.mesh.position.y = -0.2;
    };
}
