<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .print-form
                    .print-form-head
                        .print-form-logo
                            img(src='/images/logo.png')
                        .print-form-title
                            h2 فرم صورتجلسه
                            h3 {{ inviteSessionData.agenda }}
                        .print-form-number
                            span شماره مدرک




</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowInviteSession",

    data: () => ({
        ENUMS,
        inviteSessionData: {
            _id: null,
            body: null,
            agenda: null,
            place: null,
            date: null,
            department_id: null,
            files: {},
            user_list: {},
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
         * Load specific invite session
         */
        loadInviteSessionData(data) {
            const temp = {
                _id: data._id,
                body: data.body,
                agenda: data.agenda,
                place: data.place,
                date: data.date,
                department_id: data.department_id,
                files: data.files,
                roles: data.roles,
                user_list: data.user_list,
                isActive: data.is_active
            };
            Vue.set(this, "inviteSessionData", temp);
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
