<template lang="pug">
.container-parent()
    section.hero
        notification(
            :notification-type="notificationType",
            @on-close="closeNotification",
            v-if="showNotification"
        )
            span(v-html="notificationMessage")
        .container.page-header
            .title
                h1(v-show="modeList") پروژه های تفاهم شده
                h1(v-show="modeRegister") ایجاد پروژه های تفاهم شده

    .columns.exposed-form(v-show="!modeLoading")
        .column.is-one-fifth(v-show="modeList")
            a.button.is-primary.is-rounded.is-small(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)"
            )
                span.icon.is-small
                    i.material-icons.icon add
                span ایجاد

        .column.is-one-fifth(v-show="!modeList")
            b-button.is-flex-direction-row-reverse(
                type="is-warning is-light"
                size="is-small"
                icon-right="chevron-right"
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
                )
                    span بازگشت

    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading

        .column(v-show="!modeLoading && modeList")
            list-project-tafahom(
                ref="projecttafahomList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-project-tafahom(
                ref="projecttafahomRegister",
                @on-command="onCommand",
                @on-register="onProjectTafahomRegister",
                :register-url="registerUrl",
                :upload-url-image="uploadUrlImage",
                :upload-url-token="uploadUrlToken",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-project-tafahom(
                ref="projecttafahomEdit",
                @on-command="onCommand",
                @on-update="onProjectTafahomUpdate",
                :edit-url="editUrl",
                :department-id="departmentId",
                :upload-url-image="uploadUrlImage",
                :upload-url-token="uploadUrlToken",
            )

        .column(v-show="!modeLoading && modeShow")
            show-project-tafahom(ref="projecttafahomShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterProjectTafahom = require("VUE-COMPONENTS/projecttafahom/register-projecttafahom.vue")
    .default;
const EditProjectTafahom = require("VUE-COMPONENTS/projecttafahom/edit-projecttafahom.vue")
    .default;
const ListProjectTafahom = require("VUE-COMPONENTS/projecttafahom/list-projecttafahom.vue")
    .default;
const ShowProjectTafahom = require("VUE-COMPONENTS/projecttafahom/show-projecttafahom.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ProjectTafahoms",

    components: {
        Loading,
        ListProjectTafahom,
        RegisterProjectTafahom,
        EditProjectTafahom,
        ShowProjectTafahom,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        projecttafahoms: [],
        notificationMessage: null,
        notificationType: "is-info",
        flagEdit: false,
    }),

    props: {
        uploadUrlImage: {
            type: String,
        },
        uploadUrlToken: {
            type: String,
        },
        departmentId: {
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

    /**
     * Mounted
     */
    mounted() {
        this.init();
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {
        /**
         * On Register projecttafahom
         */
        onProjectTafahomRegister(payload) {
            //***update vue list****
            this.$refs.projecttafahomList.addToProjectTafahomList(
                payload.data.data.data[0]
            );
            this.setNotification(
                ".پروژه های تفاهم شده با موفقیت ذخیره شد",
                "is-success"
            );
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onProjectTafahomUpdate(payload) {
            this.$refs.projecttafahomList.editProjectTafahomList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification("پروژه با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW ProjectTafahom", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    Vue.set(this, "flagEdit", true);
                    /* TODO: Edit InviteSession */
                    this.$refs.projecttafahomEdit.loadProjectTafahomData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.projecttafahomShow.loadProjectTafahomData(data);
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
            this.$refs.projecttafahomList.loadProjectTafahoms(1);
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
