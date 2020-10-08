<template lang="pug">
div(ref="ck_container")
    div(ref="editor", :id="editorId")
</template>

<script>
export default {
    name: "CKEditor",

    props: {
        value: {
            type: String,
        },
        uploadUrlImage: {
            type: String,
        },
        uploadUrlToken: {
            type: String,
        },
    },

    computed: {
        editorId: () => "editor" + Math.floor(Math.random() * 1000000),
    },

    watch: {
        value(newValue) {
            this.setCKData(newValue);
        },
    },

    /**
     * Mounted
     */
    mounted() {
        /* Add js files */
        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", "/js/ckeditor/ckeditor.js");
        this.$refs.ck_container.appendChild(scriptEl);
        setTimeout(() => {
            const csrfToken = document.head.querySelector("[name='csrf-token']")
                .content;
            const uploadUrl = this.uploadUrlImage;
            const tokenUrl = this.uploadUrlToken;
            const editorId = this.$refs.editor.id;

            CKEDITOR.replace(this.editorId, {
                extraPlugins: ["easyimage"],
                removePlugins: "image",
                removeDialogTabs: "link:advanced",
                cloudServices_uploadUrl: uploadUrl,
                cloudServices_tokenUrl: tokenUrl,
                easyimage_toolbar: [
                    "EasyImageFull",
                    "EasyImageSide",
                    "EasyImageAlt",
                ],
            });

            CKEDITOR.instances[editorId].on("change", (event) => {
                this.onUpdate();
            });

            CKEDITOR.instances[editorId].on("loaded", (event) => {
                this.setCKData(this.value);
            });
        }, 250);
    },

    methods: {
        /**
         * On Update
         */
        onUpdate() {
            let data = this.getCKData();
            this.$emit("input", data);
        },

        /**
         * Get CKEditor data
         */
        getCKData(data) {
            return CKEDITOR.instances[this.editorId].getData();
        },

        /**
         * Set CKEditor data
         */
        setCKData(data) {
            const oldData = this.getCKData();

            if (data != oldData) {
                CKEDITOR.instances[this.editorId].setData(data);
            }
        },
    },
};
</script>
