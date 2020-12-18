<template>
    <div class="customer-info">
       <template v-if="hasInfo">
            <van-cell-group class="cell-wrap">
            <van-cell title="ID" :value="info.id"/>
            <van-cell title="名称" :value="info.name"/>
            <van-cell title="昵称" :value="info.nickname"/>
            <van-cell title="性别"  class="cell-sex">
               <template v-if="info.gender == 'male'">
                    <img src="@/assets/icon-client-male@2x.png"/>
                    <span>男</span>
               </template>
                <template v-else>
                    <img src="@/assets/icon-client-female@2x.png"/>
                    <span>女</span>
               </template>
            </van-cell>
            <van-cell v-if="info.mobilePhone" title="手机号码" :value="info.mobilePhone"/>
            <van-cell v-if="info.email" title="电子邮箱" :label="info.email"/>
             <van-cell v-for=" item in propsList" :key="item.key" :title="item.key" :value="item.value" />
            

        </van-cell-group>
         <van-cell-group class="cell-wrap">
             <van-cell title="国家" :value="info.country"/>
            <van-cell  v-if="info.state" title="地区" :value="info.state"/>
            <van-cell  v-if="info.street" title="地区" :value="info.street"/>
            <van-cell  v-if="info.city" title="地区" :value="info.city"/>
            <van-cell  v-if="info.comments" title="评论" :value="info.comments"/>
            <van-cell  v-if="info.website" title="网站" :value="info.website"/>
            <van-cell v-if="info.source" title="来源" :value="info.source"/>
            <van-cell v-if="info.campaign" title="活动" :value="info.campaign"/>
            <van-cell v-if="info.medium" title="方式" :value="info.medium"/>
            <van-cell v-if="info.content" title="内容" :value="info.content"/>
            <van-cell v-if="info.comments"  title="备注" :label="info.comments"/>
            <van-cell v-if="info.website"  title="网站" :label="info.website"/>
         </van-cell-group>
          <van-cell-group class="cell-wrap cell-time">
            <van-cell title="新建时间" :value="info.dateCreated"/>
            <van-cell title="更新时间" :value="info.lastUpdated"/>
         </van-cell-group>
           <!-- <van-cell-group class="cell-wrap">
            <van-cell title="整数类型" value="200"/>
            <van-cell title="数字类型" value="97.8"/>
             <van-cell title="日期类型" value="2020-08-08 12:30:00"/>
            <van-cell title="纪念日类型" value="2018-06-01"/>
            <van-cell title="字符串" label="内容"/>
           
         </van-cell-group> -->
       </template>
       <!-- <div v-else class="no-info">
           <img src="@/assets/no-data@2x.png"/>
           <p>暂无数据</p>
       </div> -->
         <div v-else>
            <no-result :noInfo="noInfo"></no-result>
         </div>
    </div>
    
</template>
<script>
import{ get_lf_props } from '../../service/api'
import { noResult} from  '@/components'

    export default {
        name: 'customerInfo',
        components:{
            'no-result':noResult
        },
        data(){
            return {
                tagList: [
                    '潜在客户',
                    '上海下单客户',
                    '首次购买',
                    '自由职业',
                    '20岁',
                    'VIP会员'
                ],
                info: {

                },
                hasInfo: false,
                noInfo:{
                        imgurl:require('@/assets/no-data@3x.png'),
                        text:'暂无数据'
                        }
            }
        },
        mounted(){
            const {identifier} = JSON.parse(localStorage.getItem('customerDetail'));
            if(identifier.id){
                this.hasInfo = true;
                 this.info = identifier
            console.log(this.info,'info')
            const props = this.info.props;
            if(Object.getOwnPropertyNames(props).length){
                get_lf_props.then( res => {

                    for( let key in props){
                        this.propsList.push( {
                            key: props[key],
                            value: res.data.filter( item =>{
                                return item.alias === props[key]
                            })[0].label
                        })
                    }
                    
                })

            }
            } 
           
        }
    }
</script>
<style lang="less">
    .customer-info{
        padding: 0.1rem 0;
        .cell-sex{
            img{
                    width: 0.14rem;
                    margin-right: 0.08rem;
                    vertical-align: middle;
            }
            span{
                font-size: 0.14rem;
                // line-height: 0.24rem;
                vertical-align: middle;
            }
        }
   
        .cell-wrap{
            margin-bottom: 0.1rem;
        }
        .cell-time {
            .van-cell__title{
                flex: 0 1 1rem;
            }
        }
        .no-info{
            display: flex;
            align-items: center;
            padding-top: 1.5rem;
            flex-direction: column;
            img{
                width: 1.2rem;
            }
            p{
                 font-size: 0.14rem;
                color: #969799;
            }
        }
    }
</style>

{
    "dateCreated": "2019-06-25 18:10:50",
    "lastUpdated": "2020-04-08 17:05:52",
    "ver": 50,
    "id": 19461,
    "anonymousId": "o0ZYI1Tx1WHnV06",
    "name": "小程序test",
    "nickname": "片叶",
    "gender": "male",
    "avatar": "http://thirdwx.qlogo.cn/mmopen/ukl",
    // "mobilePhone": "13800000000",
    // "email": "email",
    "country": "China",
    // "state": "Jiangsu",
    // "street": "",
    // "city": "Nanjing",
    // "comments": "test_wei",
    // "website": "",
    "utm": {
        "source": "source",
        "campaign": "campaign",
        "medium": "medium",
        "content": "content"
    },
    "props": {
        "attr1": "单身",
        "attr2": 10000
    },
    "isAnonymous": false,
    "lastSeen": "2020-04-14 15:28:53",
    // "lastTagged": "2019-11-18 23:24:59",
    "identified": "2019-06-25 18:10:50",
    "openIds": []
}