export default class EventEmiter {
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    // input : this.on('xx/yy/zz.alpha', callback)
    // result: this.callbacks['base'] = {'xx':[..., callback], 'yy':[..., callback]}
    //         this.callbacks['alpha'] = {'zz':[..., callback]}
    on(_names, callback) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }

        if (typeof callback === 'undefined') {
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

            this.callbacks[name.namespace][name.value].push(callback);
        });

        return this;
    }

    // input : this.trigger('xx', [5,3])
    // result: this.callbacks['base']['xx'] -> [c1, c2, ...]
    //         execute c1(5,3), c2(5,3)
    trigger(_name, _args) {
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('wrong name');
        }

        let finalResult = null;
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

            this.callbacks[namespace][value].forEach((callback) => {
                // execute callback
                result = callback.apply(this, args);

                if (typeof finalResult === 'undefined') { finalResult = result; }
            });
        }

        return finalResult;
    }

    // ex: 'xx/yy/zz' -> ['xx', 'yy', 'zz']
    static resolveNames(_names) {
        let names = _names;
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
        names = names.replace(/[,/]+/g, ' ');
        names = names.split(' ');

        return names;
    }

    // ex: 'xx'    -> {original:    'xx', value: 'xx', namespace: 'base'}
    // ex: 'xx.yy' -> {original: 'xx.yy', value: 'xx', namespace:   'yy'}
    static resolveName(name) {
        const newName = {};
        const [value, namespace] = name.split('.');

        newName.original = name;
        newName.value = value;
        newName.namespace = 'base';

        if (namespace) { newName.namespace = namespace; }

        return newName;
    }
}
