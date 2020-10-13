"use strict";
/**
 * DashboardIndexPage class
 */
const DashboardIndexPage = function() {};
module.exports = DashboardIndexPage;

/**
 * Boot method
 */
DashboardIndexPage.boot = function() {
    DashboardIndexPage.initVue();
};

/**
 * Init vue
 */
DashboardIndexPage.initVue = function() {
    const Dashboard = require("VUE-COMPONENTS/dashboard/dashboard.vue")
        .default;

    window.v = new Vue({
        el: "#app",

        components: {
            Dashboard,
        },

        data: {},

    });
};

/* Boot */
DashboardIndexPage.boot();
