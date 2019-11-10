<template>
    <div class="column">
        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email | capitalize }}</td>
                </tr>
            </tbody>

            <!-- <tfoot>
                <tr>
                    <th></th>
                    <th>
                        <abbr title="Available commands">CMD</abbr>
                    </th>
                </tr>
            </tfoot> -->
        </table>
    </div>
</template>

<script>
"use strict";

module.exports = {
    name: "UserList",

    data() {
        return {
            users: []
        };
    },

    created() {
        this.init();
    },

    methods: {
        /**
         * Init method
         */
        init() {
            this.users = [
                {
                    id: 1,
                    name: "John",
                    email: "john@doe.com"
                },
                {
                    id: 2,
                    name: "Jane",
                    email: "jane@doe.com"
                }
            ];
        }
    }
};
</script>

<style scoped>
</style>
