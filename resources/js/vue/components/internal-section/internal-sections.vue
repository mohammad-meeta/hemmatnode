<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1 هماهنگی درون بخشی
                .hero-dashboard
                    .field.is-grouped
                        .control
                            a.button.is-primary.is-rounded(href="/invite-session") جلسات
                        .control
                            a.button.is-primary.is-rounded(href="/project") پروژه ها
                        .control
                            a.button.is-primary.is-rounded(href="/result") برآمدها
            .container
                .intro-card.p-3(v-for='internalSection in internalSections', :key='internalSection.id')
                    .intro-card-head {{ internalSection.title }}
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "InternalSection",

    components: {
        Loading,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        internalSections: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        title: {
            type: String,
            default: null
        },

        departmentCategoriesUrl: {
            type: String,
            default: null
        }
    },

    computed: {
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: state => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: state => state.formMode == ENUMS.FORM_MODE.LIST,
        showNotification: state => state.notificationMessage != null
    },

    created() {
        this.init();
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
        this.loadInternalSections(1);
    },

    methods: {

        /**
         * Load internalSections
         */
        loadInternalSections(pageId) {
            let url = this.departmentCategoriesUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "internalSections", resData.data.data);
            });
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
