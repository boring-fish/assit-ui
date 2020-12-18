<template>
    <div class="customer">
      <van-tabs   
        :class="{ fixedStyle : true}" 
        v-model="active"  
        @change="handleChangeTab">
        <van-tab 
            v-for="item in tab" 
            :title="item" 
            :key="item.name">
            <div  v-if="totalStatus">
                  <van-search 
                        ref="search"
                        shape="round" 
                         v-model="searchTitle" 
                        @search="onSearch"
                        placeholder="根据标签和姓名搜索" >
                 </van-search>
                <div v-if="!searchNoResStatus">
                    <p class="total">共{{total}}个会员</p>
                    <van-list
                            ref="scroller"
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                    >
                       <van-card
                            v-for="( item, index) in list" 
                            :key="index" 
                            :title="item.name"
                            :thumb="item.identifier?item.identifier.avatar:require( '@/assets/loading.gif')"
                            @click="handleGoRoute('customerDetail', item)"
                            :class="{'van-card-active': index === activeCard}"
                       >
                            <template #tags>
                                    <van-tag 
                                        v-for="(tag, index) in item.tags"
                                        :key="index"
                                        :color="'#F2F3F5'" 
                                        text-color="#646566" 
                                        type="danger">
                                        {{tag.tag_name}}
                                    </van-tag>
                            </template>
                        </van-card>      
                    </van-list> 
                </div>
                <div v-else>
                    <search-no-res></search-no-res>
                </div>
            </div>
          <div v-else>
               <no-result :noInfo="noInfo"></no-result>
          </div>
        </van-tab>
      </van-tabs>
      
      
    </div>
</template>
<script>
// 
import { getExternalAPI, get_lf_external} from '../../service/api'

import { HeaderPositionMixin } from '../../mixins/touch'
import { channelType } from '../../const/const'
import { searchNoRes, noResult} from  '@/components'
import { renderAvatar} from '../../utils/business.js'


export default {
    name: 'customer',
    mixins: [HeaderPositionMixin],
    components:{
    'search-no-res':searchNoRes,
    'no-result':noResult
},
    data(){
        return {
            tab: ['今日招募','全部招募'],
            list: [],
            total: 0,
            loading: false,
            finished: false,
            active: 0,
            activeCard: -1,
            page: 0,
            size: 7,
            loadTotal: 0,
            searchStatus:false,
            searchNoResStatus:false,
            totalStatus:true,
            searchTitle:'',
            noInfo:{
                imgurl:require('@/assets/client-no-data@3x.png'),
                text:'暂无今日招募客户'
            }
        }
    },
     watch: {
          searchTitle: {
               handler:function(newVal, oldVal){
                   if(newVal==''){
                      this.list = [];
                    this.page = 0;
                    this.loadTotal = 0;
                    this.total = 0;
                    this.onLoad()
                   }
                   
                   
            },
        },
     
    },
    methods: {
        handleChangeTab(){
            // console.log('-------------------切换tab--------------------')
            this.list = [];
            this.page = 0;
            this.loadTotal = 0;
            this.total = 0;
            this.totalStatus=true;
            this.searchStatus=false;

            this.finished = false;
            this.loading = false;
            this.searchTitle='';
        },
        onLoad() {
            console.time('serverless')
            const active = this.active;
            const page = this.page;
            getExternalAPI({
                corpid: this.$userInfo.corpid,
                userid: this.$userInfo.userid,
                page: this.page,
                size: this.size,
                type: this.active,
                title:this.searchTitle
            }).then( res => {
                   console.log(res);
                //切换标签时，防止异步渲染出错
                if( active !== this.active) return;
                if( page === 0){
                    this.list = [];
                    this.page = 0;
                    this.loadTotal = 0;
                }

                this.total = res.data.data.total;
                // if( this.total===0){
                //     this.totalStatus=false;
                // }
                  if(this.total===0 && this.searchStatus){
                    this.searchNoResStatus=true;
                }else if( this.total===0 && !this.searchStatus){
                    this.totalStatus=false;
                }else if(this.total!==0){
                     this.searchNoResStatus=this.searchStatus=false;
                     this.totalStatus=true;
                }
                this.loadTotal += res.data.data.list.length;
                if(this.loadTotal === this.total){
                    this.finished = true;
                }             
                      
                this.page++;
                const start = this.list.length;
                this.list.push(...res.data.data.list);
                console.timeEnd('serverless')
                 this.loading = false;      
                this.$nextTick( ()=>{

                    if(res.data.data.list.length){
                        // if(res.data.data.list[0].unionid){
                             console.time('linkflow')
                            this.requestIdentifier(res.data.data.list, start);
                        // } else {
                        //     this.$toast.fail('Access_token获取失败，无法获取客户详情！');
                        // }
                    }
                })
            })
        },
        async requestIdentifier(list,start){
             const fnList = [];
            for(let i =0; i < list.length; i++ ){
                // console.log(i)
                if( list[i].unionid ){
                        fnList.push(
                        get_lf_external({
                        externalId: list[i].unionid,
                        channelId: this.$userInfo.corpid,
                        channelType,
                        })
                    );
                } else {
                    fnList.push(null);
                }
                
            }
        
            for(let i =0; i < list.length; i++ ){
                if(fnList[i]){
                    // console.log(list[i].name)
                    try{
                        const res = await fnList[i];
                        list[i].identifier = res.data
                    }catch( err){
                       renderAvatar(list[i]);
                    }finally{
                        // console.log(list[i], 'list[i]',i)     
                        
                    }  
                } else {
                    // this.renderAvatar(list[i]);
                    renderAvatar(list[i]);

 
                }
                
            }
            // console.log(start, list.length, list) 
             console.timeEnd('linkflow')
            this.list.splice( start, list.length, ...list);
          
        },
        handleClickCard(index){
            this.activeCard = index;
        },

      handleGoRoute(route,item){
          localStorage.setItem('customerDetail', JSON.stringify(item));
          this.$router.push(route);
      },
    onSearch(val){
            this.list = [];
            this.page = 0;
            this.loadTotal = 0;
            this.total = 0;
            this.totalStatus=true;
            this.searchStatus=true;
            this.finished = false;
            this.loading = false;
            this.onLoad();
        },


    },
    mounted(){
    // console.log(this.$route, 'route')
    const { active } = this.$route.query;
    this.active = active? parseInt(active): 0;
    }
}
</script>
<style lang='less'>
.customer{ 
    padding-top: 44px;
    .van-tabs__line{
        background-color: #2F7DCD;
    }

    .van-cell {
    line-height: 20px;
}
    
    .fixedStyle { 
        .van-tabs__wrap {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 998
        }
        
    }
    .van-card {
        padding: 0.16rem;
        margin-bottom: 0.1rem;
        background-color: #fff;
        .van-card__content{
            min-height: auto;
             .van-card__title{
            max-height: none;
            font-size: 0.16rem;
            line-height: 0.2rem;
        }
        }
       
        .van-card__thumb{
            width: 0.48rem;
            height: 0.48rem;

        }
        .van-tag{
             margin-top: 0.08rem;
             margin-right: 0.08rem;
        }
    }
    .van-card-active {
        background-color: #F2F3F5;
        .van-tag {
            background-color: #fff !important;
            color: #646566 !important;
        }
    }
    .total {
        height: 0.34rem;
        line-height: 0.34rem;
        padding-left: 0.15rem;
        font-size: 0.13rem;
        color: #969799;
    }
}


</style>