<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array,
    },
  },
  mounted() {
    this.render(4);
  },
  watch: {
    chartData: function () {
      const pointRadius =
        this.chartData.length < 40 ? 4 : this.chartData.length < 100 ? 3 : 1;
      this.render(pointRadius);
    },
  },
  methods: {
    render: function (pointRadius) {
      const dates = this.chartData.map((d) => d.date);
      const values = this.chartData.map((d) => d.value);
      const positive = this.chartData.map((d) => d.positive);
      const neutral = this.chartData.map((d) => d.neutral);
      const negative = this.chartData.map((d) => d.negative);

      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              data: values,
              borderColor: "#105269", // Border
              borderWidth: 1,
              lineTension: 0,
              pointBorderColor: "#105269", // Points
              pointBackgroundColor: "#105269",
              pointRadius: pointRadius,
              fill: false, // background
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  padding: 10,
                  autoskip: true,
                },
                gridLines: {
                  drawOnChartArea: false,
                  lineWidth: 1, // TODO: Would only make x-axis thicker, figure out how to do it for y-axis
                  drawTicks: false,
                  color: "rgba(0, 0, 0, 0.05)", // TODO: Set to 0.5, only fixes x-axis, find way to do similar thing for y-axis
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Sentiment",
                },
                ticks: {
                  min: 0,
                  max: 1,
                  stepSize: 0.2,
                  padding: 10,
                },
                gridLines: {
                  zeroLineColor: "rgba(0, 0, 0, 0.25)",
                  drawTicks: false,
                  color: "rgba(0, 0, 0, 0.05)",
                },
              },
            ],
          },
          tooltips: {
            displayColors: false,
            callbacks: {
              label: function (tooltipItem) {
                return [
                  "positief: " + positive[tooltipItem.index],
                  "neutraal: " + neutral[tooltipItem.index],
                  "negatief: " + negative[tooltipItem.index],
                ];
              },
            },
          },
        }
      );
    },
  },
};
</script>
