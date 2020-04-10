<template lang="pug">
    .columns.is-vcentered
        .column.is-9.has-text-left(v-show="isLoadingMode")
            h1 Loading...
        .column.is-9.has-text-left(v-show="! isLoadingMode")
            .field
                label.label Username
                .control
                    input.input(type='text', placeholder='e.g. john doe', autofocus, v-model='userData.name')
                p.help New user name
            .field
                label.label Password
                .control
                    input.input(type='password', v-model='userData.password')
                p.help User password
        .column.is-2.is-offset-1(v-show="! isLoadingMode")
            a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                span Register
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    data: () => ({
        ENUMS,
        userData: {
            name: null,
            password: null
        },
        showLoadingFlag: false
    }),

<<<<<<< HEAD
    props: {
        registerUrl: {
            type: String,
            default: ''
        }
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true
    },

=======
>>>>>>> c75ff99f97f4c9c12fc23d1391bf9d24e02987b9
    methods: {
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
<<<<<<< HEAD
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerUser();
                    break;
            }
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, 'showLoadingFlag', true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, 'showLoadingFlag', false);
        },

        /**
         * Register new user
         */
        registerUser(){
            const isValid = this.validate();

            if (! isValid){
                return;
            }

            this.showLoading();

            const url = this.registerUrl;
            axios.post(url, this.userData)
                .then(res => {
                    const data = res.data;

                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new user data
         */
        validate(){
            /* Validate user data */
            return true;
=======
            this.$emit("on-command", arg);
>>>>>>> c75ff99f97f4c9c12fc23d1391bf9d24e02987b9
        }
    }
};
</script>

<style scoped>
</style>
