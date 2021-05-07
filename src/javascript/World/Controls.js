import * as THREE from 'three';

export default class Controls {
    constructor(_option) {
        this.time = _option.time;
        this.sizes = _option.sizes;
        this.camera = _option.camera;

        this.setMouse();
    }

    setMouse() {
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        // triggered when the mouse moves
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1;
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
        });

        // after clicking the mouse
        window.addEventListener('pointerdown', () => {
            this.time.trigger('mouseDown');
        });
        // can't use 'mousedown' event because of the OrbitControls library

        // after releasing the mouse button
        window.addEventListener('click', () => {
            this.time.trigger('mouseUp');
        });

        // touch move on mobile
        window.addEventListener('touchmove', (event) => {
            this.mouse.x = event.touches[0].clientX / this.sizes.width * 2 - 1;
            this.mouse.y = -(event.touches[0].clientY / this.sizes.height) * 2 + 1;
        });

        // touch start on mobile
        window.addEventListener('touchstart', () => {
            this.time.trigger('mouseDown');
        });

        // touch end on mobile
        window.addEventListener('touchend', () => {
            this.time.trigger('mouseUp');
        });

        // set up the Raycaster based on mouse events
        this.time.on('tick', () => {
            this.raycaster.setFromCamera(this.mouse, this.camera.instance);
        });
    }
}
