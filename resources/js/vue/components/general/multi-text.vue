<template lang="pug">
    .multi-text#multi-text-template
        .form-itemsbox(v-for='(item, index) in values')
            .columns
                .column.is-3
                    input(type='text', v-model='item.title', @input='updateValue')
                .column.is-3
                    input(type='text', v-model='item.duration', @input='updateValue')
                .column.is-3
                    input(type='text', v-model='item.provider', @input='updateValue')
                .column.is-3
                    a(href='#', @click='deleteValue(index)') x
        a(href='#', @click.prevent='addValue') Add more
</template>

<script>
"use strict";

module.exports = {
    name: "MultiText",

    data: () => ({
        values: null
    }),

    props: {
        value: null
    },

    created() {
        this.setValue();
    },

    methods: {
        setValue() {
            var v = Array.from(this.value);
            console.debug(JSON.stringify(this.value));
            console.debug(JSON.stringify(v));
            this.values = v;
        },

        updateValue: function() {
            console.debug(JSON.stringify(this.values));
            this.$emit('input', this.values);
        },

        deleteValue: function(index) {
            this.values.splice(index, 1);
            console.debug(JSON.stringify(this.values));
            this.$emit('input', this.values);
        },

        addValue: function() {
            this.values.push({});
            this.$emit('input', this.values);
        }
    },
};

</script>

<style scoped>
</style>
