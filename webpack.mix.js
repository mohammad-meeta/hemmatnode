"use strict";

const path = require("path");
const mix = require("laravel-mix");
require("laravel-mix-alias");

require(path.resolve("core/modules/global-module.js")).setup();
const appConfig = use("config/app.js");
const output = appConfig.output_path;

/* Aliases */
mix.alias({
    JS: "resources/js",
    "JS-CORE": "resources/js/core",
    "JS-HELPERS": "resources/js/helpers",
    "JS-VALIDATORS": "resources/js/validators",
    VUE: "resources/js/vue",
    "VUE-COMPONENTS": "resources/js/vue/components",
    "VUE-HELPERS": "resources/js/vue/helpers",
    SASS: "resources/sass",
    FONTS: "resources/fonts",
    IMAGES: "resources/images",
    VIEWS: "resources/views",
    CONFIGS: "resources/configs",
    VALIDATORS: "validators",
});

/**
 *  Webpack config
 */
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.pug$/i,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/i,
                        use: ["pug-plain-loader"],
                    },
                    {
                        use: ["raw-loader", "pug-plain-loader"],
                    },
                ],
            },
            {
                test: /\.pug$/,
                loader: "pug-plain-loader",
            },
        ],
    },
});

/* Setup */
mix.setPublicPath(output).version();

/* Copy Files & Directories */
mix.copyDirectory("resources/images", `${output}/images`).copyDirectory(
    "resources/fonts",
    `${output}/fonts`
);

/* JS */
mix.js("resources/js/core/kernel.js", `${output}/js/core`)
    .js("resources/js/global/app.js", `${output}/js/global`)
    .js("resources/js/pages/factory.js", `${output}/js/pages`)

    .js(
        "resources/js/pages/head/index/index.js",
        `${output}/js/pages/head/index`
    )
    .js(
        "resources/js/pages/department-category/index/index.js",
        `${output}/js/pages/department-category/index`
    )
    .js(
        "resources/js/pages/department/index/index.js",
        `${output}/js/pages/department/index`
    )
    .js(
        "resources/js/pages/department/show/index.js",
        `${output}/js/pages/department/show`
    )
    .js(
        "resources/js/pages/invite-session/index/index.js",
        `${output}/js/pages/invite-session/index`
    )
    .js(
        "resources/js/pages/memorandum/index/index.js",
        `${output}/js/pages/memorandum/index`
    )
    .js(
        "resources/js/pages/regulation/index/index.js",
        `${output}/js/pages/regulation/index`
    )
    .js(
        "resources/js/pages/home/internal-section/index.js",
        `${output}/js/pages/home/internal-section`
    )
    .js(
        "resources/js/pages/home/external-section/index.js",
        `${output}/js/pages/home/external-section`
    )
    .js(
        "resources/js/pages/home/people-participation/index.js",
        `${output}/js/pages/home/people-participation`
    )
    .js(
        "resources/js/pages/dashboard/index/index.js",
        `${output}/js/pages/dashboard/index`
    )
    .js(
        "resources/js/pages/karnameindex/index/index.js",
        `${output}/js/pages/karnameindex/index`
    )
    .js(
        "resources/js/pages/project/index/index.js",
        `${output}/js/pages/project/index`
    )
    .js(
        "resources/js/pages/program/index/index.js",
        `${output}/js/pages/program/index`
    )
    .js(
        "resources/js/pages/health/index/index.js",
        `${output}/js/pages/health/index`
    )
    .js(
        "resources/js/pages/report/index/index.js",
        `${output}/js/pages/report/index`
    )
    .js(
        "resources/js/pages/admin/createpermission/index/index.js",
        `${output}/js/pages/admin/createpermission/index`
    )
    .js(
        "resources/js/pages/blog/index/index.js",
        `${output}/js/pages/blog/index`
    )
    .js(
        "resources/js/pages/projecttafahom/index/index.js",
        `${output}/js/pages/projecttafahom/index`
    )
    .js(
        "resources/js/pages/transport/index/index.js",
        `${output}/js/pages/transport/index`
    )
    .js(
        "resources/js/pages/education/index/index.js",
        `${output}/js/pages/education/index`
    )
    .js(
        "resources/js/pages/power/index/index.js",
        `${output}/js/pages/power/index`
    )
    .js(
        "resources/js/pages/monitoring-type/index/index.js",
        `${output}/js/pages/monitoring-type/index`
    )
    .js(
        "resources/js/pages/monitoring/index/index.js",
        `${output}/js/pages/monitoring/index`
    )
    .js(
        "resources/js/pages/indicator/index/index.js",
        `${output}/js/pages/indicator/index`
    )
    .js(
        "resources/js/pages/blogtype/index/index.js",
        `${output}/js/pages/blogtype/index`
    )
    .js(
        "resources/js/pages/document/index/index.js",
        `${output}/js/pages/document/index`
    )
    .js(
        "resources/js/pages/action-creative/index/index.js",
        `${output}/js/pages/action-creative/index`
    )
    .js(
        "resources/js/pages/city-action/index/index.js",
        `${output}/js/pages/city-action/index`
    )
    .js(
        "resources/js/pages/request/index/index.js",
        `${output}/js/pages/request/index`
    )
    .js(
        "resources/js/pages/response/index/index.js",
        `${output}/js/pages/response/index`
    )
    .js(
        "resources/js/pages/result/index/index.js",
        `${output}/js/pages/result/index`
    )
    .js(
        "resources/js/pages/task/index/index.js",
        `${output}/js/pages/task/index`
    )
    .js(
        "resources/js/pages/auth/login/index.js",
        `${output}/js/pages/auth/login`
    )
    .js(
        "resources/js/pages/user/index/index.js",
        `${output}/js/pages/user/index`
    )
    .js(
        "resources/js/pages/home/event-list/index.js",
        `${output}/js/pages/home/event-list`
    )
    .js(
        "resources/js/pages/home/monitoring-page/index.js",
        `${output}/js/pages/home/monitoring-page`
    )
    .js(
        "resources/js/pages/home/document-list/index.js",
        `${output}/js/pages/home/document-list`
    );

/* SASS */
mix.sass("resources/sass/core/kernel.scss", `${output}/css/core`)
    .sass("resources/sass/global/app.scss", `${output}/css/global`)
    .sass("resources/sass/pages/home/index.scss", `${output}/css/pages/home`)
    .sass("resources/sass/pages/auth/login.scss", `${output}/css/pages/auth`);

// /* Copy directory */
// mix.copyDirectory(
//     "resources/js/ckeditor4/ckeditor",
//     "public/js/ckeditor"
// );
