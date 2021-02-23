import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import EventEmitter from './EventEmitter';

export default class Loader extends EventEmitter {
    constructor() {
        super();

        this.setLoaders();

        this.toLoad = 0; // total resources
        this.loaded = 0; // loaded resources
    }

    setLoaders() {
        const textureLoader = new THREE.TextureLoader();
        this.loaders = [];

        // ex: _resource: { name: 'matcapRed', source: 'xxx.jpg' }
        this.loaders.push({
            extensions: ['jpg', 'png'],
            action: (_resource) => {
                textureLoader.load(_resource.source, (_texture) => {
                    this.fileLoadEnd(_resource, _texture);
                });
            },
        });

        // Draco
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('draco/');
        dracoLoader.setDecoderConfig({ type: 'js' });

        this.loaders.push({
            extensions: ['drc'],
            action: (_resource) => {
                dracoLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                    DRACOLoader.releaseDecoderModule();
                });
            },
        });

        // GLTF
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        this.loaders.push({
            extensions: ['glb', 'gltf'],
            action: (_resource) => {
                gltfLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });

        // FBX
        const fbxLoader = new FBXLoader();

        this.loaders.push({
            extensions: ['fbx'],
            action: (_resource) => {
                fbxLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            },
        });
    }

    // execute after loading each asset
    fileLoadEnd(_resource, _data) {
        this.loaded += 1;

        // ex: _data: THREE Texture
        this.trigger('fileEnd', [_resource, _data]);

        // all finished
        if (this.loaded === this.toLoad) {
            this.trigger('end');
        }
    }

    load(_resources = []) {
        _resources.forEach((_resource) => {
            this.toLoad += 1;
            // jpg, png, ...
            const extensionMatch = _resource.source.match(/\.([a-z]+)$/);

            if (typeof extensionMatch[1] !== 'undefined') {
                const extension = extensionMatch[1];
                // eslint-disable-next-line max-len
                const loader = this.loaders.find((_loader) => _loader.extensions.find((_extension) => _extension === extension));

                if (loader) {
                    loader.action(_resource);
                } else {
                    console.warn(`Cannot found loader for ${_resource}`);
                }
            } else {
                console.warn(`Cannot found extension of ${_resource}`);
            }
        });
    }
}
