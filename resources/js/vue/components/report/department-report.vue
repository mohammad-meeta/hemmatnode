<template lang="pug">
.container-child
    .container.page-header
        .title(v-show="! modeShow")
            h1 کارنامه
        .title(v-if="modeShow")
            h1 {{ title }}
        .hero-dashboard
            .field.is-grouped

    h1(v-if="!hasReport") هیچ کارنامه ای ایجاد نشده
    .container.main-content(v-show="! modeShow")
        .intro-cards.columns
            .intro-card.column.is-12
                .buttons
                        b-button(
                            type="is-info is-light"
                            v-for="item in groupdDataItems"
                            :key="item"
                            @click.prevent="showGroupData(item)"
                        )
                            | {{ item }}
                .chart.container
                    SimpleLineChart(
                        :Chartdata="chartValue"
                        :Chartlabel="chartLabel"
                        Label="امتیاز"
                        YScaleLabel="معیار"
                        XScaleLabel="امتیاز"
                        :height=400
                    )

</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const ENUMS = require("JS-HELPERS/enums");
const Routes = require("JS-CORE/routes");
const ShowReport = require("VUE-COMPONENTS/report/show-report.vue").default;
const SimpleLineChart = require("VUE-COMPONENTS/charts/line-chart-simple.vue")
    .default;

export default {
    name: "DepartmentReport",

    components: {
        ShowReport,
        SimpleLineChart,
    },
    props: {
        ReportListUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        reports: [],
        filteredData: [],
        chartValue: [],
        chartLabel: []
    }),

    /**
     * Created
     */
    created() {
        //this.changeFormMode(this.ENUMS.FORM_MODE.DOCUMENT);
    },

    computed: {
        hasReport: (state) => (state.reports || []).length,
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        modeReport: (state) => state.formMode == ENUMS.FORM_MODE.DOCUMENT,
        modeDepartment: (state) => state.formMode == ENUMS.FORM_MODE.DEPARTMENT,
        showNotification: (state) => state.notificationMessage != null,

        groupdData: (state) =>
            _.groupBy(state.reports || [], (x) => x.year) || {},
        groupdDataItems: (state) => Object.keys(state.groupdData),
    },

    methods: {
        /**
         * Filter group data
         */
        showGroupData(item) {
            Vue.set(this, "filteredData", this.groupdData[item] || []);
            const chartValues = this.groupdData[item].map(x => x.value);
            const chartLabel = this.groupdData[item].map(x => x.kindex.title);
            Vue.set(this, "chartValue", chartValues);
            Vue.set(this, "chartLabel", chartLabel);
        },

        /**
         * Load reports
         */
        loadReports(pageId) {
            let url = this.ReportListUrl.replace(/\$page\$/g, pageId).replace(
                /\$pageSize\$/g,
                1000
            );
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "reports", resData.data.data);
            });

        },

        /**
         * On commands clicked
         */
        onCommand(argument, payload) {
            let arg = argument || null;
            const data = payload || {};
            if (null == arg) {
                arg = 1;
            }
            switch (arg) {
                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;
                case ENUMS.COMMAND.SHOW:
                    this.$refs.reportShow.loadReportData(data);
                    Vue.set(this, "title", payload.title);
                    this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                    break;
            }
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg, data) {
            //this.$emit("onCommand",{arg, data});
            this.$emit("on-command", { arg, data });
        },

        /**
         * Change form mode
         */
        changeFormMode(mode, options) {
            console.log(mode);
            const opts = Object.assign(
                {
                    pop: false,
                },
                options
            );

            if (opts.pop) {
                if (this.formModeStack.length > 0) {
                    Vue.delete(
                        this.formModeStack,
                        this.formModeStack.length - 1
                    );
                }
            } else {
                Vue.set(this.formModeStack, this.formModeStack.length, mode);
            }
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateShort(date);
        },
    },
};
</script>
