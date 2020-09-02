<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                .panel
                    .panel-heading
                        | دستور جلسه
                    .panel-block
                        multi-text(v-model='inviteSessionData.agenda')
            .field
                label.label مکان
                .control
                    input.input(type='text', placeholder='مکان', v-model='inviteSessionData.place' required)

            .field
                label.label تاریخ
                .control
                    date-picker(v-model='inviteSessionData.date' format="YYYY-MM-DD HH:mm:ss"
                    display-format="jDD/jMM/jYYYY HH:mm" type="datetime" required)

            .field
                .panel
                    .panel-heading
                        | حاضرین جلسه
                    .panel-block
                        b-table(
                                class="table is-fullwidth"
                                :data="users"
                                :columns="columns"
                                :checked-rows.sync="allCheckedRows"
                                checkable
                                :paginated="isPaginated",
                                :per-page="perPage",
                                :current-page.sync="currentPage",
                                :pagination-simple="isPaginationSimple",
                                :pagination-position="paginationPosition",
                                :checkbox-position="checkboxPosition")
                            template(slot="bottom-left")
                                | نفرات انتخاب شده : {{ checkedRows.length }} نفر

            .field
                .panel
                    .panel-heading
                        | مدعوین (به غیر از افراد حاضر و سایر اعضاء)
                    .panel-block
                        multi-text-member(ref="multiTextMember" v-model='inviteSessionData.other_user')
            .field
                .panel
                    .panel-heading
                        | فایل های ضمیمه
                    .panel-block
                        file-upload(ref="fileUpload", :old-files="oldFiles")
            .field
                label.label تکالیف حاضرین
                .control
                    textarea.textarea(placeholder='تکالیف حاضرین', v-model='inviteSessionData.body')
            .field
                label.checkbox
                    input(type='checkbox', v-model="inviteSessionData.isActive")
                    |   فعال
                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
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
const MultiTextApprov = require("VUE-COMPONENTS/invite-session/multi-text-approv.vue")
    .default;
const MultiTextMember = require("VUE-COMPONENTS/invite-session/multi-text-member.vue")
    .default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

module.exports = {
    name: "EditInviteeSssion",
    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        MultiText,
        FileUpload,
        MultiTextMember
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
            agenda: [],
            place: null,
            date: null,
            department_id: null,
            files: {},
            oldFiles: [],
            user_list: {},
            isActive: false,
            other_user: [],
            deletedOldFiles: []
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
                searchable: true
            },
            {
                field: "profile.first_name",
                label: "نام",
                searchable: true
            },
            {
                field: "profile.last_name",
                label: "نام خانوادگی",
                searchable: true
            }
        ],

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false
    }),

    props: {
        editUrl: {
            type: String,
            default: ""
        },

        departmentId: {
            type: String,
            default: null
        },

        departmentsUrl: {
            type: String,
            default: ""
        },

        usersUrl: {
            type: String,
            default: ""
        }

        // inviteSessionDatas: {}
    },

    created() {
        this.loadDepartments();
        this.loadUsers();
    },

    mounted() {},

    computed: {
        allCheckedRows: {
            set: function(value) {
                Vue.set(this, "checkedRows", value);
                ``;
            },
            get: function() {
                if (null == this.checkedRows) {
                    Vue.set(this, "checkedRows", []);
                }
                return this.checkedRows;
            }
        },
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific user
         */
        loadInviteSessionData(data) {
            let agenda = data.agenda;
            let other_user = data.other_user;
            let temp = {
                _id: data._id,
                dep: data.dep.title,
                body: data.body,
                agenda: agenda,
                place: data.place,
                date: data.date,
                department_id: data.dep._id,
                files: data.files,
                roles: data.roles,
                user_list: data.user_list,
                isActive: data.is_active,
                other_user: other_user
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "inviteSessionData", temp);
            this.$refs.fileUpload.updateOldFiles(data.files);

            const userslist = this.inviteSessionData.user_list;
            let checkedUsers = this.users.filter(
                u => userslist.indexOf(u._id) > -1
            );
            Vue.set(this, "allCheckedRows", checkedUsers);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date, format, value) {
            return DateHelper.toPersianDate(date, format, value);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.EditInviteSession();
                    break;
            }
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
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            AxiosHelper.send("get", url, "").then(res => {
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
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "users", datas);
            });
        },

        /**
         * Edit invite session
         */
        EditInviteSession() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();
            let newUploaded = newFiles.map(x => x.file);
            Vue.set(this, "files", newUploaded);
            let deleteUploaded = deletedFiles.map(x => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);
            let inviteSessionData = {
                _id: this.inviteSessionData._id,
                body: this.inviteSessionData.body,
                agenda: JSON.stringify(this.inviteSessionData.agenda),
                place: this.inviteSessionData.place,
                date: this.inviteSessionData.date,
                department_id: this.inviteSessionData.department_id,
                user_list: this.inviteSessionData.user_list,
                is_active: this.inviteSessionData.isActive,
                other_user: JSON.stringify(this.inviteSessionData.other_user),
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles
            };
            let t = Object.keys(inviteSessionData.user_list)
                .filter(key => true == inviteSessionData.user_list[key])
                .map(key => key);

            inviteSessionData.user_list = t;
            inviteSessionData.user_list = this.checkedRows.map(x => x._id);
            this.showLoading();

            const url = this.editUrl.replace("$id$", inviteSessionData._id);
            console.log(inviteSessionData);
            AxiosHelper.send("post", url, inviteSessionData, {
                sendAsFormData: true,
                filesArray: "files"
            })
                .then(res => {
                    //const data = JSON.parse(res.config.data);
                    const data = res.data;
                    this.$emit("on-update", {
                        sender: this,
                        data
                    });
                })
                .catch(err => {
                    console.error(err);
                    this.setNotification(".خطا در ذخیره جلسه", "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate invite session data
         */
        validate() {
            const result = InviteSessionValidator.validateEdit(
                this.inviteSessionData
            );

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map(key => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        }
    }
};
</script>

<style scoped>
</style>
