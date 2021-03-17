import axios from 'axios';
// import {getCookie} from '../utils/util'

var instance = axios.create({ 
    baseURL:'http://192.168.3.86:5000/',
    //baseURL:'/api',
    timeout: 1000 * 20,
    // 'Content-Type':'application/x-www-form-urlencoded'

});
// axios.interceptors.request.use(
//     config => {
//       const token = getCookie('csrf_token'); //获取Cookie
      
//       window.console.log('8888888888888888',config)
//     //   config.data = JSON.stringify(config.data);
//       config.headers = {
//         'X-CSRFToken':JSON.stringify(token) //设置跨域头部
//       };
//     //   if (token) {
//     //     config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
//     //   }
//       return config;
//     },
//     err => {
//       return Promise.reject(err);
//     }
//   );

axios.defaults.withCredentials = true;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default instance;