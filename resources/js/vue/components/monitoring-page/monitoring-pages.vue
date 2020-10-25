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
                categorized-list(:value="montypes",  @on-command="onCommand")
            .container.main-content(v-show="modeShow")
                show-indicator(ref="indicatorShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const CategorizedList = require("VUE-COMPONENTS/monitoring-page/categorized-list.vue").default;
const ShowIndicator = require("VUE-COMPONENTS/indicator/show-indicator.vue").default;

export default {
    name: "MonitoringPage",

    components: {
        Loading,
        Notification,
        CategorizedList,
        ShowIndicator
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        notificationMessage: null,
        notificationType: "is-info",
        montypes: [],
        title: null
    }),

    props: {
        monitoringListUrl: {
            type: String,
            default: null,
        },
    },

    computed: {
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: state => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: state => state.formMode == ENUMS.FORM_MODE.LIST,
        modeShow: state => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: state => state.notificationMessage != null
    },

    created() {
        this.init();
        this.loadMonitorings()
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg, data) {
            this.onCommand(arg, data);
        },

        /**
         * On commands clicked
         */
        onCommand(argument) {
            let arg = 1;
            let data = argument;
            if(argument == 6 || argument == 5) {
                arg = argument;
            }
            else {
                arg = argument.arg || null;
                data = argument.data || {};
                if (null == arg) {
                    arg = 1;
                }
            }

            switch (arg) {
                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;
                case ENUMS.COMMAND.SHOW:
                    this.$refs.indicatorShow.loadIndicatorData(data);
                    Vue.set(this, "title", data.title);
                    this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                    break;
            }
        },

        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
        },

        /**
         * Load monitoring documnets
         */
        loadMonitorings() {
            let url = this.monitoringListUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "montypes", resData.data.data);
            });
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
