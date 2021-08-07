<script>
import { Bar } from "vue-chartjs";

export default {
    extends: Bar,
    props: ["datasets", "labels"],
    data: () => ({
        chartdata: {
            labels: [],
            datasets: [],
            // labels: ["January", "February"],
            // datasets: [
            //     {
            //         label: "Data One",
            //         backgroundColor: "#f87979",
            //         data: [40, 20],
            //     },
            //     {
            //         label: "Data Two",
            //         backgroundColor: "#f8fb0b",
            //         data: [25, 46],
            //     },
            // ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    }),

    mounted() {
        Vue.set(this.chartdata, "labels", this.labels);
        Vue.set(this.chartdata, "datasets", this.datasets);

        this.renderChart(this.chartdata, this.options);
    },
};
</script>
