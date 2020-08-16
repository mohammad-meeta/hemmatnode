<template lang="pug">
    .container
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .container.page-header
                .hero-dashboard
                    .field.is-grouped
                        .control(v-for='item in accessLink')
                            a.button.is-primary.is-rounded(:href="item.link") {{ item.text }}

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
            isActive: false,
        },

        accessLink: [],

        showLoadingFlag: false,
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },

        inviteSessionUrl: {
            type: String,
            default: null,
        },

        memorandumUrl: {
            type: String,
            default: null,
        },

        showLoadUrl: {
            type: String,
            default: null,
        },

        showLoadAccessLinkUrl: {
            type: String,
            default: null,
        },
    },

    created() {
        this.loadLinkAccess(this.departmentId);
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific department
         */
        loadDepartmentData(id) {
            id = id || this.departmentId;
            let url = this.loadUrl || this.showLoadUrl;
            url = url.replace(/\$department\$/g, id);

            AxiosHelper.send("get", url)
                .then((res) => {
                    const data = res.data.data.data;
                    Vue.set(this, "departmentData", data || {});
                })
                .catch((err) => {
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
        },

        /**
         * load link access
         */
        loadLinkAccess(id) {
            id = id || this.departmentId;
            let url = this.showLoadAccessLinkUrl;
            url = url.replace(/\$department\$/g, id);

            AxiosHelper.send("get", url)
                .then((res) => {
                    if (res.data.success) {
                        const data = res.data.data || [];
                        if (data.length > 0) {
                            const changeData = this.replaceChildInUrl(
                                data[0].text_link,
                                id
                            );
                            Vue.set(this, "accessLink", changeData);
                        }
                    } else {
                        Vue.set(this, "accessLink", []);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error");
                });
        },

        replaceChildInUrl(input, id) {
            const data = input;
            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                data[index].link = data[index].link.replace("#child#", id);
            }
            return data;
        },
    },
};
</script>
