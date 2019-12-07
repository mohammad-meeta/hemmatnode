<template lang="pug">
    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading
        .column(v-show="!modeLoading && modeList")
            list-user(:users="users", @on-command="onCommand")
        .column(v-show="!modeLoading && modeRegister")
            register-user(@on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterUser = require("VUE-COMPONENTS/user/register-user.vue").default;
const ListUser = require("VUE-COMPONENTS/user/list-user.vue").default;

module.exports = {
    name: "UserList",

    components: {
        Loading,
        ListUser,
        RegisterUser
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        users: []
    }),

    computed: {
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: state => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: state => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: state => state.formMode == ENUMS.FORM_MODE.REGISTER
    },

    created() {
        this.init();
    },

    methods: {
        /**
         * Load users list
         */
        loadUsers() {
            return new Promise((resolve, reject) => {
                const UserHelper = require("VUE-HELPERS/user-helper");

                UserHelper.loadUsers()
                    .then(res => {
                        const data = res.data.data;

                        Vue.set(this, "users", data.users);

                        resolve(res);
                    })
                    .catch(err => reject(err));
            });
        },

        /**
         * On commands clicked
         */
        onCommand(arg) {
            switch (arg) {
                case ENUMS.COMMAND.NEW:
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;
            }
        },

        /**
         * Init method
         */
        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
            this.loadUsers().then(res => {
                this.changeFormMode(ENUMS.FORM_MODE.LIST);
            });
        },

        /**
         * Change form mode
         */
        changeFormMode(mode, options) {
            const opts = Object.assign(
                {
                    pop: false
                },
                options
            );

            if (opts.pop) {
                if (this.formModeStack.length > 0) {
                    Vue.delete(
                        this.formModeStack,
                        this.formModeStack.length - 1
                    );
                }
            } else {
                Vue.set(this.formModeStack, this.formModeStack.length, mode);
            }
        }
    }
};
</script>

<style scoped>
</style>
