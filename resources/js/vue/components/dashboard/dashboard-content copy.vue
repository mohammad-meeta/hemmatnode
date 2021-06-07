<template lang="pug">
    .dashboard-container
        .dashbord-content-head
            h2
                span
                    | کارنامه ها
        .dashboard-content-body.columns.is-multiline
                .column.is-4.dashboard-button
                    a(href="/zonescore/report" target="_blank")
                        | کارنامه پیام گزاران

</template>
<script>
"use strict";
export default {
    name: "DashboardContent",

    data: () => ({

    }),
};
</script>
