<script>
import { HorizontalBar } from "vue-chartjs";
export default {
    extends: HorizontalBar,
    props: {
        Label: {
            type: String,
            default: null,
        },
        Chartdata: {
            type: Array,
            default: () => [],
        },
        Chartlabel: {
            type: Array,
            default: () => [],
        },
        YScaleLabel: {
            type: String,
            default: null,
        },
        XScaleLabel: {
            type: String,
            default: null,
        },

    },
    mounted() {
        this.showData();
    },
    methods: {
        showData() {
            this.renderChart(
                {
                    labels: this.Chartlabel,
                    datasets: [
                        {
                            label: this.Label,
                            data: this.Chartdata,
                            backgroundColor: "transparent",
                            backgroundColor: "#08c2c0", // Add custom color background (Fill)
                        },
                    ],
                },
                {
                    xAxes: [],
                    scales: {
                        yAxes: [
                            {
                                gridLines: {
                                    display: false,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: this.YScaleLabel,
                                },
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    display: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: this.XScaleLabel,
                                },

                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    display: true,
                                },
                            },
                        ],
                    },
                    responsive: true, // Instruct chart js to respond nicely.
                    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
                }
            );
        },
    },
    watch: {
        Chartdata(newVal, oldVal) {
            this.showData();
        },
    },
};
</script>
