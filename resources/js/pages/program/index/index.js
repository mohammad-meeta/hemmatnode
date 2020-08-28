'use strict';

/**
 * ProgramIndexPage class
 */
const ProgramIndexPage = function () { }
module.exports = ProgramIndexPage;


/**
 * Boot method
 */
ProgramIndexPage.boot = function () {
    ProgramIndexPage.initVue();
}

/**
 * Init vue
 */
ProgramIndexPage.initVue = function () {
    const Programs = require('VUE-COMPONENTS/program/programs.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Programs
            },
        });
}

/* Boot */
ProgramIndexPage.boot();

