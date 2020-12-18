import Vue from 'vue'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
    if(/^\/linkflow\//.test(config.url) && config.url !== '/linkflow/token'){
        if(Vue.prototype.$expiration){
            //token过期
            // console.log('后期处理token过期情况')
        }
        console.log(config)
        config.headers['X-OpenApi-Token'] = Vue.prototype.$accessToken;
    }
return config;
}, function (error) {
return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
return response;
}, function (error) {
return Promise.reject(error);
});

export default axios;