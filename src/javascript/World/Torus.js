import * as THREE from 'three';

import {TransformControls} from 'three/examples/jsm/controls/TransformControls.js';


export default class Torus {
    constructor(_option) {
        this.material = _option.material;
        this.debug = _option.debug;
        this.camera = _option.camera;
        this.cameraInstance = _option.cameraInstance;
        this.renderer = _option.renderer;
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('torus');
            this.debugFolder.open();
        }

        this.setTorus();
    }

    getCircularReplacer() {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    }

    setTorus() {
        const geometry = new THREE.TorusGeometry(0.25, 0.08, 32, 100);
        const material = this.material.items.matcap.gold;
        const mesh = new THREE.Mesh(geometry, material);
        console.log('this.cameraInstance instanceof THREE.Object3D is ' + (this.cameraInstance instanceof THREE.Object3D))
        console.log('this.cameraInstance instanceof THREE.PerspectiveCamera is ' + (this.cameraInstance instanceof THREE.PerspectiveCamera))
        
        console.log(JSON.stringify('cameraInstance' + this.cameraInstance));//, this.getCircularReplacer()));
        console.log(JSON.stringify('domElement' + this.renderer.domElement, this.getCircularReplacer()));
        this.mesh = new THREE.Mesh(geometry, material)

        // this.mesh.add(this.getLabel());
        this.container.add(this.mesh);
        this.control = new TransformControls(this.cameraInstance, this.renderer.domElement);
        this.control.showY = false;
        this.control.showZ = false;
        this.control.addEventListener('change', this.renderer.render);
        this.control.attach(this.mesh);
        this.container.add(this.control)
        
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
