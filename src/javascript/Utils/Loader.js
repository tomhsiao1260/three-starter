import * as THREE from 'three';

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
