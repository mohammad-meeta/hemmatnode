<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ userData.name }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نام و نام خانوادگی:
                            .info-card-value {{ userData.firstName }} {{ userData.lastName }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowUser",

    data: () => ({
        ENUMS,
        userData: {
            _id: null,
            name: null,
            email: null,
            firstName: null,
            lastName: null,
            nationCode: null,
            cellphone: null,
            roles: {},
            isActive: false
        },
        showLoadingFlag: false
    }),

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific user
         */
        loadUserData(data) {
            const temp = {
                _id: data._id,
                name: data.name,
                password: data.password,
                email: data.email,
                firstName: data.profile.first_name,
                lastName: data.profile.last_name,
                nationCode: data.profile.nation_code,
                cellphone: data.cellphone,
                roles: data.roles,
                isActive: data.is_active
            };
            console.log(temp);
            Vue.set(this, "userData", temp);
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, "showLoadingFlag", true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, "showLoadingFlag", false);
        },

    }
};
</script>
