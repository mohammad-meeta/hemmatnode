<template lang="pug">
    .container
        .columns
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .print-form
                    .print-form-top.columns
                        .column.is-3
                            .print-form-logo
                                img(src='/images/logo.png')
                        .column.is-6.print-form-title.text-center
                            span به نام خداوند جان و خرد
                        .column.is-3.print-form-number
                            div
                                b رونق تولید
                            div کد فرم: 13FO20/00
                    .print-form-head
                        table.table.is-fullwidth.is-bordered.text-center
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
                        label دستور جلسه:
                        table.table.is-fullwidth.is-bordered.text-center
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
                    .print-form-body
                        label توضیحات:
                        .is-fullwidth {{ inviteSessionData.body }}
                    .print-form-body(v-if="inviteSessionData.intro")
                        label خلاصه مذاکرات:
                        .is-fullwidth {{ inviteSessionData.intro }}

                    .print-form-body(v-if="inviteSessionData.approves.length")
                        label مصوبات:
                        table.table.is-fullwidth.is-bordered.text-center
                            thead
                                tr
                                    th عنوان مصوبه
                                    th مسئول پیگیری
                                    th مهلت
                            tbody
                                tr(v-for="approve in inviteSessionData.approves")
                                    td {{ approve.title }}
                                    td {{ approve.responsible }}
                                    td {{ approve.time }}

                    .print-form-body(v-if="inviteSessionData.approves")
                        label اعضای حاضر در جلسه:
                        .columns.is-multiline
                            .column.is-3(v-for="user in allPresentUserCheckedRows")
                                | {{ user.profile.first_name }} {{ user.profile.last_name }}
                    label مدعوین (به غیر از افراد حاضر و سایر اعضاء):
                        .columns.is-multiline
                            .column.is-3(v-for="user in inviteSessionData.other_users")
                                | {{ user.first_name }} {{ user.last_name }}

                    .panel
                        .panel-heading
                            | فایل های ضمیمه
                        .panel-block
                            file-download(ref="fileDownload", :old-files="oldFiles")
                    .panel
                        .panel-heading
                            | مستندات جلسه
                        .panel-block
                            file-download(ref="signaturedFileDownload", :old-files="signaturedOldFiles")


</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;

export default {
    name: "ShowInviteSession",

    components: {
        FileDownload,
    },

    props: {
        usersUrl: {
            type: String,
            default: ""
        }
    },

    data: () => ({
        ENUMS,
        oldFiles: [],
        signaturedOldFiles: [],
        users: [],
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
            is_active: false,
            intro: null,
            approves: [],
            present_users: [],
        },
        other_users: [],
        presentUserListTable: {
            checkedRows: [],
        },
        showLoadingFlag: false
    }),

    created() {
        this.loadUsers();
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null,
        allPresentUserCheckedRows: {
            set: function(value) {
                Vue.set(this.presentUserListTable, "checkedRows", value);
                ``;
            },
            get: function() {
                if (null == this.presentUserListTable.checkedRows) {
                    Vue.set(this.presentUserListTable, "checkedRows", []);
                }
                return this.presentUserListTable.checkedRows;
            }
        },
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
                is_active: data.is_active,
                intro: data.intro,
                approves: data.approves,
                present_users: [],
                other_users: data.other_user,
            };

            Vue.set(this, "inviteSessionData", temp);
            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileDownload.updateOldFiles(this.oldFiles);
            Vue.set(this, "signaturedOldFiles", data.signatured);
            this.$refs.signaturedFileDownload.updateOldFiles(this.signaturedOldFiles);
            const userslist = this.inviteSessionData.user_list;
            let checkedUsers = this.users.filter(
                u => userslist.indexOf(u._id) > -1
            );
            Vue.set(this, "allPresentUserCheckedRows", checkedUsers);
        },

        /**
         * load all users for select user in form
         */
        loadUsers() {
            const url = this.usersUrl;
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "users", datas);
            });
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
