<template lang="pug">
    .multi-text#multi-text-template
        .form-itemsbox(v-for='(item, index) in values')
            .columns.is-multiline
                .column.is-3
                    .field
                        label.label عنوان پروژه
                        .control
                            input.input(type='text', v-model='item.title', @input='updateValue')
                .column.is-2
                    .field
                        label.label بودجه (میلیون ریال)
                        .control
                            input.input(type='number', v-model='item.budget', @input='updateValue')
                .column.is-3
                    .field
                        label.label محل تامین
                        .control
                            input.input(type='text', v-model='item.supply', @input='updateValue')
                .column.is-2
                    .field
                        label.label نوع
                        .control
                            .select.is-primary
                                select(v-model="item.type")
                                    option(:value="1") محصول و خدمت سلامت محور
                                    option(:value="2") حفاظت محیط زیست
                                    option(:value="3") سلامت کارکنان
                .column.is-2
                    a.button.is-danger(href='#', @click.prevent='deleteValue(index)')
                        i.fa.fa-times
                .column.is-12
                    fieldset
                        legend برآمدها
                        .field
                            multi-text-result(v-model='item.result')
        a.button.is-success(href='#', @click.prevent='addValue')
            i.fa.fa-plus
</template>

<script>
"use strict";

const MultiTextResult = require("VUE-COMPONENTS/memorandum/multi-text-result.vue").default;

export default {
    name: "MultiTextProject",
    components: {
        MultiTextResult
    },
    data: () => ({
        values: null
    }),

    props: {
        value: null,
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
                result: [],
                type: 1
            });
            this.$emit('input', this.values);
        },
    }
};
</script>

<style scoped>
</style>
