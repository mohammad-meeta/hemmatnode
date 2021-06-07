"use strict";

/**
 * ZoneScoreIndexPage class
 */
const ZoneScoreIndexPage = function() {};
module.exports = ZoneScoreIndexPage;

/**
 * Boot method
 */
ZoneScoreIndexPage.boot = function() {
  ZoneScoreIndexPage.initVue();
};

/**
 * Init vue
 */
ZoneScoreIndexPage.initVue = function() {
  const ZoneScoreReport = require("VUE-COMPONENTS/zone-score/zone-score-report.vue").default;

  window.v = new Vue({
    el: "#app",

    components: {
      ZoneScoreReport,
    },
  });
};

/* Boot */
ZoneScoreIndexPage.boot();
