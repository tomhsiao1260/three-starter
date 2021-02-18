import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter {
    constructor() {
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.tick = this.tick.bind(this);
        this.tick();
    }

    tick() {
        this.ticker = window.requestAnimationFrame(this.tick);

        const current = Date.now();

        this.delta = current - this.current;
        this.elapsed = this.current - this.start;
        this.current = current;

        if (this.delta > 60) {
            this.delta = 60;
        }

        this.trigger('tick');
    }

    stop() {
        window.cancelAnimationFrame(this.ticker);
    }
}
