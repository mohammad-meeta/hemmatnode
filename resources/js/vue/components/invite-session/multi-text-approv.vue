<template lang="pug">
    .multi-text#multi-text-template
        .form-itemsbox(v-for='(item, index) in values')
            .columns.is-multiline
                .column.is-12
                    .field
                        label.label عنوان مصوبه
                        .control
                            input.textarea(placeholder='عنوان مصوبه', v-model='item.title', @input='updateValue')
                .column.is-2
                    .field
                        label.label مسئول پیگیری
                        .control
                            input.input(type='text', v-model='item.responsible', @input='updateValue')
                .column.is-4
                    .field
                        label.label زمان پیگیری
                        .control
                            input.input(type='text', v-model='item.time', @input='updateValue')
                .column.is-2
                    a.button.is-danger(href='#', @click.prevent='deleteValue(index)')
                        i.fa.fa-times
        a.button.is-success(href='#', @click.prevent='addValue')
            i.fa.fa-plus
</template>

<script>
"use strict";

module.exports = {
    name: "MultiTextApprov",

    data: () => ({
        values: {
            result: []
        }
    }),

    props: {
        value: null
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            let v = Array.from(this.value);

            Vue.set(this, "values", v);
        },

        updateValue: function() {
            this.$emit("input", this.values);
        },

        deleteValue: function(index) {
            Vue.delete(this.values, index);
            this.$emit("input", this.values);
        },

        addValue: function() {
            this.values.push({
                result: []
            });
            this.$emit('input', this.values);
        },
    }
};
</script>

<style scoped>
</style>
