import * as THREE from 'three';

import Materials from './Materials';
import Controls from './Controls';
import Torus from './Torus';
import Plane from './Plane';
import Fox from './Fox';
import Transition from './Transition';

export default class World {
    constructor(_option) {
        this.time = _option.time;
        this.sizes = _option.sizes;
        this.debug = _option.debug;
        this.light = _option.light;
        this.camera = _option.camera;
        this.renderer = _option.renderer;
        this.resources = _option.resources;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('world');
            this.debugFolder.open();
        }

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.setStartingScreen();
    }

    setStartingScreen() {
        this.resources.on('progess', (percent) => console.log(`progress ${percent}/100`));
        this.resources.on('ready', () => this.start());

        const { loaded, toLoad } = this.resources.loader;
        if (loaded === toLoad) this.start();
    }

    async start() {
        this.setControls();
        this.setMaterial();
        this.setTorus();
        this.setPlane();
        this.setFox();
        this.setTransition();

        await this.transition.firstTransition();
    }

    setControls() {
        this.controls = new Controls({
            time: this.time,
            sizes: this.sizes,
        });
    }

    setMaterial() {
        this.material = new Materials({
            resources: this.resources,
        });
    }

    setTorus() {
        this.torus = new Torus({
            material: this.material,
            debug: this.debugFolder,
        });
        this.container.add(this.torus.container);
    }

    setPlane() {
        this.plane = new Plane({
            material: this.material,
            time: this.time,
            debug: this.debugFolder,
        });
        this.container.add(this.plane.container);
    }

    setFox() {
        this.fox = new Fox({
            resources: this.resources,
            time: this.time,
            debug: this.debugFolder,
        });
        this.container.add(this.fox.container);
    }

    setTransition() {
        this.transition = new Transition({
            light: this.light,
            camera: this.camera,
        });
    }
}
