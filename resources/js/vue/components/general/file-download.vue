<template lang="pug">
div
    input.is-hidden(
        type="file",
        ref="fileInput",
        multiple,
    )
    div
        ul
            li(v-for="(file, index) in fileList", style="dir: ltr;")
                button.button.is-success(@click.prevent="downloadFile(file)") دانلود
                label {{ humanFileSize(file.file.size) }}
                label {{ file.file.name }}
</template>

<script>
export default {
    name: "FileDownload",

    props: {
        oldFiles: { type: Array, default: () => [] },
    },

    computed: {
        fileList: (state) => state.files.filter((x) => !x.is_deleted),
    },

    data: () => ({
        files: [],
    }),

    /**
     * Create method
     */
    created() {},

    methods: {
        /**
         * Update old files
         */
        updateOldFiles(payload) {
            Vue.set(this, "files", []);
            const oldFiles = payload || [];
            oldFiles.forEach((file) => {
                let item = {
                    _id: file._id,
                    type: "old",
                    file: {
                        ...file,
                    },
                    is_deleted: false,
                };
                Vue.set(this.files, this.files.length, item);
            });
        },
        /**
         * download  files
         */
        downloadFile(payload) {
            const url =
                window.location.origin + "/get_image/" + payload.file.filename;

            axios.get(url, { responseType: "blob" }).then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", payload.file.name);
                document.body.appendChild(link);
                link.click();
            });
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
        },
    },
};
</script>

<style scoped></style>
