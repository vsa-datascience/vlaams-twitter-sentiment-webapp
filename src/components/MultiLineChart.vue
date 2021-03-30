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
      const values_positive = this.chartData.map((d) => d.positive);
      const values_neutral = this.chartData.map((d) => d.neutral);
      const values_negative = this.chartData.map((d) => d.negative);
      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              data: values_positive,
              borderColor: "#24b217", // Border
              borderWidth: 1,
              lineTension: 0,
              pointBorderColor: "#24b217", // Points
              pointBackgroundColor: "#24b217",
              pointRadius: pointRadius,
              fill: false, // background
            },
            {
              data: values_neutral,
              borderColor: "#6B6C6D", // Border
              borderWidth: 1,
              lineTension: 0,
              pointBorderColor: "#6B6C6D", // Points
              pointBackgroundColor: "#6B6C6D",
              pointRadius: pointRadius,
              fill: false, // background
            },
            {
              data: values_negative,
              borderColor: "#A24C87", // Border
              borderWidth: 1,
              lineTension: 0,
              pointBorderColor: "#A24C87", // Points
              pointBackgroundColor: "#A24C87",
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
                  labelString: "Aantal tweets",
                },
                ticks: {
                  min: 0,
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
                  "positief: " + values_positive[tooltipItem.index],
                  "neutraal: " + values_neutral[tooltipItem.index],
                  "negatief: " + values_negative[tooltipItem.index],
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
