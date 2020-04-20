<template lang="pug">
    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading
        h2 hhhhhhhhhhhhhhhh
        .column(v-show="!modeLoading && modeList")
            user-list(ref="userList", @on-command="onCommand", list-url=listUrl)
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
const EditUser = require("VUE-COMPONENTS/user/edit-user.vue").default;

module.exports = {
    name: "UserList",

    components: {
        Loading,
        ListUser,
        RegisterUser,
        EditUser
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        users: []
    }),

    props: {
        listUrl: {
            type: String,
            default: null
        }
    },

    computed: {
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: state => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: state => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: state => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: state => state.formMode == ENUMS.FORM_MODE.EDIT
    },

    created() {
        this.init();
    },

    mounted() {
        this.$refs.listUser.loadUsers();
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

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW USER */
                    console.log("REGISTER NEW USER", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW USER */
                    console.log("EDIT USER", arg);
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
