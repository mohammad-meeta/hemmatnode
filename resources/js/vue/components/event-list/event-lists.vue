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
            .title(v-show="! modeShow")
                h1 رویدادها
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
            .columns.is-multiline
                .column.is-4(v-for="blog in blogs", :key="blog.id")
                    .card
                        .card-content
                            .content
                                .info-card-title {{ blog.title }}
                                time(datetime="blog.date") {{ toPersianDate(blog.date) }}
                        footer.card-footer
                            .card-footer-item
                                b-button.is-flex-direction-row-reverse(
                                    type="is-link is-light"
                                    size="is-small"
                                    icon-left="chevron-left"
                                    @click.prevent="commandClick(ENUMS.COMMAND.SHOW, blog)"
                                    )
                                        span مشاهده

            b-pagination(
                :total="pagination.total",
                :current.sync="pagination.current",
                :range-before="pagination.rangeBefore",
                :range-after="pagination.rangeAfter",
                :order="pagination.order",
                :size="pagination.size",
                :simple="pagination.isSimple",
                :rounded="pagination.isRounded",
                :per-page="pagination.perPage",
                :icon-prev="pagination.prevIcon",
                :icon-next="pagination.nextIcon",
                aria-next-label="Next page",
                aria-previous-label="Previous page",
                aria-page-label="Page",
                aria-current-label="Current page",
                @change="loadBlogs(pagination.current)"
            )
        .container.main-content(v-show="modeShow")
            show-blog(ref="blogShow", @on-command="onCommand")


</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const ShowBlog = require("VUE-COMPONENTS/blog/show-blog.vue").default;

export default {
    name: "EventList",

    components: {
        Loading,
        Notification,
        ShowBlog
    },

    props: {
        blogListUrl: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        ENUMS,
        pagination: {
            total: 0,
            current: 1,
            perPage: 50,
            rangeBefore: 3,
            rangeAfter: 1,
            order: "",
            size: "",
            isSimple: false,
            isRounded: false,
            prevIcon: "chevron-left",
            nextIcon: "chevron-right",
        },
        formModeStack: [],
        notificationMessage: null,
        notificationType: "is-info",
        blogs: [],
        blogsCount: null,
        title: null,
    }),

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: (state) => state.notificationMessage != null,
    },

    /**
     * Created
     */
    created() {
        this.init();
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {

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
                    this.$refs.blogShow.loadBlogData(data)
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
            this.onCommand(arg, data);
        },
        /**
         * Init
         */
        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
            this.loadBlogs(1);
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
         * Load blogs
         */
        loadBlogs(pageId) {
            let url = this.blogListUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 1000);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "blogs", resData.data.data);
                Vue.set(this, "blogsCount", resData.data.count);
                Vue.set(this.pagination, "total", resData.data.count);
            });
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
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateLong(date);
        },

        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadBlogs(id);
        },
    },
};
</script>
