<template lang="pug">
.container-parent()
    section.hero
        notification(
            :notification-type="notificationType",
            @on-close="closeNotification",
            v-if="showNotification"
        )
            span(v-html="notificationMessage")
        .container.page-header
            .title
                h1(v-show="modeList") اخبار
                h1(v-show="modeRegister") ایجاد اخبار

    .columns.exposed-form(v-show="!modeLoading")
        .column.is-one-fifth(v-show="modeList")
            a.button.is-primary.is-rounded.is-small(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)"
            )
                span.icon.is-small
                    i.material-icons.icon add
                span ایجاد

        .column.is-one-fifth(v-show="!modeList")
            b-button.is-flex-direction-row-reverse(
                type="is-warning is-light"
                size="is-small"
                icon-right="chevron-right"
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
                )
                    span بازگشت

    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading

        .column(v-show="!modeLoading && modeList")
            list-blog(
                ref="blogList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-blog(
                ref="blogRegister",
                @on-command="onCommand",
                @on-register="onBlogRegister",
                :register-url="registerUrl",
                :blog-type-url="blogTypesUrl",
                :upload-url-image="uploadUrlImage",
                :upload-url-token="uploadUrlToken",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-blog(
                ref="blogEdit",
                @on-command="onCommand",
                @on-update="onBlogUpdate",
                :edit-url="editUrl",
                :blog-type-url="blogTypesUrl",
                :department-id="departmentId",
                :upload-url-image="uploadUrlImage",
                :upload-url-token="uploadUrlToken",
            )

        .column(v-show="!modeLoading && modeShow")
            show-blog(ref="blogShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterBlog = require("VUE-COMPONENTS/blog/register-blog.vue").default;
const EditBlog = require("VUE-COMPONENTS/blog/edit-blog.vue").default;
const ListBlog = require("VUE-COMPONENTS/blog/list-blog.vue").default;
const ShowBlog = require("VUE-COMPONENTS/blog/show-blog.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Blogs",

    components: {
        Loading,
        ListBlog,
        RegisterBlog,
        EditBlog,
        ShowBlog,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        blogs: [],
        notificationMessage: null,
        notificationType: "is-info",
        flagEdit: false,
    }),

    props: {
        uploadUrlImage: {
            type: String,
        },
        uploadUrlToken: {
            type: String,
        },
        departmentId: {
            type: String,
            default: null,
        },

        title: {
            type: String,
            default: null,
        },

        listUrl: {
            type: String,
            default: null,
        },
        showBlogYearUrl: {
            type: String,
            default: null,
        },

        registerUrl: {
            type: String,
            default: null,
        },

        editUrl: {
            type: String,
            default: null,
        },
        blogTypesUrl: {
            type: String,
            default: null,
        },
    },

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: (state) => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: (state) => state.formMode == ENUMS.FORM_MODE.EDIT,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: (state) => state.notificationMessage != null,
    },

    /**
     * Mounted
     */
    mounted() {
        this.init();
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {
        /**
         * On Register blog
         */
        onBlogRegister(payload) {
            //***update vue list****
            this.$refs.blogList.addToBlogList(payload.data.data.data[0]);
            this.setNotification(".اخبار با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onBlogUpdate(payload) {
            this.$refs.blogList.editBlogList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".جلسه با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW Blog", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    Vue.set(this, "flagEdit", true);
                    /* TODO: Edit InviteSession */
                    this.$refs.blogEdit.loadBlogData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.blogShow.loadBlogData(data);
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
         * Init method
         */
        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
            this.$refs.blogList.loadBlogs(1);
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
