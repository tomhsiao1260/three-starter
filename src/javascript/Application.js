import * as THREE from 'three'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'

export default class Application
{
    constructor(_options)
    {
        // Options
        this.$canvas = _options.$canvas

        this.time = new Time()
        this.sizes = new Sizes()

        this.setRenderer()
    }

    /**
    * Set renderer
    */
    setRenderer()
    {
        // Scene
        this.scene = new THREE.Scene()

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas,
            alpha: true
        })
        // this.renderer.setClearColor(0x414141, 1)
        this.renderer.setClearColor(0x000000, 1)
        // this.renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2))
        this.renderer.setPixelRatio(2)
        this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
        this.renderer.physicallyCorrectLights = true
        this.renderer.gammaOutPut = true
        this.renderer.autoClear = false

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
        })
    }
}