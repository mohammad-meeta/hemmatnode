<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType",
                        @on-close="closeNotification",
                        v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") تفاهم نامه ها
                    h1(v-show="modeRegister") ایجاد تفاهم نامه
                    h1(v-show="modeEdit") ویرایش تفاهم نامه

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
                list-memorandum(ref="memorandumList",
                    @on-command="onCommand",
                    :department-id="departmentId",
                    :list-url="listUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-memorandum(ref="memorandumRegister",
                    :department-id="departmentId"
                    @on-command="onCommand",
                    @on-register="onMemorandumRegister"
                    :register-url="registerUrl",
                    :departments-url="departmentsUrl",
                    :users-url="usersUrl")

            .column(v-show="!modeLoading && modeEdit")
                edit-memorandum(ref="memorandumEdit", @on-command="onCommand",
                @on-update="onMemorandumUpdate"
                :edit-url="editUrl",
                :departments-url="departmentsUrl",
                :users-url="usersUrl")

            .column(v-show="!modeLoading && modeShow")
                show-memorandum(ref="memorandumShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterMemorandum = require("VUE-COMPONENTS/memorandum/register-memorandum.vue")
    .default;
const ListMemorandum = require("VUE-COMPONENTS/memorandum/list-memorandum.vue")
    .default;
const EditMemorandum = require("VUE-COMPONENTS/memorandum/edit-memorandum.vue").default;
const ShowMemorandum = require("VUE-COMPONENTS/memorandum/show-memorandum.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "Memorandums",

    components: {
        Loading,
        ListMemorandum,
        RegisterMemorandum,
        EditMemorandum,
        ShowMemorandum,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        memorandums: [],
        notificationMessage: null,
        notificationType: "is-info"
    }),

    props: {
        departmentId: {
            type: String,
            default: null
        },

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

        departmentsUrl: {
            type: String,
            default: null
        },

        editUrl: {
            type: String,
            default: null
        },

        usersUrl: {
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
        this.$refs.memorandumList.loadMemorandums(1);
    },

    methods: {
        /**
         * On Register memorandum
         */
        onMemorandumRegister(payload) {
            //***update vue list****
            this.$refs.memorandumList.addToMemorandumList(
                payload.data.data
            );
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
            this.setNotification(
                ".تفاهمنامه با موفقیت ذخیره شد",
                "is-success"
            );
        },

        /**
         * On Update memorandum
         */
        onMemorandumUpdate(payload) {
            this.$refs.memorandumList.editInMemorandumList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(
                ".تفاهمنامه با موفقیت ویرایش شد",
                "is-success"
            );
        },

        /**
         * On commands clicked
         */
        onCommand(payload) {
            let arg = payload.arg || null;
            const data = payload.data || {};

            data.projects = [
                {
                title: "پروژه یک",
                budget: "500",
                supply: "استانی",
                results: [
                    {
                        title: "برآمد یک"
                    },
                    {
                        title: "برآمد دو"
                    },
                    {
                        title: "برآمد سه"
                    },
                    {
                        title: "برآمد چهار"
                    },
                ]
            },
            {
                title: "پروژه دو",
                budget: "700",
                supply: "استانی",
                results: [
                    {
                        title: "برآمد یک"
                    },
                    {
                        title: "برآمد دو"
                    },
                    {
                        title: "برآمد سه"
                    },
                    {
                        title: "برآمد چهار"
                    },
                ]
            }
            ];

            if (null == arg) {
                arg = payload;
            }

            switch (arg) {
                case ENUMS.COMMAND.NEW:
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW  */
                    console.log("REGISTER NEW Memorandum", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    this.$refs.memorandumEdit.loadMemorandumData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.memorandumShow.loadMemorandumData(data);
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
