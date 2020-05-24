<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ departmentData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نام پروژه:
                            .info-card-value {{ departmentData.title }}
                        .info-card-item
                            .info-card-label برنامه:
                            .info-card-value {{ departmentData.department_category_id }}
                        .info-card-item
                            .info-card-label معرفی:
                            .info-card-value {{ departmentData.description }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowDepartment",

    data: () => ({
        ENUMS,
        departmentData: {
            _id: null,
            title: null,
            department_category_id: null,
            files: {},
            isActive: false
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
         * Load specific department
         */
        loadDepartmentData(data) {
            const temp = {
                _id: data._id,
            title: data.title,
            department_category_id: data.depatment_category_id,
            files: {},
                isActive: data.is_active
            };
            console.log(temp);
            Vue.set(this, "departmentData", temp);
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
