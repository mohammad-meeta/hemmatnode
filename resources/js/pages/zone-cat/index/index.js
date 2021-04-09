"use strict";

/**
 * ZoneCatIndexPage class
 */
const ZoneCatIndexPage = function() {};
module.exports = ZoneCatIndexPage;

/**
 * Boot method
 */
ZoneCatIndexPage.boot = function() {
  ZoneCatIndexPage.initVue();
};

/**
 * Init vue
 */
ZoneCatIndexPage.initVue = function() {
  const ZoneCats = require("VUE-COMPONENTS/zone-cat/zone-cats.vue").default;

  window.v = new Vue({
    el: "#app",

    components: {
      ZoneCats,
    },

  });
};

/* Boot */
ZoneCatIndexPage.boot();
