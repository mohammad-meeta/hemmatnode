<template lang="pug">
.container-parent
    .field
        b-field(label='نقش')
            b-autocomplete(
                v-model="title"
                placeholder="انتخاب نقش"
                icon="magnify"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :data="filteredDataObj || myData"
                field="name"
                @blur="onMajorChange()"
                @select="option => (selected = option)"
                :clearable="clearable"
                )
                    template(slot='empty') نقشی یافت نشد

    div(v-for="rule in groupedRule", :key="rules.id")
        hr
        div(v-for="drule in rule", :key="drule.id")
            .field
                b-checkbox(v-model="permissions" :native-value="drule.id")
                    | {{ drule.description }}

    .field.is-grouped
        a.button.is-link.is-rounded(
            href="#",
            @click.prevent="registerRole()"
        )
            | ایجاد

</template>

<script>
"use strict";
const _ = require("lodash");
const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");

export default {
    name: "CreatePermissions",

    components: {
        Loading,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        rules: [],
        roles: [],
        permissions: [],
        notificationMessage: null,
        notificationType: "is-info",

        title: "",
        keepFirst: false,
        openOnFocus: true,
        selected: null,
        clearable: false,
        myData: [],
    }),

    props: {
        listRuleUrl: {
            type: String,
            default: null,
        },
        listRoleUrl: {
            type: String,
            default: null,
        },
        editUrl: {
            type: String,
            default: null,
        },
        registerUrl: {
            type: String,
            default: null,
        },
    },

    /**
     * Mounted
     */
    mounted() {
        this.loadRule();
        this.loadRole();
    },
    computed: {
        filteredDataObj() {
            return this.roles.filter((option) => {
                return (
                    option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.title.toLowerCase()) >= 0
                );
            });
        },
        groupedRule() {
            let grouped = _.mapValues(_.groupBy(this.rules, "type"), (clist) =>
                clist.map((rule) => _.omit(rule, "type"))
            );
            return grouped;
        },
    },
    watch: {
        selected(newValue) {
            if (newValue) {
                Vue.set(this, "permissions", newValue.permision);
            } else {
                Vue.set(this, "permissions", []);
            }
        },
    },

    methods: {
        /**
         * on blur b-autocomplete
         */
        onMajorChange() {
            let temp = this.roles.filter((x) => x.name == this.title);
            if (temp.length > 0) {
                Vue.set(this, "myData", temp[0]);
                Vue.set(this, "selected", temp[0]);
                Vue.set(this, "permissions", temp[0].permision);
            } else {
                Vue.set(this, "myData", []);
                Vue.set(this, "permissions", []);
            }
        },
        /**
         * register role
         */
        async registerRole() {
            if (this.selected) {
                const confirmed = confirm(
                    `آیا از به روز رسانی این نقش اطمینان دارید با نام ${this.selected.name} ?`
                );

                if (confirmed) {
                    try {
                        const url = this.editUrl;
                        const data = {
                            name: this.selected.name,
                            _id: this.selected._id,
                            is_active: this.selected.is_active,
                            permision: JSON.stringify(this.permissions),
                        };
                        let res = await AxiosHelper.send("patch", url, data, {
                            sendAsFormData: true,
                            filesArray: "files",
                        });
                        this.loadRole();
                    } catch (err) {
                        const data = err.response.data;
                        console.log(data, "is-danger");
                    }
                }
            } else {
                try {
                    const url = this.registerUrl;
                    const data = {
                        name: this.title,
                        is_active: this.is_active || true,
                        permision: JSON.stringify(this.permissions),
                    };

                    let res = await AxiosHelper.send("post", url, data, {
                        sendAsFormData: true,
                        filesArray: "files",
                    });
                    this.loadRole();
                } catch (err) {
                    const data = err.response.data;
                    console.log(data, "is-danger");
                }
            }
        },
        /**
         * Load cityActions
         */
        loadRule() {
            let url = this.listRuleUrl
                .replace(/\$page\$/g, 1)
                .replace(/\$pageSize\$/g, 250);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "rules", resData.data);
            });
        },
        /**
         * Load cityActions
         */
        loadRole() {
            let url = this.listRoleUrl
                .replace(/\$page\$/g, 1)
                .replace(/\$pageSize\$/g, 250);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "roles", resData.data.data);
            });
        },
    },
};
</script>
