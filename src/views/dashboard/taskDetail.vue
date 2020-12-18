<template>
    <div class="task-detail">
        <van-loading  v-if="pendingLoading || compeletedLoading" class="list-loading" size="24px" vertical>加载中...</van-loading>
        <template>
            <p class="title" v-if="pendingList.length">
                <span class="text">待完成</span>
                <span class="number">({{pendingList.length}})</span>
            </p>
                <div  v-for="(item, index) in pendingList" 
                        :key="item.name" 
                        class="list-wrap"
                        > 
                        <div class="check-icon" @click="handleComplete(index)" >
                            <img src="@/assets/checkbox-circle-default@2x.png" />
                        </div>
                
                    <van-card
                        :title="item.name"
                        :thumb="item.identifier?item.identifier.avatar:require( '@/assets/loading.gif')"
                        @click="handleGoRoute('customerDetail', item)"
                        :class="{'van-card-active': index === activeCard}"
                    >
                        <template #tags>
                            <van-tag 
                                v-for="(tag) in item.tags"
                                :key="tag.tag_name"
                                :color="'#F2F3F5'" 
                                text-color="#646566" 
                                type="danger">
                                {{tag.tag_name}}
                            </van-tag>
                        </template>
                    </van-card>   
                </div>   
            <p class="title"  v-if="completedList.length">
                <span class="text">已完成</span>
                <span class="number">({{completedList.length}})</span>
                </p>
            <div v-for="(item,index) in completedList" 
                    :key="item.name" 
                    class="list-wrap list-wrap-completed">
                    <div class="check-icon"  @click="handlePend(index)">
                        <img src="@/assets/checkbox-circle-checked@2x.png" />
                    </div>
                    <van-card
                :title="item.name"
                        :thumb="item.identifier?item.identifier.avatar:require( '@/assets/loading.gif')"
                        @click="handleGoRoute('customerDetail', item)"
                        :class="{'van-card-active': index === activeCard}"
                    >
                        <template #tags>
                            <van-tag 
                                v-for="(tag) in item.tags"
                                :key="tag.tag_name"
                                :color="'#F2F3F5'" 
                                text-color="#646566" 
                                type="danger">
                                {{tag.tag_name}}
                            </van-tag>
                        </template>
                    </van-card>      
            </div>  
        </template>  
        <div  v-if="!pendingLoading && !compeletedLoading && !pendingList.length && !completedList.length" class="no-info">
           <img src="@/assets/no-data@2x.png" />
           <p>暂无联系人</p>
       </div>
    </div>
</template>
<script>
import {getExternalTaskAPI,saveCompletedAPI,get_lf_external } from '../../service/api'
import { channelType } from '../../const/const'
// import { HeaderPositionMixin } from '../../mixins/touch'

export default {
    name: 'taskDetail',
    // mixins: [HeaderPositionMixin],
    data(){
        return {
            pendingList: [],
            pendingLoading: true,
            compeletedLoading: true,
            activeCard: -1,
            completedList: [],
            taskItem:{},
            hasNoChange: true,

        }
    },
    methods: {
       
         handleGoRoute(route,item){
            localStorage.setItem('customerDetail', JSON.stringify(item));
          this.$router.push(route);
      },
        handleComplete(index){
            this.hasNoChange = false;
            const item = this.pendingList.splice( index, 1)[0];
            // console.log(item)
            this.completedList.unshift(item);
        },
        handlePend(index){
            this.hasNoChange = false;
            const item = this.completedList.splice( index, 1)[0];
            this.pendingList.unshift(item);
        },
        async requestIdentifier(list,thisList){
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
            // console.log(fnList,'fnList')
            for(let i =0; i < list.length; i++ ){
                 if(fnList[i]){
                        // console.log(list[i].name)
                    try{
                        const res = await fnList[i];
                        list[i].identifier = res.data
                    }catch( err){
                        this.renderAvatar(list[i]);
                    }finally{
                        // console.log(list[i], 'list[i]')     
                    }
                 } else {
                     this.renderAvatar(list[i]);
                 }
            }  

            thisList.splice( 0, list.length, ...list);
            
        },
        renderAvatar( item ){
             let avatar = '';
            switch(item.gender){
                case 1:
                    avatar=require('@/assets/client-photo-male@2x.png');
                    break;
                case 2:
                    avatar=require('@/assets/client-photo-female@2x.png');
                    break;
                default:
                    avatar=require('@/assets/client-photo-unknown@2x.png');

            }
            item.identifier = {
                avatar,
            }
        },
         saveCompletedCallback(callback){
                saveCompletedAPI({
                userid: this.$userInfo.userid,
                taskName: this.taskItem.name,
                taskId: this.taskItem.id,
                completedList: this.completedList.map( item =>{
                    return item.externalid
                })
            }).then( res =>{
                callback();
                console.log(res.data, '保存已完成列表')

            }); 
        }
    },
    mounted(){
        this.taskItem = JSON.parse(localStorage.getItem('taskItem'))

        const completedMap = new Map;
        this.taskItem.completedList.forEach( item =>{
            completedMap.set(item, 1)
        })
        const pendingList = this.taskItem.externalList.filter( item =>{
            return !completedMap.get(item)
        })
       if(pendingList.length){
            getExternalTaskAPI({
            corpid: this.$userInfo.corpid,
            userid: this.$userInfo.userid,
            // externalid: localStorage.getItem('pendingList')
            externalid: JSON.stringify(pendingList),

            }).then( res =>{
                this.pendingLoading = false;

            if(res.data.code === 0){
                    const list = res.data.data;
                    this.pendingList =  list;
                    this.$nextTick( ()=>{
                        if(list.length ){
                        this.requestIdentifier(list,this.pendingList);
                        }
                    })
            } else {
                this.$toast.fail(res.data.message);
            }
                //  this.requestIdentifier(res.data,this.pendingList)
            })
       } else {
           this.pendingLoading = false;
       }
        if( this.taskItem.completedList.length ){
              getExternalTaskAPI({
            corpid: this.$userInfo.corpid,
            userid: this.$userInfo.userid,
            externalid: JSON.stringify(this.taskItem.completedList),
            }).then( res =>{
                this.compeletedLoading = false;
                 if(res.data.code === 0){
                     const list = res.data.data
                    this.completedList =  list;
                    this.$nextTick( ()=>{
                    if(list.length && list[0].unionid){
                    this.requestIdentifier(list,this.completedList);
                    }
                 })
                } else {
                    this.$toast.fail('Access_token获取失败，无法获取已完成客户列表！');
                }
            })
        } else {
            this.compeletedLoading = false;
        }
       
    },

    beforeRouteLeave(to, from, next){
        // console.log(to.name,'beforeRouteLeave')
        if(this.hasNoChange){
            next();
        }
        if(to.name === 'home'){
            this.saveCompletedCallback(next)
        } else {
            this.saveCompletedCallback();
            next();
        }
    }

}
</script>
<style lang='less'>
.task-detail{ 
    .list-loading{
        padding-top: 1rem;
    }
    .list-wrap{
        display: flex;
        .check-icon {
            display: flex;
            align-items: center;
            background-color: #fff;
            width: 0.36rem;
            padding-left: 0.16rem;
            margin: 0 0 0.1rem 0;
           img{
                width: 0.20rem;
                height: 0.20rem;
           }
        }

        .van-card:not(:first-child){
            margin-top: 0;
        }
    }
    .list-wrap-completed {
        filter: opacity(0.5);
    }
    .van-card {
        width: 3.73rem;
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
    .title {
        height: 0.40rem;
        line-height: 0.40rem;
        padding-left: 0.15rem;
        font-size: 0.14rem;
        color: #969799;
        .text{
            color: #323233;
            padding-right: 0.1rem;
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