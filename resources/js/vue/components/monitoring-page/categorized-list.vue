<template lang="pug">
    .container-parent
        .columns.is-multiline
            .column.is-4(
                v-for="category in value"
            )
                .categorized-list
                    h2.title.is-5.has-text-centered.pt-5.mb-2 {{ category.title }}
                    .category-body
                        .category-item.p-2(
                            v-for="index in category.indxs"
                            :key="index._id"
                        )
                            a(
                                href="#"
                                @click.prevent="commandClick(ENUMS.COMMAND.SHOW, index)"
                            )
                                | {{ index.title }}
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "CategorizedList",

    data: () => ({
        ENUMS,
    }),

    props: {
        value: {
            type: Array,
            default: () => []
        }
    },

    computed: {

    },

    created() {

    },


    methods: {

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg, data) {
            this.$emit("on-command", { arg, data });
        },

    }
};
</script>
