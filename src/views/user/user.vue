<template>
    <div class="user">
        <div class="profile-wrap">
            <div class="profile">
                <p>   
                    <ww-open-data type="userName" :openid="userinfo.userid" />
                </p>
                <p>{{userinfo.corpname}}</p>
            </div>
            <img class="avatar" :src="userinfo.avatar" />
            <img class="qrcode" :src="userinfo.qr_code"/>
        </div>
         <!-- <img class="wechat" src="@/assets/wechat.png">
        <p class="wechat-title">发送到微信</p> -->
    </div>
</template>
<script>
 import{ bindWxOpenData }from '../../utils/qywx.js'
//   import{ getAgentidAPI }from '../../service/api.js'

export default {
    name: 'user',
    data(){
        return {
            // avatar: this.$userInfo.qr_code,
            userinfo: this.$userInfo,

        }

    },
    mounted(){
        const corpid =  this.$userInfo.corpid;
        const agentid = this.$userInfo.agentid;
         bindWxOpenData(corpid, agentid);
    }
}
</script>
<style lang='less'>
.user{ 
    display: flex;
    flex-direction: column;
    align-items: center;
   
    .profile-wrap{
        position: relative;
        width: 3.03rem;
        height: 4.73rem;
        margin: 0.58rem auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
        .profile{
            position: absolute;
            top: 1.76rem;
            left: 0.18rem;
            color: #fff;
            font-size: 0.12rem;
            p:first-child {
                font-size: 0.21rem;
            }
        }
        .avatar{
            width: 100%;;
            height: 2.51rem;
        }
        .qrcode{
            margin-top: 0.18rem;
            width: 1.79rem;
            height: 1.78rem;
            // background: green;
        }
   

}
 .wechat{
        margin-top: 0.26rem;
        margin-bottom: 0.067rem;
        width: 0.28rem;
        height: 0.25rem;
    }
    .wechat-title{
        font-size: 0.12rem;
        color: #9B9B9B;
    }
}


</style>