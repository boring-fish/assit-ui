<template>
<div class="customer-tag">
    <template v-if="hasInfo">
    <div class="tag-wrap tag-wrap-static">
        <h2 class="title">所在静态组</h2>
         <van-tag 
                    v-for="(tag, index) in staticList"
                    :key="index"
                    :color="'#F2F3F5'" 
                    text-color="#646566" 
                    >
                    {{tag}}
        </van-tag>
    </div>
    <div class="tag-wrap tag-wrap-dynamic">
        <h2 class="title">所在动态组</h2>
         <van-tag 
                    v-for="(tag, index) in dynamicList"
                    :key="index"
                    :color="'#E4F6F5'" 
                    text-color="#00B2A6" 
                    >
                    {{tag}}
        </van-tag>
    </div>
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
    import { get_lf_groups } from '../../service/api'
    import { noResult} from  '@/components'
    export default {
        name: 'customerTag',
         components:{
            'no-result':noResult
        },
        data(){
            return {
                hasInfo: false,
                staticList: [
                    // '星标组',
                    // '个性化标签',
                    // '高价值客户',
                    // 'LF营销沙龙扫码组',
                    // '发送短信',
                    // '群组分析',

                ],
                dynamicList: [
                    // '动态组企业微信',
                    // '腾讯短信',
                    // '性别',
                    // '领取卡券',
                    // '地域',
                    // '内置标签组',
                    // '最后一次活跃时间',
                    // '百度推广 cps 动态',
                    // '高价值客户',
                ],
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
              get_lf_groups(identifier.id).then( res => {
                  res.data.forEach( item =>{
                      if(item.groupType === 'static'){
                          this.staticList.push(item.name)
                      }else if(item.groupType === 'dynamic'){
                          this.dynamicList.push(item.name)
                      }
                  })
              })
             }
        }
    }

</script>
<style lang="less">
    .customer-tag{
        .tag-wrap{
            margin-top: 0.1rem;
            background: #fff;
            padding: 0.16rem 0.04rem 0.16rem 0.16rem;
            // &-static{
            //     height: 2.12rem;
            // }
            // &-dynamic{
            //     height: 2.61rem;
            // }
            .title{
                font-size: 0.16rem;
                font-weight: normal;
                color: #323233;
                margin-bottom: 0.04rem;
            }
            .van-tag{
                padding: 0.16rem 0.1rem;
                height: 0.4rem;
                font-size: 0.15rem;
                margin: 0.12rem 0.12rem 0 0;
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