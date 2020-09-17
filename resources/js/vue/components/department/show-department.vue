<template lang="pug">
    .container
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .container.page-header
                .hero-dashboard
                    .field.is-grouped
                        .control(v-for='item in accessLink')
                            a.button.is-primary.is-rounded(:href="item.link") {{ item.text }}

            .info-card
                .info-card-title {{ departmentData.title }}
                .info-card-details
                    .info-card-item
                        p.info-card-value {{ departmentData.description }}

            .intro-cards.columns(v-if="hasContentProjects")
                .column.is-4
                    b-collapse.card(
                        animation="slide"
                        :open="false",
                        aria-id="contentIdForA11y3"
                    )
                        .card-header(
                            v-if="hasProject"
                            slot="trigger"
                            slot-scope="props"
                            role="button"
                            aria-controls="contentIdForA11y3"
                        )
                            p.card-header-title
                                | برنامه های {{ departmentData.title }}
                            a.card-header-icon
                                b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                        .intro-card-block(v-for='year in yearsProject')
                            a(:href="createLinkProject(year)")
                                | برنامه های سال {{ year }}

                    .intro-card
                        .intro-card-head
                            h2 پروژه ها
                        .intro-card-block(v-for='item in accessContentLink')
                            a(:href="item.link") {{ item.text }}
</template>
<script>
"use strict";

const Buefy = require("buefy").default;
const ENUMS = require("JS-HELPERS/enums");

module.exports = {
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
        props: {},

        showLoadingFlag: false,
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

    created() {
        this.loadLinkAccess(this.departmentId);
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
        loadDepartmentData(id) {
            id = id || this.departmentId;
            let url = this.loadUrl || this.showLoadUrl;
            url = url.replace(/\$department\$/g, id);

            AxiosHelper.send("get", url)
                .then((res) => {
                    const data = res.data.data.data;
                    Vue.set(this, "departmentData", data || {});
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error");
                });
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
        loadLinkAccess(id) {
            id = id || this.departmentId;
            let url = this.showLoadAccessLinkUrl;
            if (null != url) {
                url = url.replace(/\$department\$/g, id);

                AxiosHelper.send("get", url)
                    .then((res) => {
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
                                Vue.set(
                                    this,
                                    "accessContentLink",
                                    changeContentData
                                );
                                Vue.set(
                                    this,
                                    "hasProject",
                                    data[0].project_flag
                                );

                                if (this.hasProject) {
                                    AxiosHelper.send(
                                        "get",
                                        this.programGroupDateUrl
                                    ).then((res) => {
                                        if (res.data.success) {
                                            const dataPrjGr =
                                                res.data.data || [];
                                            if (data.length > 0) {
                                                const arrDataPrjGr = [];
                                                dataPrjGr.forEach((element) => {
                                                    arrDataPrjGr.push(
                                                        element._id
                                                    );
                                                });
                                                Vue.set(
                                                    this,
                                                    "yearsProject",
                                                    arrDataPrjGr
                                                );
                                            }
                                        }
                                    });
                                }
                            }
                        } else {
                            Vue.set(this, "accessLink", []);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        alert("Error");
                    });
            }
        },

        replaceChildInUrl(input, id) {
            const data = input;
            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                data[index].link = data[index].link.replace("#child#", id);
            }
            return data;
        },
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
