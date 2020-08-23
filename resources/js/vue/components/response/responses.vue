<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") پاسخ به طلب همکاری
                    h1(v-show="modeRegister") ایجاد پاسخ به طلب همکاری
                    h1(v-show="modeEdit") ویرایش پاسخ به طلب همکاری

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
                list-request(ref="requestList", @on-command="onCommand", :request-list-url="requestListUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-response(ref="responseRegister", @on-command="onCommand",
                  @on-register="onResponseRegister"
                  :register-url="registerUrl"
                  :departments-url="departmentsUrl"
                  v-model="requestData"
                )

            .column(v-show="!modeLoading && modeShow")
                show-response(ref="responseShow", @on-command="onCommand")

            .column(v-show="!modeLoading && modeShow")
                show-request(ref="requestShow", @on-command="onCommand")

            .column(v-show="!modeLoading && modeEdit")
                edit-response(ref="responseEdit", @on-command="onCommand" ,:edit-url="editUrl")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterResponse = require("VUE-COMPONENTS/response/register-response.vue")
    .default;
// const ListResponse = require("VUE-COMPONENTS/response/list-response.vue")
//     .default;
const ListRequest = require("VUE-COMPONENTS/response/list-request.vue").default;
const ShowResponse = require("VUE-COMPONENTS/response/show-response.vue")
    .default;
const ShowRequest = require("VUE-COMPONENTS/request/show-request.vue").default;
const EditResponse = require("VUE-COMPONENTS/response/edit-response.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "Responses",

    components: {
        Loading,
        EditResponse,
        // ListResponse,
        ListRequest,
        RegisterResponse,
        ShowResponse,
        ShowRequest,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        responses: [],
        notificationMessage: null,
        notificationType: "is-info",
        requestData: {},
    }),

    props: {
        listUrl: {
            type: String,
            default: null,
        },

        requestListUrl: {
            type: String,
            default: null,
        },

        registerUrl: {
            type: String,
            default: null,
        },

        departmentsUrl: {
            type: String,
            default: "",
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
        modeShowRequest: (state) => state.formMode == ENUMS.COMMAND.SHOW,
        showNotification: (state) => state.notificationMessage != null,
    },

    created() {
        this.init();
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
        // this.$refs.responseList.loadResponses(1);
        this.$refs.requestList.loadRequests(1);
    },

    methods: {
        /**
         * On Register response
         */
        onResponseRegister(payload) {
            //***update vue list****
            this.$refs.responseList.addToResponseList(payload.data.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
            this.setNotification(
                ".پاسخ به طلب همکاری با موفقیت ذخیره شد",
                "is-success"
            );
        },

        /**
         * On Update response
         */
        onResponseUpdate(payload) {
            this.$refs.responseList.editInResponseList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(
                ".پاسخ به طلب همکاری با موفقیت ویرایش شد",
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
                    Vue.set(this, "requestData", data);
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW  */
                    console.log("REGISTER NEW Response", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW Response */
                    this.$refs.responseEdit.loadResponseData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                // case ENUMS.COMMAND.SHOW:
                //     this.$refs.responseShow.loadResponseData(data);
                //     this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                //     break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.requestShow.loadRequestData(data);
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
