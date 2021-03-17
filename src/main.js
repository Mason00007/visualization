import Vue from 'vue'
import './assets/base.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import API from './http/index.js'
import QS from 'qs'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ECharts from './components/Hechart.vue'
import * as echarts from 'echarts';
import world from './config/world.json';//世界地图

import './style/base.scss'//基本样式

import {VueMasonryPlugin} from 'vue-masonry';
Vue.use(VueMasonryPlugin)
Vue.config.productionTip = false
Vue.use(ElementUI);

echarts.registerMap('world', world);
//**********EChart表
Vue.component('chart', ECharts)
//axios
Vue.prototype.$API = API;
Vue.prototype.$QS = QS;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
