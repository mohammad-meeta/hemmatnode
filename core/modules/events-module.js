'use strict';

const DirectoryHelper = use('./core/helpers/directory-helper');

/**
 * Event module
 */
function EventsModule() {}
module.exports = EventsModule;

/* Variables */
EventsModule.events = [];
EventsModule.MODULE_SEPARATOR = '.';

/**
 * Setup function
 */
EventsModule.setup = function setup(server) {
    EventsModule.initHandlers();

    return server;
};

/**
 * Load handlers files
 */
EventsModule.initHandlers = function initHandlers() {
    return new Promise(async (resolve, reject) => {
        const fs = require('fs');
        const {
            sep
        } = require('path');
        const baseFolder = rPath('app/handlers/');

        const filesCallback = (file) => {
            const name = file.replace(/\-handler/i, '')
                .replace(/\.js/i, '')
                .replace(baseFolder, '')
                .replace(new RegExp(sep, 'g'), EventsModule.MODULE_SEPARATOR)
                .replace(/^\.*/i, '');

            EventsModule.define(name, file);
        };

        if (fs.existsSync(baseFolder)) {
            await DirectoryHelper.getDirectories(baseFolder, '**/**/*.js', filesCallback);
        }
    });
};

/**
 * Define a new event
 */
EventsModule.define = function define(name, callbacks) {
    return new Promise((resolve, reject) => {
        name = EventsModule.fixName(name);

        if (!Array.isArray(callbacks)) {
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
};

/**
 * Fix the listener name
 */
EventsModule.fixName = function fixName(name) {
    const hasPostfix = name.toLowerCase()
        .endsWith('-handler');

    return (hasPostfix ? name : name + '-handler');
};
