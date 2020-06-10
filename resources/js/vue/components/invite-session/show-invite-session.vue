<template lang="pug">
    .container
        .columns
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .print-form
                    .print-form-top.columns
                        .column.is-3.print-form-logo
                            img(src='/images/logo.png')
                        .column.is-6.print-form-title
                            span به نام خداوند جان و خرد
                        .column.is-3.print-form-number
                            span کد فرم: 13FO20/00
                    .print-form-head
                        table.table
                            thead
                                tr
                                    th موضوع جلسه
                                    th تاریخ
                                    th ساعت
                                    th مکان
                            tbody
                                tr
                                    td {{ inviteSessionData.dep }}
                                    td {{ toPersianDate(inviteSessionData.date, 'jYYYY', 'fa') }}
                                    td {{ toPersianDate(inviteSessionData.date, 'HH:MM', 'fa') }}
                                    td {{ (inviteSessionData.place) }}

                    .print-form-body
                        h3 دستور جلسه:
                        table.table
                            thead
                                tr
                                    th دستور جلسه
                                    th زمان (دقیقه)
                                    th ارائه دهنده
                            tbody
                                tr(v-for="agenda in inviteSessionData.agenda")
                                    td {{ agenda.title }}
                                    td {{ agenda.duration }}
                                    td {{ agenda.provider }}

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
            dep: null,
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
                dep: data.dep.title,
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

            try {
                temp.agenda = JSON.parse(data.agenda);
            } catch (ex) {
                temp.agenda = [];
            }

            Vue.set(this, "inviteSessionData", temp);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date, format, value) {
            return DateHelper.toPersianDate(date, format, value);
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
