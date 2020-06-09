<template lang="pug">
    .container
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .container.page-header
                .hero-dashboard
                    .field.is-grouped
                        .control
                            a.button.is-primary.is-rounded(:href="inviteSessionUrl") جلسات
                        .control
                            a.button.is-primary.is-rounded(:href="memorandumUrl") تفاهم نامه ها
                        .control
                            a.button.is-primary.is-rounded(href="/project") پروژه ها
                        .control
                            a.button.is-primary.is-rounded(href="/result") برآمدها
                        .control
                            a.button.is-primary.is-rounded(href="/approv") مصوبات
                        .control
                            a.button.is-primary.is-rounded(href="/regulation") آئین نامه ها
                        .control
                            a.button.is-primary.is-rounded(href="/project") اقدامات خلاق
            .info-card
                .info-card-title {{ departmentData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام پروژه:
                        .info-card-value {{ departmentData.title }}
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
            loadUrl: null,
            title: null,
            department_category_id: null,
            files: {},
            isActive: false
        },

        showLoadingFlag: false
    }),

    props: {
        departmentId: {
            type: String,
            default: null
        },

        inviteSessionUrl: {
            type: String,
            default: null
        },

        memorandumUrl: {
            type: String,
            default: null
        },

        showLoadUrl: {
            type: String,
            default: null
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
        loadDepartmentData(id) {
            id = id || this.departmentId;
            let url = this.loadUrl || this.showLoadUrl;
            url = url.replace(/\$department\$/g, id);
            console.log(url);
            AxiosHelper.send("get", url)
                .then(res => {
                    const data = res.data.data.data;
                    Vue.set(this, "departmentData", data || {});
                })
                .catch(err => {
                    console.error(err);
                    alert("Error");
                });
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
        }
    }
};
</script>
