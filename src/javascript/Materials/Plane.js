import * as THREE from 'three';

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
