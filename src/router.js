import Vue from 'vue'
import Router from 'vue-router'
import StreetList from "./components/StreetList";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'StreetList',
      component: StreetList,
    },
    {
      path: '/houses/:streetName/:streetInfoUrl',
      name: 'houses',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/HouseTable')
    }
  ]
})
