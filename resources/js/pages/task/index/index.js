'use strict';

/**
 * TaskIndexPage class
 */
const TaskIndexPage = function () {}
module.exports = TaskIndexPage;


/**
 * Boot method
 */
TaskIndexPage.boot = function () {
    TaskIndexPage.initVue();
}

/**
 * Init vue
 */
TaskIndexPage.initVue = function () {
    const Tasks = require('VUE-COMPONENTS/task/tasks.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Tasks
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadTasks();
                },

                loadTasks() {
                    //this.$refs.taskCategories.loadTasks();
                }
            }
        });
}

 /* Boot */
TaskIndexPage.boot();

