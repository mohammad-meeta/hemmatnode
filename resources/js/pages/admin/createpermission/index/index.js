'use strict';

/**
 * CreatePermission class
 */
const CreatePermission = function () { }
module.exports = CreatePermission;


/**
 * Boot method
 */
CreatePermission.boot = function () {
    CreatePermission.initVue();
}

/**
 * Init vue
 */
CreatePermission.initVue = function () {
    const Createpermissions = require('VUE-COMPONENTS/admin/createpermission/createpermissions.vue').default;
    
    window.v =
        new Vue({
            el: '#app',

            components: {
                Createpermissions
            },
        });
}

/* Boot */
CreatePermission.boot();

