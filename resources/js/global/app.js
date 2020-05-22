'use strict';

/**
 * AppJS
 */
function AppJs() {}
module.exports = AppJs;

/**
 * Init
 */
AppJs.init = function init() {
    window.DateHelper = require('JS-HELPERS/date-helper');


};

AppJs.init();

window.dropdownToggle = function () {
    let element = document.getElementById("dropdown-toggler");
    element.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.drp')) {
        var dropdown = document.getElementById("dropdown-toggler");
            var openDropdown = dropdown;
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
        }
    }
}
