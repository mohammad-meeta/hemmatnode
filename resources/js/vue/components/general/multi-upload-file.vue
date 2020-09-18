<template lang="pug">
.multi-file-uploader
    .drop-active(v-show="$refs.upload && $refs.upload.dropActive")
        h3 Drop files to upload
    .upload(v-show="!isOption")
        .table-responsive
            table.table.table-hover
                thead
                    tr
                        th #
                        th Thumb
                        th Name
                        th Size
                        th Speed
                        th Status
                        th Action
                tbody
                    tr(v-if="!files.length")
                        td(colspan="7")
                            .text-center.p-5
                                h4
                                    | Drop files anywhere to upload
                                    br
                                    | or
                                label.btn.btn-lg.btn-primary(:for="name") Select Files
                    tr(v-for="(file, index) in files", :key="file.id")
                        td {{ index }}
                        td
                            img(
                                v-if="file.thumb",
                                :src="file.thumb",
                                width="40",
                                height="auto"
                            )
                            span(v-else="") No Image
                        td
                            .filename
                                | {{ file.name }}
                            .progress(
                                v-if="file.active || file.progress !== '0.00'"
                            )
                                div(
                                    :class="{ 'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active }",
                                    role="progressbar",
                                    :style="{ width: file.progress + '%' }"
                                ) {{ file.progress }}%
                        td {{ file.size }}
                        td {{ file.speed }}
                        td(v-if="file.error") {{ file.error }}
                        td(v-else-if="file.success") success
                        td(v-else-if="file.active") active
                        td(v-else="")
                        td
                            button.btn.btn-secondary(
                                href="#",
                                @click.prevent="$refs.upload.remove(file)"
                            ) Remove
    .example-foorer
        .btn-group
            file-upload.btn.btn-primary.dropdown-toggle(
                :post-action="postAction",
                :put-action="putAction",
                :extensions="extensions",
                :accept="accept",
                :multiple="multiple",
                :directory="directory",
                :size="size || 0",
                :thread="thread < 1 ? 1 : thread > 5 ? 5 : thread",
                :drop="drop",
                :drop-directory="dropDirectory",
                :add-index="addIndex",
                v-model="files",
                @input-filter="inputFilter",
                @input-file="inputFile",
                ref="upload"
            )
                i.fa.fa-plus
                |
                | Select
</template>
<script>
"use strict";

const VueUploadComponent = require("vue-upload-component");

export default {
    name: "MultiUploadFile",

    components: {
        FileUpload: VueUploadComponent,
    },

    data: () => ({
        accept: "image/png,image/gif,image/jpeg,image/webp",
        extensions: "gif,jpg,jpeg,png,webp",
        // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
        // extensions: /\.(gif|jpe?g|png|webp)$/i,
        minSize: 1024,
        size: 1024 * 1024 * 10,
        multiple: true,
        directory: false,
        drop: true,
        dropDirectory: true,
        addIndex: false,
        thread: 3,
        name: "file",
        postAction: "/upload/post",
        putAction: "/upload/put",
        autoCompress: 1024 * 1024,
        uploadAuto: false,
        isOption: false,
        files: [],
    }),

    methods: {
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Before adding a file
                // Filter system files or hide files
                if (
                    /(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)
                ) {
                    return prevent();
                }

                // Filter php html js file
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent();
                }

                // Automatic compression
                if (
                    newFile.file &&
                    newFile.type.substr(0, 6) === "image/" &&
                    this.autoCompress > 0 &&
                    this.autoCompress < newFile.size
                ) {
                    newFile.error = "compressing";
                    const imageCompressor = new ImageCompressor(null, {
                        convertSize: Infinity,
                        maxWidth: 512,
                        maxHeight: 512,
                    });

                    imageCompressor
                        .compress(newFile.file)
                        .then((file) => {
                            this.$refs.upload.update(newFile, {
                                error: "",
                                file,
                                size: file.size,
                                type: file.type,
                            });
                        })
                        .catch((err) => {
                            this.$refs.upload.update(newFile, {
                                error: err.message || "compress",
                            });
                        });
                }
            }

            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                newFile.blob = "";
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file);
                }
                // Thumbnails
                newFile.thumb = "";
                if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
                    newFile.thumb = newFile.blob;
                }
            }
        },
        // add, update, remove File Event
        inputFile(newFile, oldFile) {
            if (newFile && oldFile) {
                // update
                if (newFile.active && !oldFile.active) {
                    // beforeSend
                    // min size
                    if (
                        newFile.size >= 0 &&
                        this.minSize > 0 &&
                        newFile.size < this.minSize
                    ) {
                        this.$refs.upload.update(newFile, { error: "size" });
                    }
                }
                if (newFile.progress !== oldFile.progress) {
                    // progress
                }
                if (newFile.error && !oldFile.error) {
                    // error
                }
                if (newFile.success && !oldFile.success) {
                    // success
                }
            }

            if (!newFile && oldFile) {
                // remove
                if (oldFile.success && oldFile.response.id) {
                    // $.ajax({
                    //   type: 'DELETE',
                    //   url: '/upload/delete?id=' + oldFile.response.id,
                    // })
                }
            }

            // Automatically activate upload
            if (
                Boolean(newFile) !== Boolean(oldFile) ||
                oldFile.error !== newFile.error
            ) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                    this.$refs.upload.active = true;
                }
            }
        },

        alert(message) {
            alert(message);
        },

        startUpload() {
            this.$refs.upload.active = true;
        },

        stopUpload() {
            this.$refs.upload.active = false;
        },
    },
};
</script>
