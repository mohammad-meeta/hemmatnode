<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") پروژه
                    h1(v-show="modeRegister") ایجاد پروژه
                    h1(v-show="modeEdit") ویرایش پروژه

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
                list-project(ref="projectList", @on-command="onCommand", :list-url="listUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-project(ref="projectRegister", @on-command="onCommand",
                  @on-register="onProjectRegister"
                  :register-url="registerUrl",
                  :programs-url="programsUrl")

            //.column(v-show="!modeLoading && modeEdit")
                edit-project(ref="projectEdit", @on-command="onCommand",
                @on-update="onProjectUpdate"
                :edit-url="editUrl",
                :programs-url="programsUrl")

            //.column(v-show="!modeLoading && modeShow")
                show-project(ref="projectShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterProject = require("VUE-COMPONENTS/project/register-project.vue")
    .default;
const ListProject = require("VUE-COMPONENTS/project/list-project.vue")
    .default;
//const EditProject = require("VUE-COMPONENTS/project/edit-project.vue").default;
//const ShowProject = require("VUE-COMPONENTS/project/show-project.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "Projects",

    components: {
        Loading,
        ListProject,
        RegisterProject,
        //EditProject,
        //ShowProject,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        projects: [],
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

        registerUrl: {
            type: String,
            default: null
        },

        programsUrl: {
            type: String,
            default: null
        },

        editUrl: {
            type: String,
            default: null
        },
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
        this.$refs.projectList.loadProjects(1);
    },

    methods: {
        /**
         * On Register project
         */
        onProjectRegister(payload) {
            //***update vue list****
            this.$refs.projectList.addToProjectList(payload.data.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST)
            this.setNotification(".پروژه با موفقیت ذخیره شد", "is-success");
        },

        /**
         * On Update project
         */
        onProjectUpdate(payload) {
            this.$refs.projectList.editInProjectList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".پروژه با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW Project", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW Project */
                    this.$refs.projectEdit.loadProjectData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.projectShow.loadProjectData(data);
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
