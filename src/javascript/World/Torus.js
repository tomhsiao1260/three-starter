import * as THREE from 'three';

export default class Torus {
    constructor(_option) {
        this.material = _option.material;
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.setTorus();
    }

    setTorus() {
        const geometry = new THREE.TorusGeometry(0.25, 0.08, 32, 100);
        const mesh = new THREE.Mesh(geometry, this.material);

        this.container.add(mesh);

        this.container.position.set(0, 0.2, 0);
        this.container.rotation.y = 0.6;
        this.container.updateMatrix();
    }
}
