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
  const ZoneScores = require("VUE-COMPONENTS/zone-score/zone-scores.vue").default;

  window.v = new Vue({
    el: "#app",

    components: {
      ZoneScores,
    },

  });
};

/* Boot */
ZoneScoreIndexPage.boot();
