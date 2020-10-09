'use strict';

/**
 * EducationIndexPage class
 */
const EducationIndexPage = function () { }
module.exports = EducationIndexPage;


/**
 * Boot method
 */
EducationIndexPage.boot = function () {
    EducationIndexPage.initVue();
}

/**
 * Init vue
 */
EducationIndexPage.initVue = function () {
    const Educations = require('VUE-COMPONENTS/education/educations.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Educations
            },
        });
}

/* Boot */
EducationIndexPage.boot();

