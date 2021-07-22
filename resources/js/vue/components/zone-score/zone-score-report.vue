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

            b-field(grouped label="گروه")
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
                        b-button(type="is-primary", @click="loadData", rounded, label="اجرا")
    .columns.is-multiline
        .column.is-12
            b-table(:data="results", expanded)
                b-table-column(label="نام", v-slot="props")
                    | {{ props.row.name }}
                b-table-column(label="محصول و خدمت سالم", v-slot="props")
                    | {{ props.row.mahsool }}
                b-table-column(label="سلامت کارکنان", v-slot="props")
                    | {{ props.row.salamat }}
                b-table-column(label="اثرات محیط زیست", v-slot="props")
                    | {{ props.row.mohitzist }}
                b-table-column(label="فعالیت های بسترسازی", v-slot="props")
                    | {{ props.row.faaliat }}
                b-table-column(label="نمره سال", v-slot="props")
                    | {{ props.row.nomreh }}
        .column.is-12
            .chart.container
                multi-line-chart(:labels="labels", :datasets="datasets")
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

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ZoneScores",

    components: {
        Loading,
        Notification,
        MultiLineChart,
    },

    data: () => ({
        ENUMS,
        departments: [],
        notificationMessage: null,
        notificationType: "is-info",
        selectedYear: "1399",
        results: {},
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
    },

    computed: {
        showNotification: (state) => state.notificationMessage != null,
    },

    created() {
        this.init();
    },

    mounted() {},

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
        loadData() {
            // let karnamehData = [
            //     {
            //         year: "1398",
            //         result: [
            //             {
            //                 name: "محیط زیست",
            //                 mahsool: 19,
            //                 salamat: 21.3,
            //                 mohitzist: 17.5,
            //                 faaliat: 14.4,
            //                 nomreh: 72.2,
            //             },
            //             {
            //                 name: "آبفای شهری و روستایی",
            //                 mahsool: 12.3,
            //                 salamat: 11.5,
            //                 mohitzist: 13,
            //                 faaliat: 13,
            //                 nomreh: 49.8,
            //             },
            //             {
            //                 name: "آموزش و پرورش",
            //                 mahsool: 23,
            //                 salamat: 20,
            //                 mohitzist: 12,
            //                 faaliat: 11,
            //                 nomreh: 66,
            //             },
            //             {
            //                 name: "منابع طبیعی",
            //                 mahsool: 17,
            //                 salamat: 23,
            //                 mohitzist: 11,
            //                 faaliat: 14,
            //                 nomreh: 65,
            //             },
            //         ],
            //     },
            //     {
            //         year: "1399",
            //         result: [
            //             {
            //                 name: "محیط زیست",
            //                 mahsool: 30,
            //                 salamat: 30,
            //                 mohitzist: 20,
            //                 faaliat: 20,
            //                 nomreh: 100,
            //             },
            //             {
            //                 name: "آبفای شهری و روستایی",
            //                 mahsool: 15,
            //                 salamat: 13.5,
            //                 mohitzist: 14,
            //                 faaliat: 13,
            //                 nomreh: 55.5,
            //             },
            //             {
            //                 name: "آموزش و پرورش",
            //                 mahsool: 24.4,
            //                 salamat: 22,
            //                 mohitzist: 17,
            //                 faaliat: 15.3,
            //                 nomreh: 78.7,
            //             },
            //             {
            //                 name: "منابع طبیعی",
            //                 mahsool: 18,
            //                 salamat: 24,
            //                 mohitzist: 12,
            //                 faaliat: 19,
            //                 nomreh: 73,
            //             },
            //         ],
            //     },
            // ];
            let karnamehData =
                {
                    result: [
                        {
                            name: "محیط زیست",
                            mahsool: 30,
                            salamat: 30,
                            mohitzist: 20,
                            faaliat: 20,
                            nomreh: 100,
                        },
                        {
                            name: "آبفای شهری و روستایی",
                            mahsool: 15,
                            salamat: 13.5,
                            mohitzist: 14,
                            faaliat: 13,
                            nomreh: 55.5,
                        },
                        {
                            name: "آموزش و پرورش",
                            mahsool: 24.4,
                            salamat: 22,
                            mohitzist: 17,
                            faaliat: 15.3,
                            nomreh: 78.7,
                        },
                        {
                            name: "منابع طبیعی",
                            mahsool: 18,
                            salamat: 24,
                            mohitzist: 12,
                            faaliat: 19,
                            nomreh: 73,
                        },
                    ],
                };
            // let selectedData = karnamehData.filter(
            //     (x) => x.year == this.selectedYear
            // );
            Vue.set(this, "results", karnamehData.result);
            console.log(this.results);
            for (let index = 0; index < this.results.length; index++) {
                const element = this.results[index];
                const keys = Object.keys(element);
                const values = Object.values(element);
                const temp = {
                    label: values[0],
                    data: values.slice(1),
                    backgroundColor: "transparent",
                    backgroundColor:
                        "#" + Math.floor(Math.random() * 16777215).toString(16),
                };
                Vue.set(this.datasets, this.datasets.length, temp);
                Vue.set(this, "labels", keys.slice(1));
            }
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
