import Vue from 'vue'
import { wxConfig, getCurExternalContact} from './utils/qywx.js'
import { renderAvatar} from './utils/business.js'

import { getExternalDetailAPI, get_lf_external} from './service/api'
import { channelType } from './const/const'


function customerMenuResolve(data,resolve){
    localStorage.setItem('customerDetail', JSON.stringify(data));
    console.log(data,'最后的data')
    Vue.prototype.$routeState = '';
    console.timeEnd('customerMenu')
    resolve(data);
}

export function customerMenu(){
  console.time('customerMenu')
  console.log('执行了customerMenu')
  const { corpid,userid, agentid } =  Vue.prototype.$userInfo;

   return new Promise((resolve,reject)=> {
    wxConfig(corpid, agentid, ['openEnterpriseChat','getCurExternalContact']).then(()=>{
      console.log('wxConfig执行完了')

      getCurExternalContact().then( externalid => {
          getExternalDetailAPI({
            corpid,
            userid,
            externalid,
          }).then( res => {
            const data = res.data.data
            if( data.unionid ){
                get_lf_external({
                  externalId: data.unionid,
                  channelId: corpid,
                  channelType,
                  }).then( lfres => {
                    console.log('linkflow接口调用成功')
                    data.identifier = lfres.data;
                    customerMenuResolve(data,resolve);
                }, ()=>{
                  console.log('linkflow接口调用失败')
                  renderAvatar(data);
                  customerMenuResolve(data,resolve)
                })    
            }else {
              console.log('没有unionid')
              renderAvatar(data);
              customerMenuResolve(data,resolve)
            }
          
          })
      }, (err)=> {
        console.log(err)
      })
      
    },(err)=>{
      console.log(err,'customerMenu')
    });
   })
}

export function materialMenu(){
    
}