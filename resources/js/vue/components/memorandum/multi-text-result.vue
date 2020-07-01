<template lang="pug">
    .multi-text#multi-text-result-template
        .form-itemsbox(v-for='(item, index) in values')
            .columns
                .column.is-10
                    .field
                        label.label عنوان برآمد
                        .control
                            input.input(type='text', v-model='item.title', @input='updateValue')
                .column.is-2
                    a.button.is-danger(href='#', @click.prevent='deleteValue(index)')
                        i.fa.fa-times
        a.button.is-success(href='#', @click.prevent='addValue' v-show="! isMaxResult")
            i.fa.fa-plus
</template>

<script>
"use strict";

module.exports = {
    name: "MultiTextResult",

    data: () => ({
        values: null,
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
            var v = Array.from(this.value);
            this.values = v;
        },

        updateValue: function() {
            this.$emit('input', this.values);
        },

        deleteValue: function(index) {
            this.values.splice(index, 1);
            this.$emit('input', this.values);
            this.maxResult();
        },

        addValue: function() {
            this.values.push({});
            this.$emit('input', this.values);
            this.maxResult();
        },
        /**
         * max result
         */
        maxResult() {
            if(this.values.length >= 4) {
                Vue.set(this, "maxResultFlag", true);
            }
            else {
                Vue.set(this, "maxResultFlag", false);
            }
        }
    },
};

</script>

<style scoped>
</style>
