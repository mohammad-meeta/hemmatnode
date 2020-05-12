'use strict';

/**
 * ProjectIndexPage class
 */
const ProjectIndexPage = function () {}
module.exports = ProjectIndexPage;


/**
 * Boot method
 */
ProjectIndexPage.boot = function () {
    ProjectIndexPage.initVue();
}

/**
 * Init vue
 */
ProjectIndexPage.initVue = function () {
    const Projects = require('VUE-COMPONENTS/project/projects.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Projects
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadProjects();
                },

                loadProjects() {
                    //this.$refs.projectCategories.loadProjects();
                }
            }
        });
}

 /* Boot */
ProjectIndexPage.boot();

