'use strict';

/**
 * PeopleParticipationIndexPage class
 */
const PeopleParticipationIndexPage = function () {}
module.exports = PeopleParticipationIndexPage;


/**
 * Boot method
 */
PeopleParticipationIndexPage.boot = function () {
    PeopleParticipationIndexPage.initVue();
}

/**
 * Init vue
 */
PeopleParticipationIndexPage.initVue = function () {
    const PeopleParticipations = require('VUE-COMPONENTS/people-participation/people-participations.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                PeopleParticipations
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadPeopleParticipations();
                },

                loadPeopleParticipations() {
                    //this.$refs.PeopleParticipationCategories.loadPeopleParticipations();
                }
            }
        });
}

/* Boot */
PeopleParticipationIndexPage.boot();
