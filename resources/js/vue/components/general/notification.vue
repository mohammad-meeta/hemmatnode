<template lang="pug">
    .notification(:class="notificationType")
        button.delete(@click.prevent="closeNotifiaction")
        slot
</template>

<script>
module.exports = {
    name: "Notifiaction",

    props: {
        notificationType: {
            type: String,
            default: "is-info"
        }
    },

    methods: {
        /**
         * Close notification dialog
         */
        closeNotifiaction(e) {
            this.$emit('on-close', this);
        }
    }
};
</script>

<style scoped>
</style>
