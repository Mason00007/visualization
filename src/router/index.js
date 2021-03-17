import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeOne from '../views/HomeOne'
import HomeTwo from '../views/HomeTwo'
import HomeThree from '../views/HomeThree'
import HomeBarRace from '../views/HomeBarRace'
import HomeBarRaceTwo from '../views/HomeBarRaceTwo'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/HomeOne',
    name: 'HomeOne',
    component: HomeOne
  },
  {
    path: '/HomeTwo',
    name: 'HomeTwo',
    component: HomeTwo
  },
  {
    path: '/HomeThree',
    name: 'HomeThree',
    component: HomeThree
  },
  {
    path: '/HomeBarRace',
    name: 'HomeBarRace',
    component: HomeBarRace
  },
  {
    path: '/HomeBarRaceTwo',
    name: 'HomeBarRaceTwo',
    component: HomeBarRaceTwo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
