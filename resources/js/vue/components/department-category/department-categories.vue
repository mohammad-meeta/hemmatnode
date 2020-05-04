<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") دسته بندی های گروه
                    h1(v-show="modeRegister") ایجاد دسته بندی گروه
                    h1(v-show="modeEdit") ویرایش دسته بندی گروه

        .columns.exposed-form(v-show="!modeLoading")
            .column.is-one-fifth(v-show="modeList")
                a.button.is-primary.is-rounded(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)")
                    span.icon.is-small
                        i.material-icons.icon check_circle
                    span ایجاد

            .column.is-one-fifth(v-show="!modeList")
                a.button.is-warning.is-rounded(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)")
                    span.icon.is-small
                        i.material-icons.icon check_circle
                    span بازگشت

        .columns.is-vcentered
            .column(v-if="modeLoading")
                loading

            .column(v-show="!modeLoading && modeList")
                list-department-category(ref="departmentCategoryList", @on-command="onCommand", :list-url="listUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-department-category(@on-command="onCommand",
                  @on-register="onDepartmentCategoryRegister"
                  :register-url="registerUrl")

            .column(v-show="!modeLoading && modeEdit")
                edit-department-category(ref="departmentCategoryEdit", @on-command="onCommand",
                @on-update="onDepartmentCategoryUpdate"
                :edit-url="editUrl",)

            .column(v-show="!modeLoading && modeShow")
                show-department-category(ref="departmentCategoryShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterDepartmentCategory = require("VUE-COMPONENTS/department-category/register-department-category.vue").default;
const ListDepartmentCategory = require("VUE-COMPONENTS/department-category/list-department-category.vue").default;
const EditDepartmentCategory = require("VUE-COMPONENTS/department-category/edit-department-category.vue").default;
const ShowDepartmentCategory = require("VUE-COMPONENTS/department-category/show-department-category.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "DepartmentCategories",

    components: {
        Loading,
        ListDepartmentCategory,
        RegisterDepartmentCategory,
        EditDepartmentCategory,
        ShowDepartmentCategory,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        departmentCategories: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        title: {
            type: String,
            default: null
        },

        listUrl: {
            type: String,
            default: null
        },

        rolesUrl: {
            type: String,
            default: null
        },

        registerUrl: {
            type: String,
            default: null
        },

        editUrl: {
            type: String,
            default: null
        }
    },

    computed: {
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: state => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: state => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: state => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: state => state.formMode == ENUMS.FORM_MODE.EDIT,
        modeShow: state => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: state => state.notificationMessage != null
    },

    created() {
        this.init();
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
        //this.$refs.departmentCategoryList.loadDepartmentCategories(1);
    },

    methods: {
        /**
         * On Register department category
         */
        onDepartmentCategoryRegister(payload) {
            this.$refs.departmentCategoryList.addToDepartmentCategoryList(payload.data.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(
                ".دسته بندی با موفقیت ذخیره شد",
                "is-success"
            );
        },

        /**
         * On Update department category
         */
        onDepartmentCategoryUpdate(payload) {
            this.$refs.departmentCategoryList.editInDepartmentCategoryList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(
                ".دسته بندی با موفقیت ویرایش شد",
                "is-success"
            );
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
                    console.log("REGISTER NEW DepartmentCategory", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW DepartmentCategory */
                    this.$refs.departmentCategoryEdit.loadDepartmentCategoryData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.departmentCategoryShow.loadDepartmentCategoryData(data);
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
                    pop: false
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
