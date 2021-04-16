"use strict";

/**
 * ZoneIndexIndexPage class
 */
const ZoneIndexIndexPage = function() {};
module.exports = ZoneIndexIndexPage;

/**
 * Boot method
 */
ZoneIndexIndexPage.boot = function() {
  ZoneIndexIndexPage.initVue();
};

/**
 * Init vue
 */
ZoneIndexIndexPage.initVue = function() {
  const ZoneIndexs = require("VUE-COMPONENTS/zone-index/zone-indexs.vue").default;

  window.v = new Vue({
    el: "#app",

    components: {
      ZoneIndexs,
    },

  });
};

/* Boot */
ZoneIndexIndexPage.boot();
