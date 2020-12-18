<template>
    <div class="customer-detail">
        <div class="customer-card">
            <div class="customer-card-left-top">
                <img src="@/assets/icon-wechat-fill@2x.png"/> 
                <span>微信</span>
            </div>
            <div class="customer-card-right-top">
                <img :src="identifier.avatar" />
            </div>
            <div class="customer-card-left-bottom">
                 <span>{{customerDetail.name}}</span>
                 <img v-if="customerDetail.gender === 1" src="@/assets/icon-client-male@2x.png"/>
                 <img v-else-if="customerDetail.gender === 2" src="@/assets/icon-client-female@2x.png"/>

                 <span v-else></span>

            </div>

        </div>
        <van-cell-group class="cell-wrap">
        <van-cell title="基本信息" is-link to="customerInfo" />
        <van-cell title="标签" :class="{'cell-tag':tagList.length}">
            <van-tag 
                    v-for="(tag, index) in tagList"
                    :key="index"
                    :color="'#F2F3F5'" 
                    text-color="#646566" 
                    type="danger">
                    {{tag.tag_name}}
            </van-tag>
        </van-cell>
        </van-cell-group>   
        <van-cell title="Linkflow标签组" is-link to="customerTag"  class="cell-wrap" />
        <!-- <van-cell title="添加时间" :value="customerDetail.user_createtime" to="index"   class="cell-wrap"/>   -->
        <van-cell title="添加时间" :value="customerDetail.user_createtime"  class="cell-wrap"/>  

        <van-button @click="handleOpenChatting" color="#2F7DCD" block>发消息</van-button>
    </div>
    
</template>
<script>

import { dateFormat } from '../../utils/utils'
import {  openChatting } from '../../utils/qywx.js'
import { customerMenu } from '../../customizeMenus.js'

    export default {
        name: 'customerDetail',
        data(){
            return {
                tagList: [
                    // '潜在客户',
                    // '上海下单客户',
                    // '首次购买',
                    // '自由职业',
                    // '20岁',
                    // 'VIP会员'
                ],
                identifier: {                
                },
                customerDetail: {

                }
            }
        },
        methods: {
            handleOpenChatting(){
                openChatting(this.customerDetail.externalid);
            }
        },
        async mounted(){
             
           if(this.$routeState === 'customerDetail'){
               this.customerDetail = await customerMenu();
           }else {
            this.customerDetail = JSON.parse(localStorage.getItem('customerDetail'));
           }
            console.log(this.customerDetail, 'customerDetail')
            if(this.customerDetail.tags){
                 this.tagList = this.customerDetail.tags.filter( item =>{
                return item.tag_name
            });
            }
            this.identifier = this.customerDetail.identifier || {};
            this.customerDetail.user_createtime = dateFormat(new Date(this.customerDetail.user_createtime*1000))
            // //创建会话权限配置
            //   const corpid =  this.$userInfo.corpid;
            //   const agentid = this.$userInfo.agentid;
            //     // getAgentidAPI({
            //     //     corpid
            //     // }).then( res => {
            //     bindWxOpenData(corpid, agentid);
            //     console.log(this.userinfo, 'userinfo')
            //     // })

            

        }
    }
</script>
<style lang="less">
    .customer-detail{
        .customer-card{
            position: relative;
            margin: 0.2rem 0.15rem;
            height: 1.62rem;
            background: #fff;
            box-shadow: 0px 0px 14px 0px rgba(168, 168, 168, 0.2);
            border-radius: 2px;
            border: 1px solid #D9D9D9;
            &-left-top{
                position: absolute;
                left: 0.2rem;
                top: 0.2rem;
                img{
                    width: 0.18rem;
                    margin-right: 0.06rem;
                    vertical-align: middle;
                }
                span{
                    font-size: 0.17rem;
                    // line-height: 0.24rem;
                    vertical-align: middle;
                }
            }
            &-right-top{
                position: absolute;
                right: 0.2rem;
                top: 0.2rem;
                  border-radius: 0.04rem;
                img{
                    width: 0.56rem;
                  
                }
            }
            &-left-bottom{
                position: absolute;
                left: 0.2rem;
                bottom: 0.2rem;
                font-weight: 500;
                img{
                    width: 0.18rem; 
                    vertical-align: middle;
                }
                span{
                    font-size: 0.2rem;
                    margin-right: 0.1rem;
                    color: #323233;
                    vertical-align: middle;
                }
            }
        }
        .cell-wrap{
            margin-bottom: 0.1rem;
            .cell-tag{
                padding: 0.1rem 0 0 0.16rem;
               
                .van-cell__title{
                    flex: 0 1 0.65rem;
                }
                .van-cell__value{
                    text-align: left;
                }
                .van-tag{
                    padding: 0.06rem 0.1rem;
                    margin: 0 0.1rem 0.1rem 0;
                     font-size: 0.14rem;
                }
            }
        }
        .van-button--default{
            margin: 0.1rem 0.15rem;
            border-radius: 0.05rem;
            width: 3.45rem;
            height: 0.46rem;
            font-size: 0.18rem;
        }
    }
</style>