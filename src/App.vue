<template>
  <v-app>
    <v-navigation-drawer app permanent clipped>
      <v-list>
        <v-list-item>
          <v-list-item-title
            style="font: normal normal normal 18px/22px Helvetica Neue"
          >
            Vlaams Sentiment
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="item in navbarlist"
          :key="item.route"
          :to="item.route"
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->
          <v-list-item-content class="navigation-title">{{
            item.text
          }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#EEEEEE">
      <div class="d-flex align-center">
        <v-row align="center">
          <v-col>
            <v-img
              alt="Statistiek Vlaanderen Logo"
              class="shrink mr-2"
              contain
              src="https://sentiment-flanders.radix.sh/logo.png"
              transition="scale-transition"
              width="140"
            />
          </v-col>

          <v-col
            v-for="[i, title] in [
              'Vlaanderen',
              '/',
              'Statistiek Vlaanderen',
              '/',
              'Sentiment Analyse',
            ].entries()"
            :key="i + title"
            style="padding: 6px"
          >
            <v-toolbar-title
              :class="title == '/' ? 'toolbar-dash' : 'toolbar-title'"
              >{{ title }}</v-toolbar-title
            >
          </v-col>
          <!-- <v-col>
            <v-toolbar-title class="toolbar-dash"> \ </v-toolbar-title>
          </v-col> -->
        </v-row>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default {
  name: "App",
  data: () => ({
    navbarlist: [
      { text: "Algemeen sentiment", route: "/" },
      { text: "Opgesplitst per type", route: "/absolute" },
    ],
  }),
};
</script>

<style scoped>
.toolbar-title {
  text-align: center;
  font: normal normal normal 18px/22px Helvetica Neue;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
}
.toolbar-dash {
  text-align: center;
  font: normal normal normal 32px/42px Helvetica Neue;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  font-size: 48px;
  font-weight: 100;
}
.navigation-title {
  text-align: left;
  font: normal normal normal 12px/14px Helvetica Neue;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  padding-left: 12px;
}
</style>
