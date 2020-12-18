import Vue from 'vue'
import { APP_KEY, APP_SECRET } from '../const/const'



// ——————————— 服务端API ————————————

//获取用户信息
export function getUserInfoAPI( params ){
    const url = '/api/user/getUserInfo';
    return Vue.axios.get(url, {
              params,
            })
}

// //获取agentid
// export function getAgentidAPI( params ){
//   const url = '/test/getAgentid';
//   return Vue.axios.get(url, {
//             params,
//           })
// }


//获取签名
export function getSignatureAPI( params ){
  const url = '/test/getSignature';
  return Vue.axios.get(url, {
            params,
          })
}


//获取用户信息
export function getRecuitNumberAPI( params ){
  const url = '/api/external/getRecuitNumber';
  return Vue.axios.get(url, {
            params,
          })
}

//获取素材列表
export function getMaterialAPI( params ){
    const url = '/api/material/getMaterialUser';
    return Vue.axios.get(url, {
              params,
            })
}

//获取外部联系人列表
export function getExternalAPI( params ){
    const url = '/api/external/getExternalUser';
    return Vue.axios.get(url, {
              params,
            })
}

//获取外部联系人详情
export function getExternalDetailAPI( params ){
  const url = '/api/external/getExternalDetail';
  return Vue.axios.get(url, {
            params,
          })
}


//获取用户任务列表
export function getTaskUserAPI( params ){
  const url = '/api/task/getTaskUser';
  return Vue.axios.get(url, {
            params,
          })
}

//根据外部联系人数组获取 外部联系人详情
export function getExternalTaskAPI( params ){
  const url = '/api/task/getExternalTask';
  return Vue.axios.get(url, {
            params,
          })
}

//保存已完成任务的 外部联系人列表
export function saveCompletedAPI( data ){
  const url = '/test/saveCompleted';
  return Vue.axios.post(url, data)
}

// ——————————— linkflow API ————————————

//获取 Access Token
export function get_lf_accesstoken(){
  const url = '/linkflow/token';
  return Vue.axios.get(url, {
            headers: {
              'X-OpenApi-Key': APP_KEY,
              'X-OpenApi-Secret': APP_SECRET,
              },
            // params,
          }) 
        }

//获取客户详情
export function get_lf_external(params){
  const url = '/linkflow/identifiers';
  return Vue.axios.get(url,{
    params
  })
}


//获取客户详情
export function get_lf_groups(contactId){
  const url = `/linkflow/v2/contacts/${contactId}/groups`;
  return Vue.axios.get(url)
}



//获取联系人自定义字段元数据
export function get_lf_props(){
  const url = '/linkflow/v2/contacts/meta/properties';
  return Vue.axios.get(url)
}