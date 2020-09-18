<template lang="pug">
    .multi-text#multi-text-member-template
        .form-itemsbox(v-for='(item, index) in value')
            .columns.is-multiline
                .column.is-5
                    .field
                        label.label نام
                        .control
                            input.input(type="text" placeholder='نام', v-model='item.first_name', @input='updateValue')
                .column.is-5
                    .field
                        label.label نام خانوادگی
                        .control
                            input.input(type="text" placeholder='نام', v-model='item.last_name', @input='updateValue')
                .column.is-2
                    a.button.is-danger(href='#', @click.prevent='deleteValue(index)')
                        i.fa.fa-times
        a.button.is-success(href='#', @click.prevent='addValue')
            i.fa.fa-plus افزودن مدعوین
</template>

<script>
"use strict";

export default {
    name: "MultiTextMember",

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
