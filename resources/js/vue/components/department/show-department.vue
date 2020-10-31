<template lang="pug">
.container
    .column.is-full(v-show="isLoadingMode")
        h1 در حال بارگذاری
    .column.is-full(v-show="! isLoadingMode")
        .container.page-header
            .hero-dashboard
                .field.is-grouped
                    .control(v-for="item in accessLink" v-if="!isSAGShahrestan")
                        a.button.is-primary.is-rounded.is-small(:href="item.link" v-if="! (isShora && item.text == 'آئین نامه')") {{ item.text }}
                        a.button.is-primary.is-rounded.is-small(:href="item.link" v-if="isShora && item.text == 'آئین نامه'") شیوه نامه
                    .control(v-for="item in accessLink" v-if="isSAGShahrestan")
                        a.button.is-primary.is-rounded.is-small(:href="item.link" v-if="! (item.text == 'آئین نامه')") {{ item.text }}
        b-button.is-flex-direction-row-reverse(
            v-show="! modeDepartment"
            type="is-warning is-light"
            size="is-small"
            icon-right="chevron-right"
            @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
            )
                span بازگشت
        .info-card
            .info-card-title {{ departmentData.title }}
        .intro-cards.columns(
            v-if="hasContentProjects"
            v-show="!isLoadingMode && modeDepartment")
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
                .inline-card-body-item(v-if="! isPeopleNetwork")
                    a(:href="healthLink") پیوست سلامت
                .inline-card-body-item
                    a(:href="actionCreativeLink") اقدامات خلاق
                .inline-card-body-item
                    a(:href="cityActionLink") اقدامات متناظر شهرستان
            .column.is-4
                .intro-card
                    .intro-card-head
                        h2 پروژه ها
                    .intro-card-block(v-for="item in accessContentLink")
                        a(:href="item.link") {{ item.text }}
                .inline-card-body-item(v-if="isPeopleNetwork")
                    a(:href="educationLink")
                        | ‫‬برنامه آموزش سواد سلامت
                .inline-card-body-item(v-if="isPeopleNetwork")
                    a(:href="transportLink")
                        | انتقال مطالبات‫

            .column.is-4
                .big-button
                    a(
                        href="#",
                        @click.prevent="showDocuments"
                    )
                        span.big-button-icon
                            i.fa.fa-book
                        span.big-button-text(v-if="isPeopleNetwork")
                            | اسناد راهبردی شبکه
                        span.big-button-text(v-if="! isPeopleNetwork")
                            | اسناد راهبردی مرتبط به حوزه سلامت
                .big-button
                    a(
                        href="#"
                        @click.prevent="isCardModalActive = true"
                    )
                        span.big-button-icon
                            i.fa.fa-info
                        span.big-button-text(v-if="isPeopleNetwork")
                            | معرفی شبکه
                        span.big-button-text(v-if="! isPeopleNetwork")
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
                    a(
                        href="#"
                        @click.prevent="showReports"
                    )
                        span.big-button-icon
                            i.fa.fa-bar-chart
                        span.big-button-text(v-if="! isPeopleNetwork")
                            | کارنامه دستگاه
                        span.big-button-text(v-if="isPeopleNetwork")
                            | کارنامه شبکه

        department-document(
            ref="documentList",
            @on-command="onCommand",
            :document-list-url="DocumentListUrl",
            :department-id="departmentId",
            v-show="!isLoadingMode && modeDocument"
        )
        .container.main-content(v-show="modeShow")
            show-document(ref="documentShow", @on-command="onCommand")

        department-report(
            ref="reportList",
            @on-command="onCommand",
            :report-list-url="ReportListUrl",
            :department-id="departmentId",
            v-show="!isLoadingMode && modeReport"
        )
    img(:src="imageAddress")

</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const ENUMS = require("JS-HELPERS/enums");
const DepartmentDocument = require("VUE-COMPONENTS/document/department-document.vue")
    .default;
const DepartmentReport = require("VUE-COMPONENTS/report/department-report.vue")
    .default;
const ShowDocument = require("VUE-COMPONENTS/document/show-document.vue")
    .default;

export default {
    name: "ShowDepartment",

    components: {
        DepartmentDocument,
        DepartmentReport,
        ShowDocument,
    },
    data: () => ({
        imageAddress: null,
        userData: {},
        hasProject: false,
        yearsProject: [],
        ENUMS,
        formModeStack: [],
        departmentData: {
            _id: null,
            loadUrl: null,
            title: null,
            department_category_id: null,
            references: null,
            files: {},
            is_active: false,
        },

        referencesData: {},

        accessLink: [],
        accessContentLink: [],
        isCardModalActive: false,
        props: {},

        showLoadingFlag: false,

        healthLink: "",
        educationLink: "",
        transportLink: "",
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

        DocumentListUrl: {
            type: String,
            default: null,
        },

        ReportListUrl: {
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
        loadUserUrl: {
            type: String,
            default: null,
        },

        getImageUrl: {
            type: String,
            default: "",
        },
    },

    /**
     * Created
     */
    created() {
        this.loadLinkAccess(this.departmentId);
        this.loadContentLinks(this.departmentId);
        this.loadUserData();
    },

    /**
     * Mounted
     */
    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.DEPARTMENT);
    },

    watch: {
        imageAddress(newValue) {
            return newValue;
        },
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
        hasContentProjects: (state) => state.accessContentLink.length > 0,
        isPeopleNetwork: (state) =>
            (state.departmentData || {}).references ==
            "5ed3c62c4e9b0630692c3a7f",
        isShora: (state) =>
            (state.departmentData || {})._id == "5ed466b696259b1a49c7a49b",
        isSAGShahrestan: (state) =>
            (state.departmentData || {}).references == "5ed4672f96259b1a49c7a4a1",
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],
        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: (state) => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: (state) => state.formMode == ENUMS.FORM_MODE.EDIT,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        modeDocument: (state) => state.formMode == ENUMS.FORM_MODE.DOCUMENT,
        modeReport: (state) => state.formMode == ENUMS.FORM_MODE.REPORT,
        modeDepartment: (state) => state.formMode == ENUMS.FORM_MODE.DEPARTMENT,
    },

    methods: {
        /**
         * load user data
         */
        async loadUserData() {
            let url = this.loadUserUrl;

            try {
                let res = await AxiosHelper.send("get", url);

                const data = res.data.data[0];
                Vue.set(this, "userData", data);

                let url2 = this.getImageUrl.replace(
                    /\$IMAGE\$/g,
                    data.profile.image
                );

                // let res2 = await AxiosHelper.send("get", url2);

                Vue.set(this, "imageAddress", url2);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * create link for project
         */
        createLinkProject(year) {
            let url = "";
            url = this.showPragramYearUrl.replace(/\$year\$/g, year);
            return url;
        },

        /**
         * On commands clicked
         */
        onCommand(payload) {
            let arg = payload.arg || null;
            const data = payload.data || {};
            if (null == arg) {
                arg = payload;
            }
            switch (arg) {
                case ENUMS.COMMAND.NEW:
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW  */
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW Department */
                    this.$refs.departmentEdit.loadDepartmentData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.documentShow.loadDocumentData(data);
                    Vue.set(this, "title", payload.title);
                    this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                    break;
            }
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            this.onCommand(arg);
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
            this.loadReferencesDepartmentData(this.departmentData.references);
        },

        /**
         * Load References department
         */
        async loadReferencesDepartmentData(id) {
            id = id || this.departmentId;
            let url = this.loadUrl || this.showLoadUrl;
            url = url.replace(/\$department\$/g, id);

            try {
                let res = await AxiosHelper.send("get", url);

                const data = res.data.data.data;
                Vue.set(this, "referencesData", data || {});
            } catch (err) {
                alert("Error");
            }
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
            this.cityActionLink = "/cityaction/" + id;
            this.documentLink = "/document/" + id;
            this.educationLink = "/education/" + id;
            this.transportLink = "/transport/" + id;
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

        showDocuments() {
            this.changeFormMode(this.ENUMS.FORM_MODE.DOCUMENT);
            this.$refs.documentList.loadDocuments(1);
        },

        showReports() {
            this.changeFormMode(this.ENUMS.FORM_MODE.REPORT);
            this.$refs.reportList.loadReports(1);
        },
    },
};
</script>
