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
            .title(v-show="! modeShow")
                h1 اسناد راهبردی
            .title(v-if="modeShow")
                h1 {{ title }}
            .hero-dashboard
                .field.is-grouped
                    b-button.is-flex-direction-row-reverse(
                        v-show="! modeList"
                        type="is-warning is-light"
                        size="is-small"
                        icon-right="chevron-right"
                        @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
                        )
                            span بازگشت
        .container.main-content(v-show="! modeShow")
            .intro-cards.columns
                .column.is-4(
                    v-for="documentCategory in departmentDocumnets",
                    :key="documentCategory.id"
                )
                    .intro-card
                        .intro-card-head
                            h2 {{ documentCategory.title }}
                        .panel-block.is-active(
                            v-for="doc in documentCategory.docs",
                            :key="doc._id"
                        )
                            a(
                                href="#"
                                @click.prevent="commandClick(ENUMS.COMMAND.SHOW, doc)"
                            ) {{ doc.title }}
        .container.main-content(v-show="modeShow")
            show-document(ref="documentShow", @on-command="onCommand")

</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const ShowDocument = require("VUE-COMPONENTS/document/show-document.vue").default;

export default {
    name: "DocumentList",

    components: {
        Loading,
        Notification,
        ShowDocument
    },

    props: {
        departmentListUrl: {
            type: String,
            default: null,
        },
        documentListUrl: {
            type: String,
            default: null,
        },
        departmentDocumentListUrl: {
            type: String,
            default: null,
        }
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        notificationMessage: null,
        notificationType: "is-info",
        departments: [],
        departmentDocumnets: [],
        departmentDocumnetsCount: 0,
        title: null,
    }),

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: (state) => state.notificationMessage != null,
    },

    /**
     * Created
     */
    created() {
        this.init();
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {

        /**
         * On commands clicked
         */
        onCommand(argument, payload) {
            let arg = argument || null;
            const data = payload || {};
            if (null == arg) {
                arg = 1;
            }
            switch (arg) {
                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;
                case ENUMS.COMMAND.SHOW:
                    this.$refs.documentShow.loadDocumentData(data);
                    Vue.set(this, "title", payload.title);
                    this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                    break;
            }
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg, data) {
            this.onCommand(arg, data);
        },
        /**
         * Init
         */
        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
            this.loadDepartmentsDocuments(1);
        },

        /**
         * Load departments documnets
         */
        loadDepartmentsDocuments(pageId) {
            let url = this.departmentDocumentListUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 1000);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "departmentDocumnets", resData.data.data);
                Vue.set(this, "departmentDocumnetsCount", resData.data.count);
            });
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
