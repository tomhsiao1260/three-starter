export default class EventEmiter {
    callbacks: {
        [key: string]: any
    };
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    // input : this.on('xx/yy/zz.alpha', callback)
    // result: this.callbacks['base'] = {'xx':[..., callback], 'yy':[..., callback]}
    //         this.callbacks['alpha'] = {'zz':[..., callback]}
    on(_names: string, _callback: Function, _unsubscribe?: Function) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }
        if (typeof _callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }

        const names = EventEmiter.resolveNames(_names);

        names.forEach((_name) => {
            const name = EventEmiter.resolveName(_name);

            if (!(this.callbacks[name.namespace] instanceof Object)) {
                this.callbacks[name.namespace] = {};
            }

            if (!(this.callbacks[name.namespace][name.value] instanceof Array)) {
                this.callbacks[name.namespace][name.value] = [];
            }

            this.callbacks[name.namespace][name.value].push(_callback);
        });

        return { _names, _callback, _unsubscribe };
    }

    // input : this.trigger('xx', [5,3])
    // result: this.callbacks['base']['xx'] -> [c1, c2, ...]
    //         execute c1(5,3), c2(5,3)
    trigger(_name: string, _args?: any[]) {
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('wrong name');
            return false;
        }

        let finalResult: null | undefined = null;
        let result = null;

        // Default args []
        const args = !(_args instanceof Array) ? [] : _args;

        const names = EventEmiter.resolveNames(_name);
        const name = EventEmiter.resolveName(names[0]);
        const { namespace, value } = name;

        if (namespace === 'base') {
            const callbacks = this.callbacks[namespace];
            const callback = this.callbacks[namespace][value];

            if (callbacks instanceof Object && callback instanceof Array) {
                callback.forEach((callback) => {
                    // execute callback
                    result = callback.apply(this, args);

                    if (typeof finalResult === 'undefined') { finalResult = result; }
                });
            }
        } else if (this.callbacks[namespace] instanceof Object) {
            if (value === '') {
                console.warn('wrong name');
                return this;
            }

            this.callbacks[namespace][value].forEach((callback: Function) => {
                // execute callback
                result = callback.apply(this, args);

                if (typeof finalResult === 'undefined') { finalResult = result; }
            });
        }

        return finalResult;
    }

    // ex: this.remove({_names: 'xx', _callback: ...})
    // ex: this.remove({_names: 'xx/yy/zz.alpha', _callback: ...})
    remove(_target: { _names: string, _callback: Function, _unsubscribe?: Function }) {
        const { _names, _callback, _unsubscribe } = _target;

        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }
        if (typeof _callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }

        const names = EventEmiter.resolveNames(_names);

        names.forEach((_name) => {
            const name = EventEmiter.resolveName(_name);
            const { namespace, value } = name;

            if (!(this.callbacks[namespace] instanceof Object)) return;
            if (!(this.callbacks[namespace][value] instanceof Array)) return;

            // remove the callback
            this.callbacks[namespace][value] = this.callbacks[namespace][value].filter((callback: Function) => callback !== _callback);
            // execute unsubsrcibe function
            if (_unsubscribe instanceof Function) _unsubscribe();

            if (!this.callbacks[namespace][value].length) {
                delete this.callbacks[namespace][value];
            }
        });

        return this;
    }

    // ex: 'xx/yy/zz' -> ['xx', 'yy', 'zz']
    static resolveNames(_names: string) {
        let names = _names;
        let names_step_1 = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
        let names_step_2 = names_step_1.replace(/[,/]+/g, ' ');
        let names_step_3 = names_step_2.split(' ');

        return names_step_3;
    }

    // ex: 'xx'    -> {original:    'xx', value: 'xx', namespace: 'base'}
    // ex: 'xx.yy' -> {original: 'xx.yy', value: 'xx', namespace:   'yy'}
    static resolveName(name: string): { original: string, value: string, namespace: string } {
        const newName: any = {};
        const [value, namespace] = name.split('.');

        newName.original = name;
        newName.value = value;
        newName.namespace = 'base';

        if (namespace) { newName.namespace = namespace; }

        return newName;
    }
}
