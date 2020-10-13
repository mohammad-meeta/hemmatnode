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

</template>
<script>
"use strict";
export default {
    name: "DashboardUser",

    data: () => ({

    }),
};
</script>
