<template lang="pug">
div

    div(v-if='!image')
        img(:src="require('IMAGES/user.svg')")
    div(v-else='')
        img(:src='image')

</template>

<script>
"use strict";
// const AxiosHelper = require("JS-HELPERS/axios-helper");
const Routes = require("JS-CORE/routes");
const Buefy = require("buefy").default;

export default {
    name: "LoadAvatar",

    components: {},

    data: () => ({
        fileInfo: null,
        image: null,
    }),

    props: {
        userProfile: {
            type: String,
            default: null,
        },
        fileUrl: {
            type: String,
            default: null,
        },
        uploadImage: {
            type: String,
            default: null,
        },
    },

    created() {
        this.init();
    },

    mounted() {},

    methods: {
        /**
         * createImage
         */
        createImage(file) {
            this.image = window.URL.createObjectURL(new Blob([file]));
        },

        /**
         * find file
         */
        loadFile(imageid) {
            let url = this.fileUrl.replace(/\$fileid\$/g, imageid);

            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "fileInfo", resData.data);

                const urlUpload = this.uploadImage.replace(
                    "#NAME#",
                    resData.data.filename
                );
                console.log(urlUpload);
                AxiosHelper.send("get", urlUpload, "").then((resFile) => {
                    // Vue.set(this, "image", resFile.data);
                    this.createImage(resFile.data);
                });
            });
        },

        /**
         * Init method
         */
        init() {
            const data = JSON.parse(this.userProfile);
            this.loadFile(data.image);
        },
    },
};
</script>
