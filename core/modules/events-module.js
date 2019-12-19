'use strict';

/**
 * Event module
 */
function EventsModule() {}
module.exports = EventsModule;

/* Variables */
EventsModule.events = [];

/**
 * Setup function
 */
EventsModule.setup = function setup(server) {
    EventsModule.loadHandlers();

    return server;
};

/**
 * Load handlers files
 */
EventsModule.loadHandlers = function loadHandlers() {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        const baseFolder = rPath('app/handlers');

        let files = fs.readdirSync(baseFolder) || [];


        files.forEach(file => {
            const name = file.replace(/\-handler/i, '')
                .replace(/\.js/i, '');

            EventsModule.define(name, file);
        });
    });
};

/**
 * Define a new event
 */
EventsModule.define = function define(name, callbacks) {
    return new Promise((resolve, reject) => {
        name = EventsModule.fixName(name);

        if (!Array.isArray(callbacks)){
            callbacks = [callbacks];
        }
        EventsModule.events[name] = callbacks;

        resolve();
    })
};

/**
 * Remove an exsiting event
 */
EventsModule.remove = function remove(name) {
    return new Promise((resolve, reject) => {
        name = EventsModule.fixName(name);

        let index = EventsModule.events.findIndex(name);

        if (index > -1) {
            delete EventsModule.events[name];
            EventsModule.events.splice(index, 1);
        }

        resolve();
    });
};

/**
 * Raise an event
 */
EventsModule.raise = function raise(name, payload) {
    return new Promise((resolve, reject) => {
        name = EventsModule.fixName(name);

        const callbacks = EventsModule.events[name] || [];

        callbacks.forEach(callback => EventsModule.runEventCallback(callback, payload));

        resolve();
    });
};

/**
 * Run event-callback
 */
EventsModule.runEventCallback = function runEventCallback(callback, data) {
    return new Promise((resolve, reject) => {
        const callbackType = typeof callback;

        if (callbackType == 'string') {
            const filePath = rPath('app/handlers/', callback);
            const Controller = use(filePath);

            Controller['run'](data);
        } else if (callbackType == 'function') {
            callback()
        }

        resolve();
    });
}

/**
 * Fix the listener name
 */
EventsModule.fixName = function fixName(name) {
    const hasPostfix = name.toLowerCase()
        .endsWith('-handler');

    return (hasPostfix ? name : name + '-handler');
};