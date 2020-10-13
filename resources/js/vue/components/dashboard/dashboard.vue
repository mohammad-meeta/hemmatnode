<template lang="pug">
    .container-dashboard
        .columns
            .column.is-1.mt-4.sidebar-first
                .sidebar-top
                    .dashboard-item.logo.mb-3
                        a(href="/")
                            img(:src="logoSrc")
                    .dashboard-item
                        span(class="material-icons")
                            | notifications_none
                .sidebar-bottom
                    .dashboard-item
                        .is-centered.nav-user-container-icon
                            img(:src="require('IMAGES/user.svg')")
                    .dashboard-item
                        a(href='/auth/logout')
                            span(class="material-icons")
                                | logout
            .column.is-2.mt-4.sidebar-second
                .dashboard-item
                    a(
                        href="#"
                        @click.prevent="changeFormMode(FORM_MODE.CONTENT)"
                        :class="{active:FORM_MODE.CONTENT == selected}"
                    )
                        | مدیریت محتوا
                .dashboard-item
                    a(href="#"
                     @click.prevent="changeFormMode(FORM_MODE.USER)"
                     :class="{active:FORM_MODE.USER == selected}"
                     )
                        | مدیریت کاربران
            .column.is-9.dashboard-contents
                .dashboard-content(v-show="modeContent")
                    dashboard-content
                .dashboard-content(v-show="modeUser")
                    dashboard-user
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const DashboardContent = require("VUE-COMPONENTS/dashboard/dashboard-content.vue").default;
const DashboardUser = require("VUE-COMPONENTS/dashboard/dashboard-user.vue").default;
export default {
    name: "Dashboard",

    components: {
        Loading,
        Notification,
        DashboardContent,
        DashboardUser
    },

    data: () => ({

        FORM_MODE: {
            CONTENT: 1,
            USER: 2,
        },

        formModeStack: [],

        notificationMessage: null,
        notificationType: "is-info",

        logoSrc: null,
        selected: null
    }),

    props: {
        title: {
            type: String,
            default: null,
        },
    },

    computed: {
        showNotification: (state) => state.notificationMessage != null,

        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],
        modeContent: (state) => state.formMode == state.FORM_MODE.CONTENT,
        modeUser: (state) => state.formMode == state.FORM_MODE.USER,
    },

    /**
     * Created
     */
    created() {
        this.init();
    },

    methods: {
        /**
         * Init
         */
        init() {
            this.getLogoSrc();
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

        /**
         * get logo src and set for logo image
         */
        getLogoSrc() {
            const src=require('IMAGES/logo.png');
            Vue.set(this, "logoSrc", src);
        },

        /**
         * Change form mode
         */
        changeFormMode(mode, options) {
            Vue.set(this, "selected", mode);
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
    },
};
</script>
