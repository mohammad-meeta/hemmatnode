'use strict'

const path = require('path');
const mix = require('laravel-mix');
require('laravel-mix-alias');

require(path.resolve('core/modules/global-module.js')).setup();
const appConfig = use('config/app.js');
const output = appConfig.output_path;

/* Aliases */
mix.alias({
    'VUE-COMPONENTS': 'resources/js/vue/components',
    'JS': 'resources/js',
    'JS-HELPERS': 'resources/js/helpers',
    'SASS': 'resources/sass',
    'FONTS': 'resources/fonts',
    'IMAGES': 'resources/images',
    'VIEWS': 'resources/views'
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
        }]
    }
});

/* Setup */
mix.setPublicPath(output)
    .version();

/* Copy Files & Directories */
mix.copyDirectory('resources/images', `${output}/images`);

/* JS */
mix.js('resources/js/core/kernel.js', `${output}/js/core`)
    .js('resources/js/pages/auth/login/index.js', `${output}/js/pages/auth/login`)
    .js('resources/js/pages/user/index/index.js', `${output}/js/pages/user/index`);

/* SASS */
mix.sass('resources/sass/core/kernel.scss', `${output}/css/core`)
    .sass('resources/sass/pages/home/index.scss', `${output}/css/pages/home`)
    .sass('resources/sass/pages/auth/login.scss', `${output}/css/pages/auth`);
