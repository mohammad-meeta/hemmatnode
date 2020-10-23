<script>
import { Line } from "vue-chartjs";
export default {
    extends: Line,
    props: {
        dataLabel: {
            type: String,
            default: null,
        },
        dataCount: {
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.showData();
    },
    methods: {
        showData() {
            this.renderChart(
                {
                    labels: this.Chartlabels,
                    datasets: [
                        {
                            label: this.Chartlabel,
                            data: this.Chartdata,
                            backgroundColor: "transparent",
                            borderColor: "rgba(255, 255, 255, 0.50)",
                            fill: false,
                            radius: 0,
                            borderColor: "rgba(206,167,29,1)", // Add custom color border (Line)
                            backgroundColor: "rgba(206,167,29,1)", // Add custom color background (Fill)
                            // pointBackgroundColor: "rgba(255, 255, 255, 0.50)", // Add custom color background (Fill)
                            lineTension: 0,
                            borderWidth: 2.5, // Specify bar border width
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
                                    labelString: "تعداد",
                                },
                                ticks: {
                                    beginAtZero: false,
                                    min: 0,
                                    stepSize: this.maxData,
                                    max: this.maxData,
                                    display: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "سال",
                                },
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: true,
                                },
                            },
                        ],
                    },
                    responsive: false, // Instruct chart js to respond nicely.
                    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
                }
            );
        },
    },
    computed: {
        Chartlabel() {
            return this.dataLabel;
        },
        Chartlabels() {
            let labels = [];
            for (let index = 0; index < this.dataCount.length; index++) {
                labels.push(index);
            }
            return labels;
        },
        Chartdata() {
            let data = [];
            for (let index = 0; index < this.dataCount.length; index++) {
                data.push(this.dataCount[index].count);
            }
            return data;
        },
        maxData() {
            let max = -1;
            for (let index = 0; index < this.dataCount.length; index++) {
                if (max < this.dataCount[index].count)
                    max = this.dataCount[index].count;
            }
            return max + 5;
        },
        minData() {
            let min = 1;
            for (let index = 0; index < this.dataCount.length; index++) {
                if (min > this.dataCount[index].count)
                    min = this.dataCount[index].count;
            }
            if (min > 0) return 0;
            else return min - 5;
        },
    },
    watch: {
        Chartdata(newVal, oldVal) {
            this.showData();
        },
    },
};
</script>
