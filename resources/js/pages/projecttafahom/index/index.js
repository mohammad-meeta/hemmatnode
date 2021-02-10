'use strict';
/**
 * ProjectTafahomIndexPage class
 */
const ProjectTafahomIndexPage = function () { }
module.exports = ProjectTafahomIndexPage;


/**
 * Boot method
 */
ProjectTafahomIndexPage.boot = function () {
    ProjectTafahomIndexPage.initVue();
}

/**
 * Init vue
 */
ProjectTafahomIndexPage.initVue = function () {
    const ProjectTafahoms = require('VUE-COMPONENTS/projecttafahom/projecttafahoms.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                ProjectTafahoms
            },
        });
}

/* Boot */
ProjectTafahomIndexPage.boot();

