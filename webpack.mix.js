'use strict'

const path = require('path');
const mix = require('laravel-mix');
require('laravel-mix-alias');

require(path.resolve('core/modules/global-module.js')).setup();
const appConfig = use('config/app.js');
const output = appConfig.output_path;

/* Aliases */
mix.alias({
    'JS': 'resources/js',
    'JS-CORE': 'resources/js/core',
    'JS-HELPERS': 'resources/js/helpers',
    'JS-VALIDATORS': 'resources/js/validators',
    'VUE': 'resources/js/vue',
    'VUE-COMPONENTS': 'resources/js/vue/components',
    'VUE-HELPERS': 'resources/js/vue/helpers',
    'SASS': 'resources/sass',
    'FONTS': 'resources/fonts',
    'IMAGES': 'resources/images',
    'VIEWS': 'resources/views',
    'CONFIGS': 'resources/configs',
    'VALIDATORS': 'validators'
});

/**
 *  Webpack config
 */
mix.webpackConfig({
    module: {
        rules: [{
                test: /\.pug$/i,
                oneOf: [{
                        resourceQuery: /^\?vue/i,
                        use: ['pug-plain-loader']
                    },
                    {
                        use: [
                            'raw-loader',
                            'pug-plain-loader'
                        ]
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    }
});

/* Setup */
mix.setPublicPath(output)
    .version();

/* Copy Files & Directories */
mix.copyDirectory('resources/images', `${output}/images`)
    .copyDirectory('resources/fonts', `${output}/fonts`);

/* JS */
mix.js('resources/js/core/kernel.js', `${output}/js/core`)
    .js('resources/js/global/app.js', `${output}/js/global`)
    .js('resources/js/pages/factory.js', `${output}/js/pages`)

    .js('resources/js/pages/department-category/index/index.js', `${output}/js/pages/department-category/index`)
    .js('resources/js/pages/department/index/index.js', `${output}/js/pages/department/index`)
    .js('resources/js/pages/invite-session/index/index.js', `${output}/js/pages/invite-session/index`)
    .js('resources/js/pages/home/internal-section/index.js', `${output}/js/pages/home/internal-section`)
    .js('resources/js/pages/project/index/index.js', `${output}/js/pages/project/index`)
    .js('resources/js/pages/result/index/index.js', `${output}/js/pages/result/index`)
    .js('resources/js/pages/task/index/index.js', `${output}/js/pages/task/index`)

    .js('resources/js/pages/auth/login/index.js', `${output}/js/pages/auth/login`)
    .js('resources/js/pages/user/index/index.js', `${output}/js/pages/user/index`);

/* SASS */
mix.sass('resources/sass/core/kernel.scss', `${output}/css/core`)
    .sass('resources/sass/global/app.scss' , `${output}/css/global`)
    .sass('resources/sass/pages/home/index.scss', `${output}/css/pages/home`)
    .sass('resources/sass/pages/auth/login.scss', `${output}/css/pages/auth`);
