import './style/main.scss'
import Application from './javascript/Application.js'

window.application = new Application({
    $canvas: document.querySelector('.js-canvas'),
    useComposer: true
})

