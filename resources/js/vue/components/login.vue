<template>
    <section class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form class="box" action>
                            <div class="field">
                                <label class="label" for>Email</label>
                                <div class="control has-icons-left">
                                    <input
                                        class="input"
                                        type="email"
                                        placeholder="e.g. bobsmith@gmail.com"
                                        required
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="material-icons">account_circle</i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for>Password</label>
                                <div class="control has-icons-left">
                                    <input
                                        class="input"
                                        type="password"
                                        placeholder="*******"
                                        required
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="material-icons">vpn_key</i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-success" @click.prevent="login">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
module.exports = {
    name: "Login",

    data() {
        return {};
    },

    methods: {
        /**
         * Login
         */
        login() {}
    }
};
</script>

<style scoped>
</style>
