<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full.form-small(v-show="! isLoadingMode")
                .field
                    label.label نام کاربری
                    div {{ userData.name }}
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
            password: null,
            email: null,
            firstName: null,
            lastName: null,
            nationCode: null,
            cellphone: null,
            roles: {},
            isActive: false
        },
        showLoadingFlag: false,
    }),


};

</script>
