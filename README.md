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
- [Create Mesh](#create-mesh)
- [Add Material](#add-material)
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
To create a material with external resources (ex: matcap), you can do the following steps.

First, import the resources and put them into an array of objects.

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

Let's create a `THREE.Mesh` (ex: Torus) and add it to the scene.

First, create a Torus class which can generate the `THREE.mesh` through the contructor.

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

## Customized Shader

## GSAP Animation

## Debug Mode

## Notes