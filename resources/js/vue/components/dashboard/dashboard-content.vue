<template lang="pug">
    .dashboard-container
        .dashbord-content-head
            h2
                span
                    | مدیریت محتوا
        .dashboard-content-body.columns.is-multiline
                .column.is-4.dashboard-button
                    a(href="/department" target="_blank")
                        | گروه
                .column.is-4.dashboard-button
                    a(href="/blog" target="blank")
                        | رویدادها
                .column.is-4.dashboard-button
                    a(href="/blogtype" target="blank")
                        | دسته بندی رویدادها
                .column.is-4.dashboard-button
                    a(href="/monitoringtype" target="blank")
                        | دسته بندی شاخص
                .column.is-4.dashboard-button
                    a(href="/index" target="blank")
                        | شاخص
                .column.is-4.dashboard-button
                    a(href="/monitoring" target="blank")
                        | دیدبانی
                .column.is-4.dashboard-button
                    a(href="/response" target="blank")
                        | همکاری متقابل
                .column.is-4.dashboard-button
                    a(href="/zonecat" target="blank")
                        | حوزه فعالیت
                .column.is-4.dashboard-button
                    a(href="/zoneindex" target="blank")
                        | آیتم حوزه فعالیت
                .column.is-4.dashboard-button
                    a(href="/zonescore" target="blank")
                        | امتیازدهی
</template>
<script>
"use strict";
export default {
    name: "DashboardContent",

    data: () => ({

    }),
};
</script>
