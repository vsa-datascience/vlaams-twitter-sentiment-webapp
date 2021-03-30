import Vue from 'vue'
import VueRouter from 'vue-router'
import GeneralSentiment from '../views/GeneralSentiment.vue'
import AbsoluteSentiment from '../views/AbsoluteSentiment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GeneralSentiment',
    component: GeneralSentiment
  },
  {
    path: '/absolute',
    name: 'AbsoluteSentiment',
    component: AbsoluteSentiment
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
