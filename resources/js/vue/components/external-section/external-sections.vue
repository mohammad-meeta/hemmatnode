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
                h1 همکاری برون بخشی
        .container.main-content
            .columns
                .inline-cards.column
                    .inline-card.w-100(
                        v-for="departmentCategory in departmentCategories",
                        :key="departmentCategory.id"
                    )
                        .inline-card-head
                            h2 {{ departmentCategory.title }}
                        .inline-card-body
                            .inline-card-body-item(
                                v-for="dep in departmentCategory.department",
                                :key="dep._id"
                            )
                                div(v-if="!hasChildren(dep)")
                                    a(:href="getUrl(dep._id)") {{ dep.title }}
                                div(v-if="hasChildren(dep)")
                                    a(@click="showModal(dep)")
                                        | {{ dep.title }}
                                    b-modal.departments-modal(
                                        :active.sync="isModalActive"
                                    )
                                        .childrens(
                                            v-for="child in departmentChild"
                                        )
                                            a(:href="getUrl(child._id)") {{ child.title }}
                                    //b-collapse(:open='false', aria-id='contentIdForA11y1')
                                        a(slot='trigger', aria-controls='contentIdForA11y1') {{ dep.title }}
                                        .notification
                                            .content
                                                .childrens(v-for='child in dep.child')
                                                    a(:href="getUrl(child._id)") {{ child.title }}
                .section-background.column
                    img(:src="require('IMAGES/sib.jpg')")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const Buefy = require("buefy").default;

export default {
    name: "ExternalSection",

    components: {
        Loading,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        departmentCategories: [],
        department: [],
        notificationMessage: null,
        notificationType: "is-info",
        isModalActive: false,
        departmentChild: [],
    }),

    props: {
        title: {
            type: String,
            default: null,
        },

        departmentLinkUrl: {
            type: String,
            default: null,
        },

        departmentCategoriesUrl: {
            type: String,
            default: null,
        },
    },

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],
        hasChild: (state) => state.data.department.child.length > 0,
        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        showNotification: (state) => state.notificationMessage != null,
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
         * set department link behavior
         */
        hasChildren(dep) {
            return dep.child.length > 0;
        },

        showModal(dep) {
            if (dep.child.length > 0) {
                Vue.set(this, "departmentChild", dep.child);
                this.isModalActive = true;
            }
        },

        /**
         * Load departmentCategories
         */
        loadDepartmentCategories() {
            AxiosHelper.send("get", this.departmentCategoriesUrl, "").then(
                (res) => {
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
