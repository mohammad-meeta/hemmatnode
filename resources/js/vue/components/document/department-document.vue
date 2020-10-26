<template lang="pug">
.container-child
    .container.page-header
        .title(v-show="! modeShow")
            h1 اسناد راهبردی
        .title(v-if="modeShow")
            h1 {{ title }}
        .hero-dashboard
            .field.is-grouped
                //- b-button.is-flex-direction-row-reverse(
                //-     v-show="! modeDocument"
                //-     type="is-warning is-light"
                //-     size="is-small"
                //-     icon-right="chevron-right"
                //-     @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
                //-     )
                //-         span بازگشت
    h1(v-if="!hasDocument") هیچ اسناد راهبردی ایجاد نشده
    .container.main-content(v-show="! modeShow")
        .intro-cards.columns
            .intro-card.column.is-12
                .panel-block.is-active.is-justified-between(
                    v-for="doc in documents",
                    :key="doc._id"
                )
                    .level-right
                        a.level-item(
                            href="#"
                            @click.prevent="commandClick(ENUMS.COMMAND.SHOW, doc)"
                        ) {{ doc.title }}
                    .level-left
                        .level-item
                            | {{ toPersianDate(doc.date) }}
    //- .container.main-content(v-show="modeShow")
    //-     show-document(ref="documentShow", @on-command="onCommand")

</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const ENUMS = require("JS-HELPERS/enums");
const Routes = require("JS-CORE/routes");
const ShowDocument = require("VUE-COMPONENTS/document/show-document.vue").default;

export default {
    name: "DepartmentDocument",

    components: {
        ShowDocument
    },
    props: {
        DocumentListUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        documents: [],
    }),

    /**
     * Created
     */
    created() {
        //this.changeFormMode(this.ENUMS.FORM_MODE.DOCUMENT);
    },

    computed: {
        hasDocument: (state) => (state.documents || []).length,
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        modeDocument: state => state.formMode == ENUMS.FORM_MODE.DOCUMENT,
        modeDepartment: state => state.formMode == ENUMS.FORM_MODE.DEPARTMENT,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load documents
         */
        loadDocuments(pageId) {
            let url = this.DocumentListUrl
                            .replace(/\$page\$/g, pageId)
                            .replace(/\$pageSize\$/g, 1000);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "documents", resData.data.data);
            });
        },

        /**
         * On commands clicked
         */
        onCommand(argument, payload) {
            let arg = argument || null;
            const data = payload || {};
            if (null == arg) {
                arg = 1;
            }
            switch (arg) {
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
        commandClick(arg, data) {
            //this.$emit("onCommand",{arg, data});
            this.$emit("on-command", { arg, data });
        },

        /**
         * Change form mode
         */
        changeFormMode(mode, options) {
            console.log(mode);
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
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateShort(date);
        },
    },
};
</script>
