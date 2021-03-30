<template>
  <v-container>
    <v-row>
      <h1 class="title">Algemene sentiment evolutie in Vlaanderen</h1>
    </v-row>
    <v-row>
      <div class="description">
        Evolutie van het algemene sentiment in Vlaanderen, gebaseerd op Twitter
        data. Het algemene sentiment is gedefinieerd als de verhouding van het
        aantal positieve tweets over het aantal positieve en negatieve tweets.
      </div>
    </v-row>

    <!-- Cards showing the numbers -->
    <v-row>
      <v-col>
        <number-card :number="total" text="Tweets geanalyseerd" />
      </v-col>
      <v-col>
        <number-card
          :number="positive"
          :percent="Math.round((100 * positive) / total)"
          text="Tweets met positief sentiment"
        />
      </v-col>
      <v-col>
        <number-card
          :number="neutral"
          :percent="Math.round((100 * neutral) / total)"
          text="Tweets met neutraal sentiment"
        />
      </v-col>
      <v-col>
        <number-card
          :number="negative"
          :percent="Math.round((100 * negative) / total)"
          text="Tweets met negatief sentiment"
        />
      </v-col>
    </v-row>

    <!-- Button selection -->
    <v-row style="align: center">
      <v-col>
        <v-btn
          elevation="2"
          block
          :class="graph_view === 'year' ? 'period-btn-pressed' : 'period-btn'"
          @click="show_year"
          >Afgelopen jaar</v-btn
        >
      </v-col>
      <v-col>
        <v-btn
          elevation="2"
          block
          :class="graph_view === 'month' ? 'period-btn-pressed' : 'period-btn'"
          @click="show_month"
          >Afgelopen maand</v-btn
        >
      </v-col>
      <v-col>
        <v-btn
          elevation="2"
          block
          :class="graph_view === 'week' ? 'period-btn-pressed' : 'period-btn'"
          @click="show_week"
          >Afgelopen week</v-btn
        >
      </v-col>
      <v-col>
        <v-menu
          offset-y
          :v-model="false"
          :nudge-width="-100"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              elevation="2"
              block
              :class="
                graph_view === 'select_dates' ? 'period-btn-pressed' : 'period-btn'
              "
              @click="show_select_dates"
              v-bind="attrs"
              v-on="on"
              >Kies periode</v-btn
            >
          </template>
          <v-date-picker
            v-model="selected_dates"
            no-title
            range
            color="#105269"
          />
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          offset-y
          :v-model="false"
          :nudge-width="-100"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              elevation="2"
              block
              :class="
                graph_view === 'select_day' ? 'period-btn-pressed' : 'period-btn'
              "
              @click="show_select_day"
              v-bind="attrs"
              v-on="on"
              >Kies dag</v-btn
            >
          </template>
          <v-date-picker
            v-model="selected_day"
            no-title
            color="#105269"
          />
        </v-menu>
      </v-col>
    </v-row>

    <!-- Line-chart -->
    <v-row>
      <v-col>
        <line-chart :chartData="lineSeries" lineColor="#105269" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "../components/SingleLineChart.vue";
import NumberCard from "../components/NumberCard.vue";
import moment from "moment";
import axios from "axios";

export default {
  name: "GeneralSentiment",
  components: {
    LineChart,
    NumberCard,
  },
  data() {
    return {
      url: 'https://sentiment-flanders.cloudar.be',
      total: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      lineSeries: [],
      graph_view: "week",
      selected_dates: this.get_past_week(),
      selected_day: this.get_2days_ago(),
    };
  },
  async created() {
    // this.graph_view = this.get_view_from_url();  TODO: Does not yet work
    this.fetch_week();
  },
  watch: {
    selected_dates: function () {
      if (this.graph_view != "select_dates") return; /* normally not the case */
      if (this.selected_dates.length == 1) return;
      this.fetch_select_dates(this.selected_dates[0], this.selected_dates[1]);
    },
    selected_day: function () {
      if (this.graph_view != "select_day") return; /* normally not the case */
      this.fetch_select_day(this.selected_day);
    },
  },
  methods: {
    show_year: function () {
      this.graph_view = "year";
      this.fetch_year();
    },
    show_month: function () {
      this.graph_view = "month";
      this.fetch_month();
    },
    show_week: function () {
      this.graph_view = "week";
      this.fetch_week();
    },
    show_select_dates: function () {
      this.graph_view = "select_dates";
      this.fetch_select_dates(this.selected_dates[0], this.selected_dates[1]);
    },
    show_select_day: function () {
      this.graph_view = "select_day";
      this.fetch_select_day(this.selected_day);
    },
    get_past_week: function () {
      return [moment(new Date().setDate(new Date().getDate() - 6)).format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')];
    },
    get_2days_ago: function () {
      return moment(new Date().setDate(new Date().getDate() - 2)).format('YYYY-MM-DD');
    },
    fetch_year: async function () {
      const { series } = (
        await axios.get(
          this.url + "/api/v1/impressions/monthly/last_year/?date="+moment(new Date()).format('YYYY-MM')
        )
      ).data;
      this.fill_parameters(series, "YYYY-MM");
    },
    fetch_month: async function () {
      const { series } = (
        await axios.get(
          this.url + "/api/v1/impressions/daily/last_month/?date="+moment(new Date()).format('YYYY-MM-DD')
        )
      ).data;
      this.fill_parameters(series, "MM-DD");
    },
    fetch_week: async function () {
      const { series } = (
        await axios.get(
          this.url + "/api/v1/impressions/daily/last_week/?date="+moment(new Date()).format('YYYY-MM-DD')
        )
      ).data;
      this.fill_parameters(series, "MM-DD");
    },
    fetch_select_dates: async function (from, to) {
      const { series } = (
        await axios.get(
          this.url + "/api/v1/impressions/daily/period/?start=" +
            from +
            "&end=" +
            to
        )
      ).data;
      this.fill_parameters(series, "YYYY-MM-DD");
    },
    fetch_select_day: async function (day) {
      const { series } = (
        await axios.get(
          this.url + "/api/v1/impressions/hourly/recent/?date=" +day
        )
      ).data;
      this.fill_parameters(series, "HHu");
    },
    reset_parameters: function () {
      this.total = 0;
      this.positive = 0;
      this.neutral = 0;
      this.negative = 0;
      this.lineSeries = [];
    },
    fill_parameters: function (series, format) {
      this.reset_parameters();
      series.forEach((d) => {
        // Increment tweet-counters
        this.total += Object.values(d.statistic).reduce((a, b) => a + b);
        this.positive += d.statistic.positive;
        this.neutral += d.statistic.neutral;
        this.negative += d.statistic.negative;

        // Add to lineSeries array
        const date = moment(d.date, "YYYY-MM-DD:HH").format(format);
        this.lineSeries.push({
          date,
          value:
            d.statistic.positive /
            (d.statistic.positive + d.statistic.negative), // TODO: Figure out right formula
          positive: d.statistic.positive,
          neutral: d.statistic.neutral,
          negative: d.statistic.negative,
        });
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  font: normal normal bold 32px/39px Helvetica Neue !important;
  letter-spacing: 0px;
  color: #105269;
  opacity: 1;
  margin: 16px;
}
.description {
  text-align: left;
  font: normal normal normal 14px/16px Helvetica Neue;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  margin-left: 16px;
  margin-bottom: 10px;
}
.period-btn {
  /* Fix duplication problem */
  white-space: normal;
  font: normal normal normal 14px/16px Helvetica Neue;
  letter-spacing: 0px;
  color: #105269 !important;
  opacity: 1;
  border: 1px solid #105168;
  background-color: #ffffff !important;
  border-radius: 0px;
  display: inline;
  height: 100% !important; /* not ignored! would be overwritten elsewhise */
  margin: 6px;
}
.period-btn-pressed {
  white-space: normal;
  font: normal normal normal 14px/16px Helvetica Neue;
  letter-spacing: 0px;
  color: #ffffff !important;
  opacity: 1;
  border: 1px solid #105168;
  background-color: #105269 !important;
  border-radius: 0px;
  display: inline;
  height: 100% !important; /* not ignored! would be overwritten elsewhise */
  margin: 6px;
}
.row {
  margin-left: 50px !important;
  margin-right: 50px !important;
}
</style>