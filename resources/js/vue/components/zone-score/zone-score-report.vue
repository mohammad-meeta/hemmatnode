<template lang="pug">
.container-parent
    section.hero
        notification(
            :notification-type="notificationType",
            @on-close="closeNotification",
            v-if="showNotification"
        )
            span(v-html="notificationMessage")
        .container.page-header
            .title
                h1 کارنامه
    .container.exposed-filters.mb-3
        b-field(grouped)
            b-field(label="سال")
                b-select(placeholder="انتخاب سال", v-model="selectedYear")
                    option(v-for="year in years", :value="year", :key="year")
                        | {{ year }}

            b-field(grouped, label="گروه")
                b-field
                    .control
                        .select.is-primary
                            select(
                                v-model="department_category_id",
                                @change="onChange($event.target.value)"
                            )
                                option(
                                    v-for="(departmentCategory, departmentCategoryIndex) in departmentCategories",
                                    :value="departmentCategory._id"
                                ) {{ departmentCategory.title }}
                b-field
                    .control
                        .select.is-primary
                            select(v-model="references")
                                option(
                                    v-for="(department, departmentIndex) in departments",
                                    :value="department._id"
                                ) {{ department.title }}
                b-field.mr-2
                    .control
                        b-button(
                            type="is-primary",
                            @click="loadData",
                            rounded,
                            label="اجرا"
                        )
    .columns.is-multiline
        .column.is-12
            b-table(:data="results", expanded)
                b-table-column(label="نام", v-slot="props")
                    | {{ props.row.depName }}
                b-table-column(:label="label1", v-slot="props")
                    | {{ props.row.data[label1].toFixed(2) }}
                b-table-column(:label="label2", v-slot="props")
                    | {{ props.row.data[label2].toFixed(2) }}
                b-table-column(:label="label3", v-slot="props")
                    | {{ props.row.data[label3].toFixed(2) }}
                b-table-column(label="فعالیت ها بستر سازی", v-slot="props")
                    | {{ props.row.data[label4].toFixed(2) }}
                b-table-column(label="نمره سال", v-slot="props")
                    | {{ props.row.data.sum.toFixed(2) }}

        .column.is-12
            .chart.container
                //- multi-line-chart(
                //-     ref="chart",
                //-     :labels="labels",
                //-     :datasets="datasets",
                //-     v-if="showChartFlag"
                //- )
                bar-chart(
                    ref="chart",
                    :labels="labels",
                    :datasets="datasets",
                    v-if="showChartFlag"
                )
</template>

<script>
import Vue from "vue";
("use strict");

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const MultiLineChart =
    require("VUE-COMPONENTS/charts/line-chart-multi-section.vue").default;
const BarChart = require("VUE-COMPONENTS/charts/bar-chart.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ZoneScoreReport",

    components: {
        Loading,
        Notification,
        MultiLineChart,
        BarChart,
    },

    data: () => ({
        ENUMS,
        showChartFlag: false,
        departments: [],
        notificationMessage: null,
        notificationType: "is-info",
        selectedYear: "1400",
        results: [],
        datasets: [],
        labels: [],
        years: [],
        department_category_id: null,
        departmentCategories: [],
        references: null,
    }),

    props: {
        departmentCategoriesUrl: {
            type: String,
            default: "",
        },
        departmentsUrl: {
            type: String,
            default: "",
        },

        reportUrl: {
            type: String,
            default: "",
        },
    },

    computed: {
        showNotification: (state) => state.notificationMessage != null,

        label1: function () {
            if (0 == this.results.length) {
                return null;
            }

            const arr = Object.keys(this.results[0]["data"]);
            return arr.find(
                (item) =>
                    item == "محصول و خدمت سالم" ||
                    item == "انتقال مطالبات مردم مخاطب"
            );
        },
        label2: function () {
            if (0 == this.results.length) {
                return null;
            }

            return Object.keys(this.results[0]["data"]).find(
                (item) =>
                    item == "سلامت کارکنان" ||
                    item == "انتقال پیام به مردم مخاطب"
            );
        },

        label3: function () {
            if (0 == this.results.length) {
                return null;
            }

            return Object.keys(this.results[0]["data"]).find(
                (item) =>
                    item == "پروژه های سلامت محور" || item == "اثرات محیط زیست"
            );
        },

        label4: function () {
            if (0 == this.results.length) {
                return null;
            }

            return Object.keys(this.results[0]["data"]).find(
                (item) =>
                    item == "فعالیت ها بستر سازی شبکه مردمی" ||
                    item == "فعالیت ها بستر سازی دستگاه"
            );
        },
    },

    created() {
        this.init();
    },

    methods: {
        /**
         * Init method
         */
        init() {
            this.loadYears();
            this.loadDepartmentCategories();
        },

        /**
         * onchange department category
         */
        async onChange($event) {
            let url = this.departmentsUrl.replace(
                "$department_category$",
                $event
            );

            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;
            Vue.set(this, "departments", datas);
        },

        /**
         * load all departmentCategories for select departmentCategories in form
         */
        async loadDepartmentCategories() {
            const url = this.departmentCategoriesUrl;
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "departmentCategories", datas);
        },

        /**
         * Load data
         */
        async loadData() {
            Vue.set(this, "showChartFlag", false);
            await this.loadReportData();
            Vue.nextTick(() => {
                Vue.set(this, "showChartFlag", true);
            });
        },

        /**
         * Load link access
         */
        async loadReportData() {
            let depCat = this.references;
            let year = this.selectedYear;
            let url = this.reportUrl;

            url = url
                .replace("#department_category#", depCat)
                .replace("#year#", year);
            try {
                let res = await AxiosHelper.send("get", url);

                if (res.data.success) {
                    const data = res.data.data || [];
                    const resData = this.convertData(data);
                    Vue.set(this, "results", resData);
                }
            } catch (err) {}

            let finalData = [];
            for (let index = 0; index < this.results.length; index++) {
                const temp = {
                    labels: [
                        this.label1,
                        this.label2,
                        this.label3,
                        this.label4,
                    ],
                    label: this.results[index].depName,
                    data: [
                        this.results[index].data[this.label1].toFixed(2),
                        this.results[index].data[this.label2].toFixed(2),
                        this.results[index].data[this.label3].toFixed(2),
                        this.results[index].data[this.label4].toFixed(2),
                    ],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                    ],
                    borderWidth: 1,
                };

                finalData.push(temp);
            }
            // Vue.set(this.datasets, this.datasets.length, temp);
            Vue.set(this, "datasets", finalData);

            const labels = [this.label1, this.label2, this.label3, this.label4];
            Vue.set(this, "labels", labels);

            // for (let index = 0; index < this.results.length; index++) {
            //     const element = this.results[index];
            //     const keys = Object.keys(element);
            //     const values = Object.values(element);
            //     const temp = {
            //         label: values[0],
            //         data: values.slice(1),
            //         backgroundColor: "transparent",
            //         backgroundColor:
            //             "#" + Math.floor(Math.random() * 16777215).toString(16),
            //     };
            //     Vue.set(this.datasets, this.datasets.length, temp);
            //     Vue.set(this, "labels", keys.slice(1));
            // }
        },

        /**
         *convertData
         */
        convertData(payload) {
            let data = payload;

            function convertToObject(data, name) {
                let result = {};

                let sum = 0;
                data.forEach((item) => {
                    result[item[name]] =
                        item.weight * item["score"]["$numberDecimal"];
                    sum = sum + parseFloat(result[item[name]]);
                    result["sum"] = sum;
                });
                return result;
            }

            data = data.map((item) => ({
                ...item,
                data: convertToObject(item.data, "name"),
            }));

            return data;
        },
        /**
         * Set notification
         */
        setNotification(message, notificationType = "is-info") {
            Vue.set(this, "notificationType", notificationType);
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },

        /**
         * Load years
         */
        loadYears() {
            const years = [1395, 1396, 1397, 1398, 1399, 1400];
            Vue.set(this, "years", years);
        },
    },
};
</script>
