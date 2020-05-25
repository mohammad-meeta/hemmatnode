'use strict';

/**
 * DepartmentShowPage class
 */
const DepartmentShowPage = function () {}
module.exports = DepartmentShowPage;


/**
 * Boot method
 */
DepartmentShowPage.boot = function () {
    DepartmentShowPage.initVue();
}

/**
 * Init vue
 */
DepartmentShowPage.initVue = function () {
    const ShowDepartment = require('VUE-COMPONENTS/department/show-department.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                ShowDepartment
            },

            mounted() {
                this.loadDepartment();
            },

            methods: {
                /**
                 * Load department data
                 */
                loadDepartment() {
                    this.$refs.departmentShow.loadDepartmentData();
                }
            }
        });
}

/* Boot */
DepartmentShowPage.boot();
