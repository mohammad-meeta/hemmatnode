<template lang="pug">
    .container-dashboard
        .dashboard-content(v-show="modeShow")
            show-invite-session(ref="inviteSessionShow")
        .columns(v-show="!modeShow")
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
                .dashboard-item
                    a(href="#"
                     @click.prevent="changeFormMode(FORM_MODE.SESSION)"
                     :class="{active:FORM_MODE.SESSION == selected}"
                     )
                        | جلسات
                .dashboard-item
                    a(href="#"
                     @click.prevent="changeFormMode(FORM_MODE.ALLSESSION)"
                     :class="{active:FORM_MODE.ALLSESSION == selected}"
                     )
                        | همه جلسات
            .column.is-9.dashboard-contents
                .dashboard-content(v-show="modeContent")
                    dashboard-content
                .dashboard-content(v-show="modeUser")
                    dashboard-user
                .dashboard-content(v-show="modeSession")
                    dashboard-session(
                        :invite-session-list-url="inviteSessionListUrl"
                        @on-command="onCommand"
                    )
                .dashboard-content(v-show="modeAllSession")
                    dashboard-all-session(
                        :invite-session-all-list-url="inviteSessionAllListUrl"
                        @on-command="onCommand"
                    )

</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const DashboardContent = require("VUE-COMPONENTS/dashboard/dashboard-content.vue")
    .default;
const DashboardUser = require("VUE-COMPONENTS/dashboard/dashboard-user.vue")
    .default;
const DashboardSession = require("VUE-COMPONENTS/dashboard/dashboard-session.vue")
    .default;
const DashboardAllSession = require("VUE-COMPONENTS/dashboard/dashboard-all-session.vue")
    .default;
const ShowInviteSession = require("VUE-COMPONENTS/invite-session/show-invite-session.vue")
    .default;
export default {
    name: "Dashboard",

    components: {
        Loading,
        Notification,
        DashboardContent,
        DashboardUser,
        DashboardSession,
        DashboardAllSession,
        ShowInviteSession,
    },

    data: () => ({
        FORM_MODE: {
            CONTENT: 1,
            USER: 2,
            SESSION: 3,
            LOADING: 4,
            SHOW: 5,
            ALLSESSION: 6,
        },

        formModeStack: [],

        notificationMessage: null,
        notificationType: "is-info",

        logoSrc: null,
        selected: null,
    }),

    props: {
        title: {
            type: String,
            default: null,
        },

        inviteSessionListUrl: {
            type: String,
            default: "",
        },
        inviteSessionAllListUrl: {
            type: String,
            default: "",
        },
    },

    computed: {
        showNotification: (state) => state.notificationMessage != null,

        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],
        modeContent: (state) => state.formMode == state.FORM_MODE.CONTENT,
        modeUser: (state) => state.formMode == state.FORM_MODE.USER,
        modeSession: (state) => state.formMode == state.FORM_MODE.SESSION,
        modeAllSession: (state) => state.formMode == state.FORM_MODE.ALLSESSION,
        modeLoading: (state) => state.formMode == state.FORM_MODE.LOADING,
        modeShow: (state) => state.formMode == state.FORM_MODE.SHOW,
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
            const src = require("IMAGES/logo.png");
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
        onCommand(payload) {
            const data = payload.data || {};
            this.$refs.inviteSessionShow.loadInviteSessionData(data.row);
            this.changeFormMode(this.FORM_MODE.SHOW);
        },
    },
};
</script>
