<template lang="pug">
.block
    //- Upload box
    .file.is-boxed
        label.file-label
            input.file-input(
                multiple,
                ref="fileInput",
                type="file",
                name="resume",
                @input="fileSelected"
            )
            span.file-cta
                span.file-icon
                    i.fas.fa-upload
                span.file-label
                    | افزودن فایل

    //- Files list
    .columns(v-for="(file, index) in undeletedFiles", :key="index")
        .column.is-3.has-text-left
            a.button.is-danger.has-text-white(
                href="#",
                @click.prevent="removeFile(file)"
            ) &times;
            | {{ file.size }}
        .column.is-9.has-text-left
            | {{ file.name }}
</template>

<script>
export default {
    name: "FileManager",

    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        files: [],
    }),

    computed: {
        undeletedFiles: (state) => state.files.filter((x) => !x.deleted),
    },

    watch: {
        /**
         * Value watcher
         */
        value(newValue) {
            this.updateFiles(newValue);
        },
    },

    created() {
        this.updateFiles(this.value);
    },

    methods: {
        /**
         * Update files
         */
        updateFiles(value) {
            Vue.set(this, "files", value);
        },

        /**
         * Remove file
         */
        removeFile(file) {
            if (file instanceof File) {
                Vue.set(
                    this,
                    "files",
                    this.files.filter((x) => x != file)
                );
            } else {
                Vue.set(file, "deleted", true);
            }

            /* Emit update event */
            this.onUpdate();
        },

        /**
         * A file is selected
         */
        fileSelected(sender) {
            const files = sender.target.files;

            Vue.set(this, "files", [...this.files, ...files]);

            /* Emit update event */
            this.onUpdate();
        },

        /**
         * Update
         */
        onUpdate() {
            this.$emit("input", this.files);
        },
    },
};
</script>
