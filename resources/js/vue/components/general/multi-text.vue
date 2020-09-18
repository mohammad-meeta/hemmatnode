<template lang="pug">
#multi-text-template.multi-text
    .form-itemsbox(v-for="(item, index) in value")
        .columns.is-multiline
            .column.is-12
                .field
                    label.label دستور جلسه
                    .control
                        input.input(
                            type="text",
                            v-model="item.title",
                            @input="updateValue"
                        )
            .column.is-4
                b-field(label="روش")
                    b-select(placeholder="انتخاب روش", v-model="item.way")
                        optgroup(label="تصمیم گیری")
                            option(value="رای گیری") رای گیری
                            option(value="رای مخفی") رای مخفی
                            option(value="رای منفی") رای منفی
                            option(value="اجماع") اجماع
                            option(value="تفویز اختیار رئیس") تفویز اختیار رئیس
                        optgroup(label="بحث")
                            option(value="ارائه نظرات چرخشی") ارائه نظرات چرخشی
                            option(value="ارائه") ارائه
                            option(value="سخنرانی") سخنرانی
                            option(value="ارائه مخالف و موافق") ارائه مخالف و موافق
            .column.is-2
                .field
                    label.label زمان
                    .control
                        input.input(
                            type="text",
                            v-model="item.duration",
                            @input="updateValue"
                        )
            .column.is-4
                .field
                    label.label ارائه دهنده
                    .control
                        input.input(
                            type="text",
                            v-model="item.provider",
                            @input="updateValue"
                        )
            .column.is-2
                a.button.is-danger(href="#", @click="deleteValue(index)")
                    i.fa.fa-times
    a.button.is-success(href="#", @click.prevent="addValue")
        i.fa.fa-plus
</template>

<script>
"use strict";

export default {
    name: "MultiText",

    data: () => ({
        values: [],
    }),

    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },

    /**
     * Created
     */
    created() {
        this.setValue();
    },

    methods: {
        /**
         * Set value
         */
        setValue() {
            Vue.set(this, "values", this.value);
        },

        /**
         * Update value
         */
        updateValue: function () {
            this.$emit("input", this.value);
        },

        /**
         * Delete value
         */
        deleteValue: function (index) {
            this.value.splice(index, 1);
            this.$emit("input", this.value);
        },

        /**
         * Add value
         */
        addValue: function () {
            this.value.push({});
            this.$emit("input", this.value);
        },
    },
};
</script>
