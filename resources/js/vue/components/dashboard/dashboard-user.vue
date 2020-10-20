<template lang="pug">
    .dashboard-container
        .dashbord-content-head
            h2
                span
                    | مدیریت کاربران
        .dashboard-content-body.columns.is-multiline
                .column.is-4.dashboard-button
                    a(href="/user" target="_blank")
                        | کاربران
                .column.is-4.dashboard-button
                    a(href="/admin/role/rule/create/permission" target="_blank")
                        | مجوزها

</template>
<script>
"use strict";
export default {
    name: "DashboardUser",

    data: () => ({

    }),
};
</script>
