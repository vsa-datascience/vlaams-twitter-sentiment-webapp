<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Array,
    },
  },
  mounted() {
    this.render();
  },
  watch: {
    chartData: function () {
      this.render();
    },
  },
  methods: {
    render: function () {
      const dates = this.chartData.map((d) => d.date);
      const positive = this.chartData.map((d) => d.positive);
      const neutral = this.chartData.map((d) => d.neutral);
      const negative = this.chartData.map((d) => d.negative);

      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              label: "Positive",
              backgroundColor: "#81C784aa",
              data: positive,
            },
            {
              label: "Neutral",
              backgroundColor: "#CFD8DCaa",
              data: neutral,
            },
            {
              label: "Negative",
              backgroundColor: "#FF6E40aa",
              data: negative,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
          tooltips: {
            mode: "label",
            callbacks: {
              label: function (tooltipItem, data) {
                var dstLabel = data.datasets[tooltipItem.datasetIndex].label;
                var yLabel = tooltipItem.yLabel;
                return dstLabel + ": " + yLabel;
              },
            },
          },
        }
      );
    },
  },
};
</script>
