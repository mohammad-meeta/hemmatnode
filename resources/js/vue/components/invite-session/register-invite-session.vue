<template lang="pug">
.container-child
    notification(
        :notification-type="notificationType",
        @on-close="closeNotification",
        v-if="showNotification"
    )
        span(v-html="notificationMessage")

    .column.is-full(v-show="isLoadingMode")
        h1 در حال بارگذاری
    .form-small(v-show="! isLoadingMode")
        .field
            .panel
                .panel-heading
                    | دستور جلسه
                .panel-block
                    multi-text(v-model="inviteSessionData.agenda")
        .field
            label.label مکان
            .control
                input.input(
                    type="text",
                    placeholder="مکان",
                    v-model="inviteSessionData.place",
                    required
                )

        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model="inviteSessionData.date",
                    format="YYYY-MM-DD HH:mm:ss",
                    display-format=" jDD/jMM/jYYYY HH:mm",
                    type="datetime",
                    required
                )

        .field
            .panel
                .panel-heading
                    | حاضرین جلسه
                .panel-block
                    b-table.table.is-fullwidth(
                        :data="users",
                        :columns="columns",
                        :checked-rows.sync="checkedRows",
                        checkable,
                        :paginated="isPaginated",
                        :per-page="perPage",
                        :current-page.sync="currentPage",
                        :pagination-simple="isPaginationSimple",
                        :pagination-position="paginationPosition",
                        :checkbox-position="checkboxPosition"
                    )
                        template(slot="bottom-left")
                            | نفرات انتخاب شده : {{ checkedRows.length }} نفر
        .field
            .panel
                .panel-heading
                    | مدعوین (به غیر از افراد حاضر و سایر اعضاء)
                .panel-block
                    multi-text-member(v-model="inviteSessionData.other_user")
        .field
            .panel
                .panel-heading
                    | فایل های ضمیمه
                .panel-block
                    file-upload(ref="fileUpload", :old-files="oldFiles")
        .field
            label.label تکالیف حاضرین
            .control
                textarea.textarea(
                    placeholder="تکالیف حاضرین",
                    v-model="inviteSessionData.body"
                )
        .field
            label.checkbox
                input(type="checkbox", v-model="inviteSessionData.is_active")
                |
                | فعال

        .field.is-grouped
            .control(v-show="! isLoadingMode")
                a.button.is-link.is-rounded(
                    href="#",
                    @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                )
                    |
                    | ایجاد
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const InviteSessionValidator = require("JS-VALIDATORS/invite-session-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const MultiText = require("VUE-COMPONENTS/general/multi-text.vue").default;
const MultiTextMember = require("VUE-COMPONENTS/invite-session/multi-text-member.vue")
    .default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

module.exports = {
    name: "RegisterInviteSession",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        MultiText,
        FileUpload,
        MultiTextMember,
    },

    data: () => ({
        ENUMS,
        departments: [],
        users: [],
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        inviteSessionData: {
            title: null,
            body: null,
            agenda: [
                {
                    title: "تلاوت قرآن و معنی",
                    way: "سخنرانی",
                    duration: "5",
                    provider: "عضو هیات رئیسه",
                },
                {
                    title: "گزارش کشیک نوروزی سال 1398",
                    way: "سخنرانی",
                    duration: "20",
                    provider: "عضو هیات رئیسه",
                },
            ],
            place: null,
            date: null,
            department_id: null,
            files: [],
            deletedOldFiles: [],
            user_list: {},
            other_user: [],
            is_active: false,
        },

        checkedRows: [],
        checkboxPosition: "left",
        isPaginated: true,
        isPaginationSimple: false,
        paginationPosition: "bottom",
        currentPage: 1,
        perPage: 10,
        columns: [
            {
                field: "name",
                label: "نام کاربری",
                searchable: true,
            },
            {
                field: "profile.first_name",
                label: "نام",
                searchable: true,
            },
            {
                field: "profile.last_name",
                label: "نام خانوادگی",
                searchable: true,
            },
        ],

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },

        registerUrl: {
            type: String,
            default: "",
        },

        departmentsUrl: {
            type: String,
            default: "",
        },

        usersUrl: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadDepartments();
        this.loadUsers();
    },

    mounted() {
        Vue.set(this.inviteSessionData, "departments", this.departmentId);
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerInviteSession();
                    break;
            }
        },

        /**
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departments", datas);
            });
        },

        /**
         * load all users for select user in form
         */
        loadUsers() {
            const url = this.usersUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "users", datas);
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
         * Register new invite session
         */
        registerInviteSession() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();
            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);
            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);
            let inviteSessionData = {
                body: this.inviteSessionData.body,
                agenda: JSON.stringify(this.inviteSessionData.agenda),
                other_user: JSON.stringify(this.inviteSessionData.other_user),
                place: this.inviteSessionData.place,
                date: this.inviteSessionData.date,
                department_id: this.inviteSessionData.departments,
                user_list: [],
                is_active: this.inviteSessionData.is_active,
                files: this.files,
                deletedOldFiles: this.deletedOldFiles,
            };
            inviteSessionData.user_list = this.checkedRows.map((x) => x._id);

            this.showLoading();
            const url = this.registerUrl;

            AxiosHelper.send("post", url, inviteSessionData, {
                sendAsFormData: true,
                filesArray: "files",
            })
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
                        this.$emit("on-register", {
                            sender: this,
                            data: {
                                data: data,
                                dep_title: 0,
                            },
                        });
                    }
                })
                .catch((err) => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new invite session data
         */
        validate() {
            const result = InviteSessionValidator.validate(
                this.inviteSessionData
            );

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        },
    },
};
</script>

<style scoped>
</style>
