<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") پیوست سلامت
                    h1(v-show="modeRegister") ایجاد پیوست سلامت

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
                list-healt(ref="healtList", @on-command="onCommand", :list-url="showHealtYearUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-healt(ref="healtRegister", @on-command="onCommand",
                  @on-register="onHealtRegister"
                  :register-url="registerUrl",
                  :department-id="departmentId",
                  :year="year"
                  )

            .column(v-show="!modeLoading && modeEdit")
                edit-healt(ref="healtEdit", @on-command="onCommand",
                @on-update="onHealtUpdate"
                :edit-url="editUrl"
                :department-id="departmentId"
                )

            .column(v-show="!modeLoading && modeShow")
                show-healt(ref="healtShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterHealt = require("VUE-COMPONENTS/healt/register-healt.vue")
    .default;
const EditHealt = require("VUE-COMPONENTS/healt/edit-healt.vue").default;
const ListHealt = require("VUE-COMPONENTS/healt/list-healt.vue").default;
const ShowHealt = require("VUE-COMPONENTS/healt/show-healt.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "Healts",

    components: {
        Loading,
        ListHealt,
        RegisterHealt,
        EditHealt,
        ShowHealt,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        healts: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },
        year: {
            type: String,
            default: null,
        },

        title: {
            type: String,
            default: null,
        },

        listUrl: {
            type: String,
            default: null,
        },
        showHealtYearUrl: {
            type: String,
            default: null,
        },

        registerUrl: {
            type: String,
            default: null,
        },

        editUrl: {
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

    created() {},

    mounted() {
        this.init();
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {
        /**
         * On Register healt
         */
        onHealtRegister(payload) {
            //***update vue list****
            console.log(payload.data.data.data[0]);
            if (this.year == payload.data.data.data[0].date) {
                this.$refs.healtList.addToHealtList(
                    payload.data.data.data[0]
                );
                this.setNotification(
                    ".پیوست سلامت با موفقیت ذخیره شد",
                    "is-success"
                );
            } else {
                this.setNotification(
                    ".پیوست سلامت با موفقیت ذخیره شد و در لیست سال های خود قابل مشاهده می باشد",
                    "is-success"
                );
            }
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onHealtUpdate(payload) {
            this.$refs.healtList.editHealtList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".جلسه با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW Healt", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: Edit InviteSession */
                    this.$refs.healtEdit.loadHealtData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.healtShow.loadHealtData(data);
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
            this.$refs.healtList.loadHealts(1);
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
