console.time('main')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './service/axios'
import VueAxios from 'vue-axios'

import VConsole from 'vconsole/dist/vconsole.min.js'
let vConsole = new VConsole()
console.log(vConsole)

import { Tabbar, TabbarItem, Search, Card, Tab, Tabs, Tag, List, CellGroup, Cell, Button, Toast, Loading} from 'vant';
import 'vant/lib/index.css';
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
import { get_lf_accesstoken } from './service/api'
import { customerMenu } from './customizeMenus.js'

async function init(){
  const lf_accesstoken = get_lf_accesstoken();
  const accessTokenRes = await lf_accesstoken;
  Vue.prototype.$accessToken = accessTokenRes.data.token;
  Vue.prototype.$expiration = accessTokenRes.data.expiration

  console.log(Vue.prototype.$accessToken , 'Vue.prototype.$accessToken')
  
  Vue.config.productionTip = false
  Vue.prototype.$isAuthorized = true;
    // alert('res.data.isAuthorized')
    Vue.prototype.$userInfo = {
        "errcode": 0,
        "errmsg": "ok",
        "corpid":"ww0b8772cfc1ed757c",
        "corpname": "上海犀否信息科技有限公司",
        "agentid": 1000078,
        // "userid":"YeXunXunZhi",
        // "name":"YeXunXunZhi",
        // "userid":"4e19f6e5c1e90b9561272ec56907cd7d",//Martin
        // "name":"4e19f6e5c1e90b9561272ec56907cd7d",
        "userid":"142a53298b6c5b5a8a9518aa8c0eb5f8",
        "name":"142a53298b6c5b5a8a9518aa8c0eb5f8",

        "gender":"1",
        "avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598447370479&di=c94d264614f582282b29a648eebaa8c9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018164757_okcuo.thumb.700_0.jpeg",
        "qr_code":"https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcfc13b01dfs78e981c"
     };
    //   totalNum: 2000,
    //   todayNum: 10
    // };
   new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
  
}

init();




 
  


