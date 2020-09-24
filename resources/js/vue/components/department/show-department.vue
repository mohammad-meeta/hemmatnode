<template lang="pug">
.container
    .column.is-full(v-show="isLoadingMode")
        h1 در حال بارگذاری
    .column.is-full(v-show="! isLoadingMode")
        .container.page-header
            .hero-dashboard
                .field.is-grouped
                    .control(v-for="item in accessLink")
                        a.button.is-primary.is-rounded(:href="item.link") {{ item.text }}

        .info-card
            .info-card-title {{ departmentData.title }}

        .intro-cards.columns(v-if="hasContentProjects")
            .column.is-4
                b-collapse.card(
                    animation="slide",
                    :open="false",
                    aria-id="contentIdForA11y3"
                )
                    .card-header(
                        v-if="hasProject",
                        slot="trigger",
                        slot-scope="props",
                        role="button",
                        aria-controls="contentIdForA11y3"
                    )
                        p.card-header-title
                            | برنامه های {{ departmentData.title }}
                        a.card-header-icon
                            b-icon(
                                :icon="props.open ? 'menu-down' : 'menu-up'"
                            )
                    .intro-card-block(v-for="year in yearsProject")
                        a(:href="createLinkProject(year)")
                            | برنامه های سال {{ year }}
                .inline-card-body-item
                    a(:href="healthLink") پیوست سلامت
                .inline-card-body-item
                    a(:href="actionCreativeLink") اقدامات خلاق
                .inline-card-body-item
                    a(href="#") اقدامات متناظر شهرستان
            .column.is-4
                .intro-card
                    .intro-card-head
                        h2 پروژه ها
                    .intro-card-block(v-for="item in accessContentLink")
                        a(:href="item.link") {{ item.text }}
            .column.is-4
                .big-button
                    a(href="/document-list")
                        span.big-button-icon
                            i.fa.fa-book
                        span.big-button-text
                            | اسناد راهبردی مرتبط به حوزه سلامت
                .big-button
                    a(
                        href="#"
                        @click.prevent="isCardModalActive = true"
                    )
                        span.big-button-icon
                            i.fa.fa-info
                        span.big-button-text
                            | معرفی پیام گزار سلامت
                    b-modal.departments-modal(
                        :active.sync="isCardModalActive"
                    )
                        .info-card
                            .info-card-title {{ departmentData.title }}
                            .info-card-details
                                .info-card-item
                                    p.info-card-value {{ departmentData.description }}
                .big-button
                    a(href="#")
                        span.big-button-icon
                            i.fa.fa-bar-chart
                        span.big-button-text
                            | کارنامه دستگاه
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowDepartment",

    data: () => ({
        hasProject: false,
        yearsProject: [],
        ENUMS,
        departmentData: {
            _id: null,
            loadUrl: null,
            title: null,
            department_category_id: null,
            files: {},
            is_active: false,
        },

        accessLink: [],
        accessContentLink: [],
        isCardModalActive: false,
        props: {},

        showLoadingFlag: false,

        healthLink: "",
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },

        inviteSessionUrl: {
            type: String,
            default: null,
        },

        memorandumUrl: {
            type: String,
            default: null,
        },

        showLoadUrl: {
            type: String,
            default: null,
        },

        showLoadAccessLinkUrl: {
            type: String,
            default: null,
        },

        programGroupDateUrl: {
            type: String,
            default: null,
        },
        showPragramYearUrl: {
            type: String,
            default: null,
        },
    },

    /**
     * Created
     */
    created() {
        this.loadLinkAccess(this.departmentId);
        this.loadContentLinks(this.departmentId);
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
        hasContentProjects: (state) => state.accessContentLink.length > 0,
    },

    methods: {
        /**
         * create link for project
         */
        createLinkProject(year) {
            let url = "";
            url = this.showPragramYearUrl.replace(/\$year\$/g, year);
            return url;
        },

        /**
         * Load specific department
         */
        async loadDepartmentData(id) {
            id = id || this.departmentId;
            let url = this.loadUrl || this.showLoadUrl;
            url = url.replace(/\$department\$/g, id);

            try {
                let res = await AxiosHelper.send("get", url);

                const data = res.data.data.data;
                Vue.set(this, "departmentData", data || {});
            } catch (err) {
                alert("Error");
            }
            document.title = this.departmentData.title;
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, "showLoadingFlag", true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, "showLoadingFlag", false);
        },

        /**
         * load link access
         */
        async loadLinkAccess(id) {
            id = id || this.departmentId;
            let url = this.showLoadAccessLinkUrl;

            if (null == url) {
                return;
            }

            url = url.replace(/\$department\$/g, id);
            try {
                let res = await AxiosHelper.send("get", url);

                if (res.data.success) {
                    const data = res.data.data || [];
                    if (data.length > 0) {
                        const changeData = this.replaceChildInUrl(
                            data[0].text_link,
                            id
                        );

                        Vue.set(this, "accessLink", changeData);
                        const changeContentData = this.replaceDepartmentTypeInUrl(
                            data[0].access_content_link,
                            id
                        );

                        Vue.set(this, "accessContentLink", changeContentData);
                        Vue.set(this, "hasProject", data[0].project_flag);

                        if (this.hasProject) {
                            res = await AxiosHelper.send(
                                "get",
                                this.programGroupDateUrl
                            );

                            if (res.data.success) {
                                const dataPrjGr = res.data.data || [];

                                if (data.length > 0) {
                                    const arrDataPrjGr = [];
                                    dataPrjGr.forEach((element) => {
                                        arrDataPrjGr.push(element._id);
                                    });

                                    Vue.set(this, "yearsProject", arrDataPrjGr);
                                }
                            }
                        }
                    }
                } else {
                    Vue.set(this, "accessLink", []);
                }
            } catch (err) {
                alert("Error");
            }
        },

        /**
         * load content links
         */
        loadContentLinks(id) {
            id = id || this.departmentId;
            this.healthLink = "/health/" + id;
            this.actionCreativeLink = "/actioncreative/" + id;
        },

        /**
         * replaceChildInUrl
         */
        replaceChildInUrl(input, id) {
            const data = input;

            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                data[index].link = data[index].link.replace("#child#", id);
            }

            return data;
        },

        /**
         * ReplaceDepartmentTypeInUrl
         */
        replaceDepartmentTypeInUrl(input, id) {
            const data = input;

            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                data[index].link = data[index].link.replace("#department#", id);
            }

            return data;
        },
    },
};
</script>
