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
                h1 اسناد راهبردی
        .container.main-content
            .intro-cards.columns
                .column.is-4(
                    v-for="documentCategory in documentCategories",
                    :key="documentCategory.id"
                )
                    .intro-card
                        .intro-card-head
                            h2 {{ documentCategory.title }}
                        .panel-block.is-active(
                            v-for="doc in documentCategory.document",
                            :key="doc._id"
                        )
                            a(:href="doc.file") {{ doc.title }}
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "DocumentList",

    components: {
        Loading,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        documentCategories: [
            {
                id: 1,
                title: "اسناد مربوط به کارگروه سلامت و امنیت غذایی",
                document: [
                    {
                        id: 1,
                        title:
                            "اولین صورتجلسه کارگروه سلامت و امنیت غذایی استان",
                        file: "/images/storage/1.pdf",
                    },
                    {
                        id: 3,
                        title:
                            "دومین صورتجلسه کارگروه سلامت و امنیت غذایی استان",
                        file: "/images/storage/2.pdf",
                    },
                ],
            },
            {
                id: 2,
                title: "شیوه نامه های کارگروه سلامت و امنیت غذایی",
                document: [
                    {
                        id: 2,
                        title:
                            "شیوه نامه تشکیل شورای پیام گزاران دستگاههای اجرایی",
                        file: "/images/storage/tashkil-v-ertegha-payam.pdf",
                    },
                ],
            },
        ],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        title: {
            type: String,
            default: null,
        },
    },

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
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
         * Init
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
