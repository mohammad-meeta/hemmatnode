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
                h1(v-show="modeList") گروه
                h1(v-show="modeRegister") ایجاد گروه
                h1(v-show="modeEdit") ویرایش گروه

    .columns.exposed-form(v-show="!modeLoading")
        .column.is-one-fifth(v-show="modeList")
            a.button.is-primary.is-rounded(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)"
            )
                span.icon.is-small
                    i.material-icons.icon check_circle
                span ایجاد

        .column.is-one-fifth(v-show="!modeList")
            a.button.is-warning.is-rounded(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
            )
                span.icon.is-small
                    i.material-icons.icon check_circle
                span بازگشت

    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading

        .column(v-show="!modeLoading && modeList")
            list-department(
                ref="departmentList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-department(
                ref="departmentRegister",
                @on-command="onCommand",
                @on-register="onDepartmentRegister",
                :register-url="registerUrl",
                :department-categories-url="departmentCategoriesUrl",
                :departments-url="departmentsUrl"
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-department(ref="departmentEdit", 
                @on-command="onCommand",
                @on-update="onDepartmentUpdate"
                :edit-url="editUrl",
                :departments-url="departmentsUrl",
                :department-categories-url="departmentCategoriesUrl"
            )

        .column(v-show="!modeLoading && modeShow")
            show-department(
                ref="departmentShow",
                @on-command="onCommand",
                :document-list-url="documentListUrl"
                :report-list-url="reportListUrl"
                :load-user-url="loadUserUrl"
                :get-image-url="getImageUrl"
            )
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterDepartment = require("VUE-COMPONENTS/department/register-department.vue")
    .default;
const ListDepartment = require("VUE-COMPONENTS/department/list-department.vue")
    .default;
const EditDepartment = require("VUE-COMPONENTS/department/edit-department.vue")
    .default;
const ShowDepartment = require("VUE-COMPONENTS/department/show-department.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Departments",

    components: {
        Loading,
        ListDepartment,
        RegisterDepartment,
        EditDepartment,
        ShowDepartment,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        departments: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        title: {
            type: String,
            default: null,
        },

        listUrl: {
            type: String,
            default: null,
        },

        loadUserUrl: {
            type: String,
            default: null,
        },

        getImageUrl: {
            type: String,
            default: "",
        },

        registerUrl: {
            type: String,
            default: null,
        },

        departmentCategoriesUrl: {
            type: String,
            default: null,
        },

        departmentsUrl: {
            type: String,
            default: null,
        },

        editUrl: {
            type: String,
            default: null,
        },

        loadUrl: {
            type: String,
            default: null,
        },

        documentListUrl: {
            type: String,
            default: null,
        },

        reportListUrl: {
            type: String,
            default: null,
        },
    },

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: (state) => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: (state) => state.formMode == ENUMS.FORM_MODE.EDIT,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: (state) => state.notificationMessage != null,
    },

    created() {
        this.init();
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
        this.$refs.departmentList.loadDepartments(1);
    },

    methods: {
        /**
         * On Register department
         */
        onDepartmentRegister(payload) {
            //***update vue list****
            this.$refs.departmentList.addToDepartmentList(payload.data.data[0]);
            this.setNotification(".گروه با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },

        /**
         * On Update department
         */
        onDepartmentUpdate(payload) {
            this.$refs.departmentList.editInDepartmentList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".گروه با موفقیت ویرایش شد", "is-success");
        },

        /**
         * On commands clicked
         */
        onCommand(payload) {
            let arg = payload.arg || null;
            const data = payload.data || {};
            if (null == arg) {
                arg = payload;
            }

            switch (arg) {
                case ENUMS.COMMAND.NEW:
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW  */
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW Department */
                    this.$refs.departmentEdit.loadDepartmentData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.departmentShow.loadUrl = this.loadUrl;
                    this.$refs.departmentShow.loadDepartmentData(data._id);
                    this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                    break;
            }
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            this.onCommand(arg);
        },

        /**
         * Init method
         */
        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
        },

        /**
         * Change form mode
         */
        changeFormMode(mode, options) {
            const opts = Object.assign(
                {
                    pop: false,
                },
                options
            );

            if (opts.pop) {
                if (this.formModeStack.length > 0) {
                    Vue.delete(
                        this.formModeStack,
                        this.formModeStack.length - 1
                    );
                }
            } else {
                Vue.set(this.formModeStack, this.formModeStack.length, mode);
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
    },
};
</script>
