import * as THREE from 'three';

export default class Plane {
    constructor(_option) {
        this.material = _option.material;
        this.time = _option.time;

        this.container = new THREE.Object3D();

        this.setPlane();
    }

    setPlane() {
        const geometry = new THREE.PlaneGeometry(1.2, 0.7, 50, 50);
        const mesh = new THREE.Mesh(geometry, this.material);

        this.container.add(mesh);

        this.container.position.set(0, -0.2, 0);
        this.container.rotation.x = -Math.PI / 2;

        this.time.on('tick', () => {
            this.material.uniforms.uTime.value = this.time.elapsed / 1000;
        });
    }
}
