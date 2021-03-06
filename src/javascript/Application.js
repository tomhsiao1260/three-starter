import * as THREE from 'three';
import * as dat from 'dat.gui';

import Time from './Utils/Time';
import Sizes from './Utils/Sizes';
import Resources from './Resources';

import Camera from './Camera';
import World from './World/index';

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
        this.setWorld();
    }

    setConfig() {
        this.config = {};
        this.config.debug = window.location.hash === '#debug';
    }

    setDebug() {
        if (this.config.debug) {
            this.debug = new dat.GUI({ width: 420 });
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
            renderer: this.renderer,
            debug: this.debug,
        });

        this.scene.add(this.camera.container);

        this.time.on('tick', () => {
            this.renderer.render(this.scene, this.camera.instance);
        });
    }

    setWorld() {
        this.world = new World({
            resources: this.resources,
            time: this.time,
            sizes: this.sizes,
            camera: this.camera,
            renderer: this.renderer,
            debug: this.debug,
        });
        this.scene.add(this.world.container);
    }
}
