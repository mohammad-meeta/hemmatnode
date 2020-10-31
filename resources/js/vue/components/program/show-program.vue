<template lang="pug">
    .container
        .columns.is-vcentered(v-show="isLoadingMode")
                h1 در حال بارگذاری
        .columns.is-vcentered.is-multiline(v-show="! isLoadingMode")
            .column.is-full
                .info-card
                    .info-card-title {{ programData.title }}
            .column.is-full
                .info-card
                    .info-card-item
                        file-download(ref="fileDownload", :old-files="oldFiles")
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;

export default {
    name: "ShowProgram",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        programs: [],
        oldFiles: [],
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
            Vue.set(this, "programData", temp);
            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileDownload.updateOldFiles(this.oldFiles);
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
