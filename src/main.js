
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './service/axios'
import VueAxios from 'vue-axios'
import VConsole from 'vconsole/dist/vconsole.min.js'
// console.log(vConsole)

import { Tabbar, TabbarItem, Search, Card, Tab, Tabs, Tag, List, CellGroup, Cell, Button,Toast, Loading} from 'vant';
import 'vant/lib/index.css';

// 获取code
import { get_lf_accesstoken, getUserInfoAPI } from './service/api'
import { getQueryString } from './utils/utils'

const code = getQueryString('code');
if(!code){
  const state = getQueryString('state');
  const redirect_uri = process.env.VUE_APP_URL;
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww11eb75f29f111014&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_privateinfo&state=${state}#wechat_redirect`;
  
} else {
    console.time('首屏渲染')
    let vConsole = new VConsole()
    Vue.use(Tabbar);
    Vue.use(TabbarItem);
    Vue.use(Search);
    Vue.use(Card);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Tag);
    Vue.use(List);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Button);
    Vue.use(Toast);
    Vue.use(Loading);

    Vue.use(VueAxios,axios);



    const state= getQueryString('state');
    Vue.prototype.$routeState = state;
  
  // init函数定义
   async function init(){
  console.time('init')
    const lf_accesstoken = get_lf_accesstoken();
    const tx_userinfo = getUserInfoAPI({
      code,
    })

  const EventBus = new Vue();
    Object.defineProperties(Vue.prototype, {
      $bus: {
        get: function () {
          return EventBus
        }
      }
    })

   
    const userinfoRes = await tx_userinfo;
    console.log(userinfoRes, 'userinfoRes')

  //  .then( (res) => {
      Vue.prototype.isAuthorized = userinfoRes.data.data.isAuthorized;
      // alert('res.data.isAuthorized')
      Vue.prototype.$userInfo = userinfoRes.data.data.userinfo;
//       console.log(Vue.prototype.$userInfo,'Vue.prototype.$userInfo')
      Vue.config.productionTip = false;

      
      const tokenRes = await lf_accesstoken;
      Vue.prototype.$accessToken = tokenRes.data.token;
      Vue.prototype.$expiration = tokenRes.data.expiration
//       console.log(Vue.prototype.$accessToken, 'main.js');
   

     new Vue({
              router,
              render: h => h(App)
            }).$mount('#app')
      console.timeEnd('init')
    
    }
    init();
    console.timeEnd('首屏渲染')
  }

  