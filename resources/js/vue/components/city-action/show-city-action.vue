<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ cityActionData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label توضیحات:
                        .info-card-value {{ cityActionData.description }}
                .info-card-details
                    .info-card-item
                        .info-card-label شهرستان:
                            .info-card-value {{ selectedCity.name }}
                    .info-card-item
                        .info-card-label مسئول اقدام:
                            .info-card-value {{ cityActionData.responsible }}
                    .info-card-item
                        .info-card-label تاریخ:
                            .info-card-value {{ toPersianDate(cityActionData.date) }}
                .info-card-item
                    .info-card-label
                        | فایل های ضمیمه
                        .info-card-value
                            file-download(ref="fileDownload", :old-files="oldFiles")

</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;
export default {
    name: "ShowCityAction",
    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        oldFiles: [],
        cityActions: [],
        cities: [],
        selectedCity: {},
        cityActionData: {
            _id: null,
            title: null,
            cityAction_id: null,
            responsible: null,
            description: null,
            city_id: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),

    props: {
        cityActionsUrl: {
            type: String,
            default: "",
        },

        cityUrl: {
            type: String,
            default: "",
        },
    },
    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },


    methods: {
        /**
         * Load specific cityAction
         */
        loadCityActionData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                cityAction_id: data.cityAction_id,
                city_id: data.city_id,
                date: data.date,
                description: data.description,
                responsible: data.responsible,
                files: data.files,
                is_active: data.is_active,
            };

            Vue.set(this, "cityActionData", temp);
            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileDownload.updateOldFiles(data.files);


            let url = this.cityUrl
                .replace(/\$page\$/g, 1)
                .replace(/\$pageSize\$/g, 1000);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "cities", resData.data.data);
                let selectedCity = this.cities.filter(x => x._id == this.cityActionData.city_id);
                Vue.set(this, "selectedCity", selectedCity[0]);
            });
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, "showLoadingFlag", true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, "showLoadingFlag", false);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateShort(date);
        },

    },
};
</script>
