import * as THREE from 'three';

export default class Fox {
    constructor(_option) {
        this.resources = _option.resources;
        this.time = _option.time;

        this.container = new THREE.Object3D();

        this.setFox();
    }

    setFox() {
        const gltf = this.resources.items.fox;
        gltf.scene.scale.set(0.0025, 0.0025, 0.0025);

        this.container.add(gltf.scene);

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[2]);
        action.play();

        // lights are only used for demo this model
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.container.add(ambientLight, directionalLight);

        this.time.on('tick', () => {
            mixer.update(this.time.delta * 0.001);
        });
    }
}
