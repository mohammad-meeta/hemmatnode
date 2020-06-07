<template lang="pug">
    .multi-text#multi-text-template
        .form-itemsbox(v-for='(item, index) in values')
            .columns.is-multiline
                .column.is-4
                    .field
                        label.label عنوان
                        .control
                            input.input(type='text', v-model='item.title', @input='updateValue')
                .column.is-2
                    .field
                        label.label بودجه
                        .control
                            input.input(type='number', v-model='item.budget', @input='updateValue')
                .column.is-4
                    .field
                        label.label محل تامین
                        .control
                            input.input(type='text', v-model='item.supply', @input='updateValue')
                .column.is-2
                    a.button.is-danger(href='#', @click.prevent='deleteValue(index)')
                        i.fa.fa-times
                .column.is-12
                    .field
                        multi-text-result(v-model='item.result || {}')
        a.button.is-success(href='#', @click.prevent='addValue' v-show="! isMaxResult")
            i.fa.fa-plus
</template>

<script>
"use strict";

const MultiTextResult = require("VUE-COMPONENTS/memorandum/multi-text-result.vue").default;

module.exports = {
    name: "MultiTextProject",

    components: {
        MultiTextResult
    },

    data: () => ({
        values: {
            result: []
        },
        maxResultFlag: false

    }),

    props: {
        value: null
    },

    created() {
        this.setValue();
    },

    computed: {
        isMaxResult:  state => state.maxResultFlag == true
    },

    methods: {
        setValue() {
            let v = Array.from(this.value);
            this.values = v;
        },

        updateValue: function() {
            this.$emit('input', this.values);
        },

        deleteValue: function(index) {
            this.values.splice(index, 1);
            this.$emit('input', this.values);
        },

        addValue: function() {
            this.values.push({});
            this.$emit('input', this.values);
            console.log(this.values.length);
            if(this.values.length >= 4) {
                this.maxResult();
            }
        },

        /**
         * max result
         */
        maxResult() {
            Vue.set(this, "maxResultFlag", true);
        },
    },
};

</script>

<style scoped>
</style>
