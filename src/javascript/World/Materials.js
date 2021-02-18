import * as THREE from 'three';

import PlaneMaterial from '../Materials/Plane';

export default class Materials {
    constructor(_option) {
        this.resources = _option.resources;
        this.items = {};

        this.setMaterials();
    }

    setMaterials() {
        const { matcapRed, matcapGold } = this.resources.items;

        this.items.matcap = {};
        this.items.matcap.red = new THREE.MeshMatcapMaterial({ matcap: matcapRed });
        this.items.matcap.gold = new THREE.MeshMatcapMaterial({ matcap: matcapGold });

        this.items.shader = {};
        this.items.shader.plane = new PlaneMaterial();
    }
}
