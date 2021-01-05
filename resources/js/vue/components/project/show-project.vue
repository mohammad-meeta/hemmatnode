<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .print-form
                    .print-form-head
                        table.table.is-fullwidth.is-bordered
                            tbody
                                tr
                                    td.is-vcentered(rowspan="11") مشخصات پروژه
                                tr
                                    td
                                        label
                                            | نام پروژه:
                                        | {{ projectData.title }}
                                tr
                                    td
                                        label
                                            | نام برنامه متناظر:
                                        | {{ projectData.programTitle }}
                                tr
                                    td
                                        label
                                            | هدف برنامه:
                                        | {{ projectData.target }}
                                tr
                                    td
                                        label
                                            | شاخص های اثرمتناظر:
                                        | {{ projectData.same_effects_index }}
                                tr
                                    td
                                        label
                                            | مجری سازمانی:
                                        | {{ projectData.organ_moderator }}
                                tr
                                    td
                                        label
                                            | مجری پروژه - پیمانکار:
                                        | {{ projectData.project_moderator }}
                                tr
                                    td
                                        label
                                            | مشاورین:
                                        | {{ projectData.consoultant }}
                                tr
                                    td
                                        label
                                            | ناظر پروژه:
                                        | {{ projectData.supervisor }}
                                tr
                                    td
                                        label
                                            | کمیته راهبردی طرح:
                                        | {{ projectData.committee_leadership }}
                                tr
                                    td
                                        label
                                            | همکاران اصلی پروژه:
                                        | {{ projectData.coworker }}
                                tr
                                    td.is-vcentered(rowspan="7") بیان ضرورت
                                tr
                                    td
                                        label
                                            | تعریف مسئله -نیاز اصلی:
                                        | {{ projectData.description }}
                                tr
                                    td
                                        label
                                            | مروری برمداخلات و خدمات بهبوددهنده وضعیت درتجربیات جهانی و ملی:
                                        | {{ projectData.intervention_review }}
                                tr
                                    td
                                        label
                                            | ارتباط پروژه با اقدامات قبلی سازمان یا سازمان های دیگر در پرداختن به این مسئله-تکمیل کننده،نقض کننده،جدید بودن:
                                        | {{ projectData.pervious_action_relation }}
                                tr
                                    td
                                        label
                                            | تناظر با اهداف راهبردی و اسناد بالادستی سازمان؟
                                        | {{ projectData.target_corresponding }}
                                tr
                                    td
                                        label
                                            | به ارتقای کدام شاخص اثر کمک می کند؟:
                                        | {{ projectData.help_ipmrove_index }}
                                tr
                                    td
                                        label
                                            | سایر فواید پروژه درحیطه:
                                        | {{ projectData.other_benefit }}
                                tr
                                    td.is-vcentered(rowspan="2") برآمدهای پروژه

                                tr
                                    td
                                        table.table.is-fullwidth.is-bordered
                                            thead
                                                tr
                                                    th عنوان
                                                    th استاندارد
                                                    th هزینه (میلیون ریال)
                                                    th مهلت
                                            tbody
                                                tr(v-for="result in projectData.results")
                                                    td
                                                        | {{ result.result }}
                                                    td
                                                        | {{ result.standard }}
                                                    td
                                                        | {{ result.cast }}
                                                    td
                                                        | {{ toPersianDate(result.deadline) }}
                                tr
                                    td
                                        | هدف کلی (محصول پروژه)
                                    td
                                        | {{ projectData.final_product }}
                                tr
                                    td
                                        |  نحوه کاربست محصول پروژه
                                        td
                                            | {{ projectData.result_apply }}

</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowProject",

    data: () => ({
        ENUMS,
        programs: [],
        projectData: {
            _id: null,
            title: null,
            program_id: null,
            programTitle: null,
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
            results: {},
            final_product: null,
            standards: null,
            other_benefit: null,
            result_apply: null,
            refree: null,
            monitoring_comment: null,
            files: {},
            is_active: false
        },
        showLoadingFlag: false
    }),
    props: {
        programsUrl: {
            type: String,
            default: ""
        }
    },
    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific project
         */
        loadProjectData(data) {
            console.log(data);
            const temp = {
                _id: data._id,
            title: data.title,
            program_id: data.program_id,
            programTitle: data.prg.title,
            target: data.target,
            same_effects_index: data.same_effects_index,
            organ_moderator: data.organ_moderator,
            project_moderator: data.project_moderator,
            consoultant: data.consoultant,
            supervisor: data.supervisor,
            committee_leadership: data.committee_leadership,
            coworker: data.coworker,
            description: data.description,
            intervention_review: data.intervention_review,
            pervious_action_relation: data.pervious_action_relation,
            target_corresponding: data.target_corresponding,
            help_ipmrove_index: data.help_ipmrove_index,
            results: data.results,
            final_product: data.final_product,
            standards: data.standards,
            other_benefit: data.other_benefit,
            result_apply: data.result_apply,
            refree: data.refree,
            monitoring_comment: data.monitoring_comment,
            files: {},
                is_active: data.is_active
            };
            Vue.set(this, "projectData", temp);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateShort(date);
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
