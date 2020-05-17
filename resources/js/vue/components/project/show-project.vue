<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ projectData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نام پروژه:
                            .info-card-value {{ projectData.title }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowProject",

    data: () => ({
        ENUMS,
        projectData: {
            _id: null,
            title: null,
            program_id: null,
            target: null,
            same_effects_index: null,
            organ_moderator: null,
            project_moderator: null,
            consoultant: null,
            supervisor: null,
            committee_leadership: null,
            coworker: null,
            description: null,
            intervention_review: null,
            pervious_action_relation: null,
            target_corresponding: null,
            help_ipmrove_index: null,
            final_product: null,
            standards: null,
            other_benefit: null,
            result_apply: null,
            refree: null,
            monitoring_comment: null,
            files: {},
            isActive: false
        },
        showLoadingFlag: false
    }),

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific project
         */
        loadProjectData(data) {
            const temp = {
                _id: data._id,
                name: data.name,
                password: data.password,
                email: data.email,
                firstName: data.profile.first_name,
                lastName: data.profile.last_name,
                nationCode: data.profile.nation_code,
                cellphone: data.cellphone,
                roles: data.roles,
                isActive: data.is_active
            };
            console.log(temp);
            Vue.set(this, "projectData", temp);
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, "showLoadingFlag", true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, "showLoadingFlag", false);
        },

    }
};
</script>
