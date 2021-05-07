<h1 align="center">ThreeJS Starter</h1>

<h3 align="center">
A three.js starter based on object-oriented programming.
<h3/>

<p align="center">
    <img src="./static/cover.png" width="600px"/>
</p>

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Event Emitter](#event-emitter)
- [Control](#control)
- [Add Material](#add-material)
- [Create Mesh](#create-mesh)
- [Load Model](#load-model)
- [Customized Shader](#customized-shader)
- [GSAP Animation](#load-model)
- [Debug Mode](#debug-mode)
- [Notes](#Notes)

## Introduction

## Getting Started
Type the following steps into the terminal.

```bash
git clone https://github.com/TomHsiao1260/three-starter.git

cd three-starter

npm install
```

Then start the dev server and navigate to http://localhost:8080

```bash
npm run dev
```

## Event Emitter

## Control

## Add Material

To create a material with external resources (ex: matcap), you can do the following steps. First, import the resources and put them into an array of objects.

```javascript
// src/javascript/Resources.js

import matcapGoldSource from '../models/matcaps/gold.png';

this.loader.load([
    { name: 'matcapGold', source: matcapGoldSource },
    ...
]);

```

Then create the material.

```javascript
// src/javascript/World/Materials.js

const { matcapGold } = this.resources.items;

this.items.matcap.gold = new THREE.MeshMatcapMaterial({ matcap: matcapGold });
```

Now, we can create the mesh using this material.

```javascript
// src/javascript/World/Torus.js

const material = this.material.items.matcap.gold;
const mesh = new THREE.Mesh(geometry, material);
```

## Create Mesh

Let's create a `THREE.Mesh` (ex: Torus) and add it to the scene. First, create a Torus class which can generate the `THREE.mesh` through the contructor.

```javascript
// src/javascript/World/Torus.js

const geometry = new THREE.TorusGeometry(0.25, 0.08, 32, 100);
const material = this.material.items.matcap.gold;
const mesh = new THREE.Mesh(geometry, material);

this.container.add(mesh);
```

Then create an instance of this class. Note that the mesh would be added to the scene graph via the connection of `container` property, which is an `THREE.Object3D`.

```javascript
// src/javascript/World/index.js

import Torus from './Torus';

start() {
    ...
    this.setTorus();
}

setTorus() {
    this.torus = new Torus({
        material: this.material,
    });
    this.container.add(this.torus.container);
}
```

## Load Model

The following steps can load some external models (ex: `.glb`, `.fbx`, etc.). First, we need to import our model file.

```javascript
// src/javascript/Resources.js

import foxSource from '../models/fox/glTF-Binary/Fox.glb';

this.loader.load([
    { name: 'fox', source: foxSource },
    ...
]);
```

Then create a class and add the loaded model to the `container` property.

```javascript
// src/javascript/World/Fox.js

const gltf = this.resources.items.fox;
this.container.add(gltf.scene);
```

Now we can create an instance of this class (just like [Create Mesh](#create-mesh)).

```javascript
// src/javascript/World/index.js

import Fox from './Fox';

start() {
    ...
    this.setFox();
}

setFox() {
    this.fox = new Fox({
        resources: this.resources,
    });
    this.container.add(this.fox.container);
}
```

For simplicity, this starter only support `.glb`, `.gltf` and `.fbx` extensions. Draco compression would automatically support for models with `.glb` extension. If you want to load models with other extensions, you can check out `src/javascript/Utils/Loader.js` and write some custom model loaders.

## Customized Shader

You can create some customized shader materials as follows.

```javascript
// src/javascript/Materials/Plane.js

import vertexShader from '../../shaders/plane/vertex.glsl';
import fragmentShader from '../../shaders/plane/fragment.glsl';

export default function PlaneMaterial() {
    const uniforms = {
        uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
    });

    return material;
}
```

Then create an instance object of this material.

```javascript
// src/javascript/World/Materials.js

import PlaneMaterial from '../Materials/Plane';

...

this.items.shader.plane = new PlaneMaterial();
```

Now, we can use this shader material to create a plane mesh (just like [Create Mesh](#create-mesh)).

```javascript
// src/javascript/World/Plane.js

const geometry = new THREE.PlaneGeometry(1.2, 0.7, 50, 50);
const material = this.material.items.shader.plane;
const mesh = new THREE.Mesh(geometry, material);
```

## GSAP Animation

## Debug Mode

## Notes