<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType",
                         @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")

            .container.page-header
                .title
                    h1 همکاری برون بخشی
            .container.main-content
                .intro-cards.columns
                    .column.is-4(v-for='departmentCategory in departmentCategories',
                                 :key='departmentCategory.id')
                        .intro-card
                            .intro-card-head
                                h2 {{ departmentCategory.title }}
                            .panel-block.is-active(v-for='dep in departmentCategory.department', :key='dep._id')
                                a(:href="getUrl(dep._id)") {{ dep.title }}


</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "ExternalSection",

    components: {
        Loading,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        departmentCategories: [],
        department: [],
        notificationMessage: null,
        notificationType: "is-info"
    }),

    props: {
        title: {
            type: String,
            default: null
        },

        departmentLinkUrl: {
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
        this.loadDepartmentCategories();
    },

    methods: {
        /**
         * Get url
         */
        getUrl(id) {
            const url = this.departmentLinkUrl.replace(/\$id\$/g, id);

            return url;
        },

        /**
         * Load departmentCategories
         */
        loadDepartmentCategories() {
            AxiosHelper.send("get", this.departmentCategoriesUrl, "").then(
                res => {
                    const resData = res.data;
                    Vue.set(this, "departmentCategories", resData.data.data);
                }
            );
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
