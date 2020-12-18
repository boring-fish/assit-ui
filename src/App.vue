<template>
  <div id="app">
    <router-view/>
    <van-tabbar 
      v-model="active" 
      @change="onChange"
      :route ="true"
      active-color="#2F7DCD" 
      inactive-color="#787878">
      <van-tabbar-item name="home" to="/" icon="comment">看板</van-tabbar-item>
      <van-tabbar-item name="customer" to="/customer" icon="friends">客户</van-tabbar-item>
      <van-tabbar-item name="material" to="/material" icon="photo" >素材</van-tabbar-item>
      <van-tabbar-item name="user" to="/user" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  // import{ bindWxOpenData }from './utils/utils.js'
  // import{ getAgentidAPI }from './service/api.js'
export default {
  name: 'app',
  data(){
    return {
      active: 0,
    }
  },
  methods: {
    onChange(){
      // this.
    }
  },
  mounted(){
    // const corpid =  this.$userInfo.corpid;
    // console.log(corpid, 'this.$userInfo.corpid')
    //     getAgentidAPI({
    //         corpid
    //     }).then( res => {
    //      bindWxOpenData(corpid, res.data.agentid);
    //      console.log(this.$userInfo, 'userinfo')
    //     })
  }
}
</script>
<style lang="less">
html, body{
  height: 100%;
}
#app {
  font-size: 0.12rem;
  min-height: 100%;
  margin-bottom: 0.75rem;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 0.12rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F7F8FA;
  .van-tabbar {
    height: 0.5rem;
    padding-bottom: 0.25rem;
  }
}
</style>
