<template>
    <div class="material">
      <div v-if="totalStatus">
             <van-search 
            ref="search"
            :class="{ fixedStyle : true}"
            v-model="searchTitle" 
            shape="round"  
            @search="onSearch"
            placeholder="根据图文标题查询" >
        </van-search>
        <div v-if="!searchNoResStatus">
             <van-list
            ref="scroller"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
         
            >
            <van-card
            v-for="item in list" 
            :key="item.id" 
            :title="item.title"
            :thumb="item.thumb"
            @click="handleOpenImg(item.link)"
            >
                 <template #desc>
                     <div class="desc-wrap">
                        <div class="template-desc">{{item.desc}}</div>
                     </div>
                </template>
                 <template #num>
                    <div>{{item.updatetime}}</div>
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
      
    </div>
</template>
<script>
import { getMaterialAPI } from '../../service/api'
import { HeaderPositionMixin } from '../../mixins/touch'
import {searchNoRes, noResult} from  '@/components'

export default {
    name: 'material',
    mixins: [HeaderPositionMixin],
    components:{
         'search-no-res':searchNoRes,
         'no-result':noResult
        },
    data(){
        return {
            searchTitle: '',
            list: [],
            total: 0,
            page: 0,
            size: 7,
            loadTotal: 0,
            loading: false,
            finished: false,
            searchStatus:false,
            searchNoResStatus:false,
            totalStatus:true,
            noInfo:{
                        imgurl:require('@/assets/no-data@3x.png'),
                        text:'暂无数据'
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
        onSearch(){
            this.page = 0;
            this.loadTotal = 0;
            this.searchStatus=true;
            this.list = [];
            this.onLoad();
        },
        onLoad() {
            getMaterialAPI({
                page: this.page,
                size: this.size,
                title: this.searchTitle,
                userid: this.$userInfo.userid,
            }).then( res => {
                const data = res.data.data
                this.total = data.total;
                this.loadTotal += data.list.length;
                // this.total=3;
                if(this.total===0 && this.searchStatus){
                    this.searchNoResStatus=true;
                }else if( this.total===0 && !this.searchStatus){
                    this.totalStatus=false;
                }else if(this.total!==0){
                     this.searchNoResStatus=this.searchStatus=false;
                     this.totalStatus=true;
                }
                if(this.loadTotal === this.total){
                    this.finished = true;
                }             
                this.list.push(...data.list);
                this.loading = false;            
                this.page++;
            })
        },
        onRefresh(){
            console.log('1111')
        },
        handleOpenImg(link){
            window.open(link)
        }
    },
     mounted(){
         console.log('1111')
     }
}
</script>
<style lang='less'>
.material{ 
    padding-top: 54px;
    .van-card {
        padding: 0.11rem 0.15rem 0.11rem 0.18rem;
        background-color: #fff;
        margin-top: 0.1rem;
        cursor: pointer;
         .van-card__content{
            min-height: auto;
             .van-card__title{
            max-height: none;
            font-size: 0.16rem;
            line-height: 0.22rem;
            }
            .desc-wrap{
                position: relative;
            }
            .template-desc{
                // position: relative;
                // height: 0.34rem;
                font-size: 0.12rem;
                color: #646566;
                word-break: break-all;
                // overflow: hidden;
                margin: 0.08rem 0;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:2;//想要的行数
                -webkit-box-orient:vertical;
            }
            // .template-desc:after {
            //         content: '…';
            //         text-indent: 0;
            //         position: absolute;
            //         bottom: 0;
            //         right: 0;
            //         background: #fff;
            //         padding-left: 0.03rem;
            //     }
         }
    }

    .fixedStyle { 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 998
    }

}


</style>