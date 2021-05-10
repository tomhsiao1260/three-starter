import * as THREE from 'three';

export default class Torus {
    constructor(_option) {
        this.material = _option.material;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('torus');
            this.debugFolder.open();
        }

        this.setTorus();
    }

    setTorus() {
        const geometry = new THREE.TorusGeometry(0.25, 0.08, 32, 100);
        const material = this.material.items.matcap.gold;
        const mesh = new THREE.Mesh(geometry, material);

        this.container.add(mesh);

        this.container.position.set(0, 0.2, 0);
        this.container.rotation.y = 0.6;
        this.container.updateMatrix();

        if (this.debug) {
            this.debugFolder.add(mesh, 'visible').name('visible');
            this.debugFolder.add(mesh.rotation, 'y')
                            .step(0.001).min(-Math.PI).max(Math.PI)
                            .name('rotateY');
        }
    }
}
