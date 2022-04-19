import './style/main.css';
import Application from './javascript/Application.js';

(window as any).application = new Application({
    $canvas: document.querySelector('.js-canvas') as HTMLCanvasElement,
});
