"use strict";

/**
 * ActionScoreIndexPage class
 */
const ActionScoreIndexPage = function() {};
module.exports = ActionScoreIndexPage;

/**
 * Boot method
 */
ActionScoreIndexPage.boot = function() {
  ActionScoreIndexPage.initVue();
};

/**
 * Init vue
 */
ActionScoreIndexPage.initVue = function() {
  const ActionScores = require("VUE-COMPONENTS/action-score/action-scores.vue").default;

  window.v = new Vue({
    el: "#app",

    components: {
      ActionScores,
    },

  });
};

/* Boot */
ActionScoreIndexPage.boot();
