<template lang="pug">
    .multi-text#multi-text-approves
        .form-itemsbox(v-for='(item, index) in value')
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
                        label.label مهلت
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

export default {
    name: "MultiTextApprov",

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
            this.$emit('input', this.value);
        },

        addValue: function() {
            this.value.push({});
            this.$emit('input', this.value);
        },
    }
};
</script>

<style scoped>
</style>
