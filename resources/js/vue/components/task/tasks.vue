<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") فعالیت
                    h1(v-show="modeRegister") ایجاد فعالیت
                    h1(v-show="modeEdit") ویرایش فعالیت

        .columns.exposed-form(v-show="!modeLoading")
            .column.is-one-fifth(v-show="modeList")
                a.button.is-primary.is-rounded.is-small(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)")
                    span.icon.is-small
                        i.material-icons.icon edit
                    span ایجاد

            .column.is-one-fifth(v-show="!modeList")
                a.button.is-warning.is-rounded(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)")
                    span.icon.is-small
                        i.material-icons.icon edit
                    span بازگشت

        .columns.is-vcentered
            .column(v-if="modeLoading")
                loading

            .column(v-show="!modeLoading && modeList")
                list-task(ref="taskList", @on-command="onCommand", :list-url="listUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-task(ref="taskRegister", @on-command="onCommand",
                  @on-register="onTaskRegister"
                  :register-url="registerUrl",
                  :parents-url="parentsUrl")

            //.column(v-show="!modeLoading && modeEdit")
                edit-task(ref="taskEdit", @on-command="onCommand",
                @on-update="onTaskUpdate"
                :edit-url="editUrl",
                :parents-url="parentsUrl")

            //.column(v-show="!modeLoading && modeShow")
                show-task(ref="taskShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterTask = require("VUE-COMPONENTS/task/register-task.vue")
    .default;
const ListTask = require("VUE-COMPONENTS/task/list-task.vue")
    .default;
//const EditTask = require("VUE-COMPONENTS/task/edit-task.vue").default;
//const ShowTask = require("VUE-COMPONENTS/task/show-task.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Tasks",

    components: {
        Loading,
        ListTask,
        RegisterTask,
        //EditTask,
        //ShowTask,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        tasks: [],
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

        parentsUrl: {
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
        this.$refs.taskList.loadTasks(1);
    },

    methods: {
        /**
         * On Register task
         */
        onTaskRegister(payload) {
            //***update vue list****
            this.$refs.taskList.addToTaskList(payload.data.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST)
            this.setNotification(".فعالیت با موفقیت ذخیره شد", "is-success");
        },

        /**
         * On Update task
         */
        onTaskUpdate(payload) {
            this.$refs.taskList.editInTaskList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".فعالیت با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW Task", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW Task */
                    this.$refs.taskEdit.loadTaskData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.taskShow.loadTaskData(data);
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
