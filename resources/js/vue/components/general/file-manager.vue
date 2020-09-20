<template lang="pug">
.block
    //- Upload box
    .field
        .file.is-primary
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
                        i.fa.fa-upload
                    span.file-label
                        | افزودن فایل

    //- Files list
    .info-card-details(v-for="(file, index) in undeletedFiles", :key="index")
        span
            | {{ file.name }}
        span
            | {{ file.size }}
        .button.is-danger.has-text-white(
            @click.prevent="removeFile(file)"
            ) &times;


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
         * Get deleted files
         */
        getDeletedFiles() {
            return this.files.filter((x) => x.deleted);
        },

        /**
         * Get deleted files
         */
        getNewFiles() {
            return this.files.filter((x) => x instanceof File);
        },

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
