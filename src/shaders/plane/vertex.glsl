#define PI 3.1415926535897932384626433832795

uniform float uTime;
varying vec2 vUv;

void main()
{
    vec3 newPosition = position;
    newPosition.z += sin(newPosition.x * 5.0 - uTime) * 0.05;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}