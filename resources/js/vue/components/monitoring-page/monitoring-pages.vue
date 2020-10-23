<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType",
                         @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title(v-show="! modeShow")
                    h1 دیدبانی سلامت
                .title(v-if="modeShow")
                    h1 {{ title }}
                categorized-list(:value="montypes")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const CategorizedList = require("VUE-COMPONENTS/monitoring-page/categorized-list.vue").default;

export default {
    name: "MonitoringPage",

    components: {
        Loading,
        Notification,
        CategorizedList
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        montypes:[
            {
                title: "کلان",
                indexs: [
                    {
                        title: "سرمایه اجتماعی",
                    },
                    {
                        title: "شادکامی",
                    },
                    {
                        title: "امید به زندگی در بدو تولد",
                    },
                ]
            },
            {
                title: "حمایت اجتماعی",
                indexs: [
                    {
                        title: "خانوارهای تحت پوشش کمیته امداد",
                    },
                    {
                        title: "خانوارهای تحت پوشش بهزیستی (مستمری بگیر)",
                    },
                    {
                        title: "خانوارهای تحت پوشش کمیته امداد",
                    },
                    {
                        title: "پوشش بیمه با احتساب مستمری بگیران",
                    },
                    {
                        title: "خانوارهای تحت پوشش بهزیستی (مستمری بگیر)",
                    },
                    {
                        title: "پوشش بیمه با احتساب مستمری بگیران",
                    },
                ]
            },
            {
                title: "حمایت اجتماعی",
                indexs: [
                    {
                        title: "خانوارهای تحت پوشش کمیته امداد",
                    },
                    {
                        title: "خانوارهای تحت پوشش بهزیستی (مستمری بگیر)",
                    },
                    {
                        title: "خانوارهای تحت پوشش کمیته امداد",
                    },
                    {
                        title: "پوشش بیمه با احتساب مستمری بگیران",
                    },
                    {
                        title: "خانوارهای تحت پوشش بهزیستی (مستمری بگیر)",
                    },
                    {
                        title: "پوشش بیمه با احتساب مستمری بگیران",
                    },
                ]
            }
        ],
        notificationMessage: null,
        notificationType: "is-info"
    }),

    props: {
        title: {
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
    },

    methods: {

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
