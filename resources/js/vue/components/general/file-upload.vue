<template lang="pug">
    div
        input(type="file" class="is-hidden" ref="fileInput" multiple @change="addAttachment")
        button.button.is-success(@click="showFileUpload()") &plus;

        div
            ul
                li(v-for="(file, index) in fileList")
                    button.button.is-danger(@click.prevent="removeFile(file, index)") &times;
                    label {{ humanFileSize(file.file.size) }}
                    label {{ file.file.name }}
</template>

<script>
export default {
    name: "FileUpload",

    props: {
        oldFiles: {
            type: Array
        }
    },

    computed: {
        fileList: state => state.files.filter(x => !x.file.is_deleted)
    },

    data: () => ({
        files: []
    }),

    /**
     * Create method
     */
    created() {
        this.oldFiles.forEach(file => {
            let item = {
                type: "old",
                file: {
                    ...file
                },
                is_deleted: false
            };
            Vue.set(this.files, this.files.length, item);
        });
    },

    methods: {
        /**
         * Get files list
         */
        getFiles() {
            return this.files;
        },

        /**
         * Show file upload
         */
        showFileUpload() {
            this.$refs.fileInput.click();
        },

        /**
         * Add new attachment(s)
         */
        addAttachment() {
            const files = this.$refs.fileInput.files;

            for (let i = 0; i < files.length; ++i) {
                let obj = {
                    type: "new",
                    file: files[i],
                    is_deleted: false
                };

                Vue.set(this.files, this.files.length, obj);
            }
        },

        /**
         * Remove a file from list
         */
        removeFile(file, index) {
            let confirmDelete = confirm("Are you sure?");

            if (confirmDelete) {
                Vue.delete(this.files, index);
            }
        },

        /**
         * Human size
         */
        humanFileSize(bytes, si = false, dp = 1) {
            const thresh = si ? 1000 : 1024;

            if (Math.abs(bytes) < thresh) {
                return bytes + " B";
            }
            const units = si
                ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            let u = -1;
            const r = 10 ** dp;

            do {
                bytes /= thresh;
                ++u;
            } while (
                Math.round(Math.abs(bytes) * r) / r >= thresh &&
                u < units.length - 1
            );

            return bytes.toFixed(dp) + " " + units[u];
        }
    }
};
</script>

<style scoped>
</style>
