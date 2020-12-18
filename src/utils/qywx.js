import{ getSignatureAPI }from '../service/api.js'
const wx = window.wx;
const jsApiListDefault = [];


export function wxConfig(corpid, agentid, jsApiList){
  jsApiList = jsApiList || jsApiListDefault;

  return new Promise((resolve, reject) => {
    getSignatureAPI({
      corpid,
      url: location.href.split("#")[0],
      type: 'config'
    }).then( res => {
          console.log(res, 'timestamp, nonceStr, signature等信息')
          console.log('---------开始执行wx.confg,开启debug模式---------')
          const {timestamp, nonceStr, signature} = res.data;
          wx.config({
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: corpid, // 必填，企业微信的corpID
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        wx.ready(function(){
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          console.log('-------------开始执行wx.ready-----------------')
          getSignatureAPI({
              corpid,
              url: location.href.split("#")[0],
              type: 'agentConfig'
          }).then( agentConfig => {
              console.log(agentConfig,'agentConfig的签名等信息')
              wx.agentConfig({
                  debug: false,
                  corpid: corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
                  agentid, // 必填，企业微信的应用id （e.g. 1000247）
                  timestamp: agentConfig.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: agentConfig.data.nonceStr, // 必填，生成签名的随机串
                  signature: agentConfig.data.signature,// 必填，签名，见附录-JS-SDK使用权限签名算法
                  jsApiList, //必填
                  success: function(msg) {
                  //   wx.checkJsApi({
                  //     jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                  //     success: function(res) {
                  //       console.log(res,'____________wx.checkJsApi返回值___________')
                  //         // 以键值对的形式返回，可用的api值true，不可用为false
                  //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                  //     }
                  // });
                    console.log(msg,'agentConfig成功');
                    resolve(msg);
                    // console.log(location.href, 'location.href')  
                  },
                  fail: function(msg) {
                      console.log(msg, 'gentConfig失败msg')
                      if(msg.errMsg.indexOf('function not exist') > -1){
                          alert('版本过低请升级')
                      }
                      reject(msg);
                  }
              });
          })
        });
        wx.error(function(res){
          console.log(res)
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      
    })
  })
}


export function bindWxOpenData(corpid, agentid, jsApiList){
    wxConfig( corpid, agentid, jsApiList ).then(()=>{
        const WWOpenData = window.WWOpenData || window.parent.WWOpenData;
   
    // console.log(WWOpenData,'WWOpenData')
    // console.log(window.top.WWOpenData,window.top,'window.top')
 
        if (WWOpenData.checkSession) {
            WWOpenData.checkSession({
                success() {
                    console.info('open-data 登录态校验成功')
                },
                fail() {
                    console.error('open-data 登录态过期')
                },
            })
        }
        WWOpenData.bindAll(document.querySelectorAll('ww-open-data'))
    })
  
}

//获取当前外部联系人
export function getCurExternalContact(){
    return  new Promise ((resolve, reject) => {
        wx.invoke('getCurExternalContact', {
        }, function(res){
            if(res.err_msg == "getCurExternalContact:ok"){
                console.log(res.userId,'当前外部联系人userId'); //返回当前外部联系人userId
                resolve(res.userId);           
            }else {
                // console.log()//错误处理
                reject('当前外部联系人userId获取失败')
            }
        });
    })
}

export const openChatting = function(externalUserIds){
  // console.log(wx.openEnterpriseChat, 'wx.openEnterpriseChat')
    wx.openEnterpriseChat({
    // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
    userIds: '',    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
    externalUserIds, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
    groupName: '',  // 必填，会话名称。单聊时该参数传入空字符串""即可。
    success: function(res) {
    // 回调
    console.log(res,'打开聊天窗成功')
    },
    fail: function(res) {
      console.log(res.errMsg,'打开聊天窗失败')
      alert(res.errMsg)
        if(res.errMsg.indexOf('function not exist') > -1){
        alert('版本过低请升级')
      }
    }
  });
}