<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") کاربران
                    h1(v-show="modeRegister") ثبت نام کاربر جدید
                    h1(v-show="modeEdit") ویرایش کاربر

        .columns.exposed-form(v-show="!modeLoading")
            .column.is-one-fifth(v-show="modeList")
                a.button.is-primary.is-rounded(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)")
                    span.icon.is-small
                        i.material-icons.icon check_circle
                    span ثبت نام

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
                list-user(ref="userList", @on-command="onCommand", :list-url="listUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-user(@on-command="onCommand",
                  @on-register="onUserRegister"
                  :register-url="registerUrl",
                  :departments-url="departmentsUrl",
                  :roles-url="rolesUrl")

            .column(v-show="!modeLoading && modeEdit")
                edit-user(ref="userEdit", @on-command="onCommand",
                @on-update="onUserUpdate"
                :edit-url="editUrl",
                :roles-url="rolesUrl")

            .column(v-show="!modeLoading && modeShow")
                show-user(ref="userShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterUser = require("VUE-COMPONENTS/user/register-user.vue").default;
const ListUser = require("VUE-COMPONENTS/user/list-user.vue").default;
const EditUser = require("VUE-COMPONENTS/user/edit-user.vue").default;
const ShowUser = require("VUE-COMPONENTS/user/show-user.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "Users",

    components: {
        Loading,
        ListUser,
        RegisterUser,
        EditUser,
        ShowUser,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        users: [],
        notificationMessage: null,
        notificationType: "is-info"
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
        },

        departmentsUrl: {
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
        this.$refs.userList.loadUsers(1);
    },

    methods: {
        /**
         * On Register user
         */
        onUserRegister(payload) {
            this.$refs.userList.addToUserList(payload.data.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
            this.setNotification(".کاربر با موفقیت ذخیره شد", "is-success");
        },

        /**
         * On Update user
         */
        onUserUpdate(payload) {
            this.$refs.userList.editInUserList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
            this.setNotification(".کاربر با موفقیت ویرایش شد", "is-success");
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
                    /* TODO: REGISTER NEW USER */
                    console.log("REGISTER NEW USER", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW USER */
                    this.$refs.userEdit.loadUserData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.userShow.loadUserData(data);
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
        }
    }
};
</script>

<style scoped>
</style>
