<template lang="pug">
    .multi-text#multi-text-template
        .form-itemsbox(v-for='(item, index) in value')
            .columns
                .column.is-4
                    .field
                        label.label دستور جلسه
                        .control
                            input.input(type='text', v-model='item.title', @input='updateValue')
                .column.is-2
                    .field
                        label.label زمان
                        .control
                            input.input(type='text', v-model='item.duration', @input='updateValue')
                .column.is-4
                    .field
                        label.label ارائه دهنده
                        .control
                            input.input(type='text', v-model='item.provider', @input='updateValue')
                .column.is-2
                    a.button.is-danger(href='#', @click='deleteValue(index)')
                        i.fa.fa-times
        a.button.is-success(href='#', @click.prevent='addValue')
            i.fa.fa-plus
</template>

<script>
"use strict";

module.exports = {
    name: "MultiText",

    data: () => ({
        values: []
    }),

    props: {
        value: {
            type: Array,
            default: () => []
        }
    },

    created() {
        this.setValue();
    },

    methods: {
        setValue() {
            Vue.set(this, "values", this.value);
        },

        updateValue: function() {
            this.$emit("input", this.value);
        },

        deleteValue: function(index) {
            this.value.splice(index, 1);
            this.$emit("input", this.value);
        },

        addValue: function() {
            this.value.push({});
            this.$emit("input", this.value);
        }
    }
};
</script>

<style scoped>
</style>
