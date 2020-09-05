<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ programData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نام برنامه:
                            .info-card-value {{ programData.title }}
                        .info-card-item
                            .info-card-label برنامه:
                            .info-card-value {{ programData.program_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowProgram",

    data: () => ({
        ENUMS,
        programs: [],
        programData: {
            _id: null,
            title: null,
            program_id: null,
            target: null,
            same_effects_index: null,
            organ_moderator: null,
            program_moderator: null,
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
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        programsUrl: {
            type: String,
            default: "",
        },
    },
    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific program
         */
        loadProgramData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                program_id: data.program_id,
                target: data.target,
                same_effects_index: data.same_effects_index,
                organ_moderator: data.organ_moderator,
                program_moderator: data.program_moderator,
                consoultant: data.consoultant,
                supervisor: data.supervisor,
                committee_leadership: data.committee_leadership,
                coworker: data.coworker,
                description: data.description,
                intervention_review: data.intervention_review,
                pervious_action_relation: data.pervious_action_relation,
                target_corresponding: data.target_corresponding,
                help_ipmrove_index: data.help_ipmrove_index,
                final_product: data.final_product,
                standards: data.standards,
                other_benefit: data.other_benefit,
                result_apply: data.result_apply,
                refree: data.refree,
                monitoring_comment: data.monitoring_comment,
                files: {},
                is_active: data.is_active,
            };
            console.log(temp);
            Vue.set(this, "programData", temp);
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
    },
};
</script>
