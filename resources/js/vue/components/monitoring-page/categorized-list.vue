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
                            v-for="index in category.indexs"
                        )
                            a(
                                href="#"
                            )
                                | {{ index.title }}
</template>

<script>
"use strict";


export default {
    name: "CategorizedList",

    data: () => ({
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

    }
};
</script>
