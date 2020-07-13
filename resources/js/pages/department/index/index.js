'use strict';

/**
 * DepartmentIndexPage class
 */
const DepartmentIndexPage = function () {}
module.exports = DepartmentIndexPage;

/**
 * Boot method
 */
DepartmentIndexPage.boot = function () {
    DepartmentIndexPage.initVue();
}

/**
 * Init vue
 */
DepartmentIndexPage.initVue = function () {
    const Departments = require('VUE-COMPONENTS/department/departments.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Departments
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadDepartments();
                },

                loadDepartments() {
                    //this.$refs.departmentCategories.loadDepartments();
                }
            }
        });
}

 /* Boot */
DepartmentIndexPage.boot();

