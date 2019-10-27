'use strict'

const path = require('path');
const mix = require('laravel-mix');

require(path.resolve('core/modules/global-module.js')).setup();
const appConfig = use('config/app.js');
const output = appConfig.output_path;

/* Setup */
mix.setPublicPath(output)
    .version();

/* JS */
mix.js('resources/js/index.js', `${output}/js`);

/* SASS */
mix.sass('resources/sass/index.scss', `${output}/css`);
