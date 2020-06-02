'use strict';

/**
 * EventListIndexPage class
 */
const EventListIndexPage = function () {}
module.exports = EventListIndexPage;


/**
 * Boot method
 */
EventListIndexPage.boot = function () {
    EventListIndexPage.initVue();
}

/**
 * Init vue
 */
EventListIndexPage.initVue = function () {
    const EventLists = require('VUE-COMPONENTS/event-list/event-lists.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                EventLists
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadEventLists();
                },

                loadEventLists() {
                    //this.$refs.EventListCategories.loadEventLists();
                }
            }
        });
}

/* Boot */
EventListIndexPage.boot();
