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
        const gltf = this.resources.items.fox;
        gltf.scene.scale.set(0.0025, 0.0025, 0.0025);

        this.container.add(gltf.scene);

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[2]);
        action.play();

        this.time.on('tick', () => {
            mixer.update(this.time.delta * 0.001);
        });

        if (this.debug) {
            this.debugFolder.add(this.container, 'visible').name('visible');
            this.debugFolder.add(this.container.position, 'z')
                            .step(0.001).min(-2).max(2)
                            .onChange(() => this.container.updateMatrix())
                            .name('positionZ');
        }
    }
}
