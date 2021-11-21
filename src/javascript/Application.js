import * as THREE from 'three';
import GUI from 'lil-gui';

import Time from './Utils/Time';
import Sizes from './Utils/Sizes';
import Resources from './Resources';

import Camera from './Camera';
import Light from './Light';
import World from './World';

export default class Application {
    constructor(_options) {
        this.$canvas = _options.$canvas;

        this.time = new Time();
        this.sizes = new Sizes();
        this.resources = new Resources();

        this.setConfig();
        this.setDebug();
        this.setRenderer();
        this.setCamera();
        this.setLight();
        this.setWorld();
    }

    setConfig() {
        this.config = {};
        this.config.debug = window.location.hash === '#debug';
    }

    setDebug() {
        if (this.config.debug) {
            this.debug = new GUI({ width: 300 });
        }
    }

    setRenderer() {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas,
        });

        const { width, height } = this.sizes.viewport;
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.sizes.on('resize', () => {
            const { width, height } = this.sizes.viewport;
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    setCamera() {
        this.camera = new Camera({
            time: this.time,
            sizes: this.sizes,
            debug: this.debug,
            renderer: this.renderer,
        });

        this.scene.add(this.camera.container);

        this.time.on('tick', () => {
            this.renderer.render(this.scene, this.camera.instance);
        });
    }

    setLight() {
        this.light = new Light({
            debug: this.debug,
        });
        this.scene.add(this.light.container);
    }

    setWorld() {
        this.world = new World({
            time: this.time,
            sizes: this.sizes,
            debug: this.debug,
            light: this.light,
            camera: this.camera,
            renderer: this.renderer,
            resources: this.resources,
        });
        this.scene.add(this.world.container);
    }
}
