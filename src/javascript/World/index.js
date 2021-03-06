import * as THREE from 'three';

import Materials from './Materials';
import Torus from './Torus';
import Plane from './Plane';
import Fox from './Fox';

export default class World {
    constructor(_option) {
        this.resources = _option.resources;
        this.time = _option.time;
        this.sizes = _option.sizes;
        this.camera = _option.camera;
        this.renderer = _option.renderer;
        this.debug = _option.debug;

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
    }

    start() {
        this.materials = new Materials({ resources: this.resources });

        this.setTorus();
        this.setPlane();
        this.setFox();
    }

    setTorus() {
        this.torus = new Torus({
            material: this.materials.items.matcap.gold,
            debug: this.debugFolder,
        });
        this.container.add(this.torus.container);
    }

    setPlane() {
        this.plane = new Plane({
            material: this.materials.items.shader.plane,
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
}
