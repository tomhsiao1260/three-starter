import * as THREE from 'three';

export default class Fox {
    constructor(_option) {
        this.resources = _option.resources;
        this.time = _option.time;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('fox');
            this.debugFolder.open();
        }

        this.setFox();
    }

    setFox() {
        this.gltf = this.resources.items.fox;
        this.gltf.scene.scale.set(0.0025, 0.0025, 0.0025);
        this.container.add(this.gltf.scene);

        this.mixer = new THREE.AnimationMixer(this.gltf.scene);
        this.action = this.mixer.clipAction(this.gltf.animations[2]);
        this.action.play();

        this.time.on('tick', () => {
            this.mixer.update(this.time.delta * 0.001);
        });

        if (this.debug) {
            this.debugFolder.add(this.gltf.scene, 'visible').name('visible');
            this.debugFolder.add(this.gltf.scene.position, 'z')
                            .step(0.001).min(-2).max(2)
                            .name('positionZ');
        }
    }
}
