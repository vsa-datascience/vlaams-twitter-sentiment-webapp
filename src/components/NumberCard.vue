<template>
  <v-card elevation="2" class="card">
    <v-row no-gutters align="center">
      <v-card-text class="card-number" v-if="percent">
        {{ number }} ({{ percent }}%)
      </v-card-text>
      <v-card-text class="card-number" v-else> {{ number }} </v-card-text>
    </v-row>
    <v-row no-gutters align="center">
      <v-card-text class="card-text"> {{ text }} </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
    },
    percent: {
      type: Number,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style scoped>
.card {
  background: #eeeeee 0% 0% no-repeat padding-box !important;
  height: 100%;
  opacity: 1;
  border-radius: 0px !important;
}
.card-number {
  text-align: center;
  font: normal normal bold 24px/29px Helvetica Neue !important;
  letter-spacing: 0px;
  color: #105269;
  padding: 2px;
  padding-top: 10px;
  opacity: 1;
}
.card-text {
  text-align: center;
  font: normal normal normal 12px/14px Helvetica Neue !important;
  letter-spacing: 0px;
  color: #105269;
  padding: 2px;
  padding-bottom: 10px;
  opacity: 1;
}
</style>