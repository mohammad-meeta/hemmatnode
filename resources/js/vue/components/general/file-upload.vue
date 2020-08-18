<template lang="pug">
    div
        input(type="file" class="is-hidden" ref="fileInput" multiple @change="addAttachment")
        button.button.is-success(@click="showFileUpload()")
            i.fa.fa-plus افزودن فایل

        div
            ul
                li(v-for="(file, index) in fileList", style="dir: ltr;")
                    button.button.is-danger(@click.prevent="removeFile(file)") &times;
                    label {{ humanFileSize(file.file.size) }}
                    label {{ file.file.originalname }}
</template>

<script>
const uuidV4 = require("uuid").v4;

export default {
    name: "FileUpload",

    props: {
        oldFiles: { type: Array, default: () => [] }
    },

    computed: {
        fileList: state => state.files.filter(x => !x.is_deleted)
    },

    data: () => ({
        files: []
    }),

    /**
     * Create method
     */
    created() {},

    methods: {
        /**
         * Update old files
         */
        updateOldFiles(oldFiles) {
            Vue.set(this, "files", []);

            oldFiles.forEach(file => {
                let item = {
                    _id: file._id,
                    type: "old",
                    file: {
                        ...file
                    },
                    is_deleted: false
                };
                Vue.set(this.files, this.files.length, item);
            });
        },

        /**
         * Get files list
         */
        getFiles() {
            return this.files;
        },

        /**
         * Get deleted files list
         */
        getDeletedFiles() {
            return this.files.filter(x => x.is_deleted);
        },

        /**
         * Get new files
         */
        getNewFiles() {
            return this.files.filter(x => x.type == "new");
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
                    _id: uuidV4(),
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
        removeFile(file) {
            let confirmDelete = confirm("آیا برای حذف فایل اطمینان دارید؟");

            if (confirmDelete) {
                if (file.type == "old") {
                    Vue.set(file, "is_deleted", true);
                } else {
                    const index = this.files.findIndex(x => x._id == file._id);

                    Vue.delete(this.files, index);
                }
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
