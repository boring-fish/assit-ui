<template>
     <div class="dashboard">
         <h2 class="dashboard-title">
             招募看板
         </h2>
         <div class="recruit-wrap">
             <div class="recruit-content-wrap" @click="handleGoCustomer('customer', 0)">
                 <img src="@/assets/img-kb-jrzm@2x.png" class="recruit-icon"  alt="">
                 <div class="recruit-title"> 
                     <h3>今日招募</h3>
                      <img class="recruit-arrow-right" src="@/assets/icon-circle-right@2x.png" />
                 </div>
                 <div>
                         <van-loading v-if="loading" />
                        <template v-else>
                            <span class="recruit-number">{{recruitToday}}</span>
                            <span class="recruit-unit">人</span>
                        </template>
                 </div>
            </div>    
            <div class="recruit-content-wrap"  @click="handleGoCustomer('customer', 1)">
                 <img src="@/assets/img-kb-ljzm@2x.png" class="recruit-icon" alt="">
                 <div class="recruit-title"> 
                     <h3>累计招募</h3>
                     <img class="recruit-arrow-right" src="@/assets/icon-circle-right@2x.png" />
                 </div>
                 <div>
                        <van-loading v-if="loading" />
                        <template v-else>
                            <span class="recruit-number">{{recruitTotal}}</span>
                            <span class="recruit-unit">人</span>
                        </template>
                 </div>
            </div>   
         </div>
         <h2 class="dashboard-title">
             任务看板
         </h2>
          <van-loading v-if="taskLoading" class="task-loading" size="24px" vertical>加载中...</van-loading>
         <div v-if='taskList.length!==0 && !taskLoading'>
              <div v-for="item in taskList" :key="item.taskClass">
                    <h3 class="task-title">
                    {{item.taskClass}}
                    </h3>
                    <div class="task-wrap">
                        <div 
                            v-for="task in item.list" 
                            class="task-content-wrap"
                            @click="handleGoTask('taskDetail',task, 1)"
                            :key="task.title" >
                            
                            <h4 class="task-content-title">{{task.name}}</h4>
                            <div v-if="task.externalList && (task.externalList.length === 0 || task.externalList.length !== task.completedList.length) " class="task-content">
                            <!-- <div class="task-content"> -->
                                <div class="task-content-left task-content-item">
                                    <p>待完成</p>
                                    <div 
                                        class="num"
                                        :class="{'pending-num':task.externalList.length - task.completedList.length}">
                                        {{task.externalList.length - task.completedList.length}}
                                        </div>
                                </div>
                                <div class="splite-line"></div>
                                <div  class="task-content-right task-content-item">
                                    <p>已完成</p>
                                    <div 
                                        class="num"
                                        :class="{'completed-num':task.completedList.length}">{{task.completedList.length}}</div>
                                </div>
                            </div>
                            <div v-else class="allCompleted">
                                <img src="@/assets/success@2x.png"/>已完成
                            </div>
                        </div>
                        <!-- <div class="task-content-wrap">
                            <img src="@/assets/img-kb-birthday@2x.png" />
                            <h4 class="task-content-title">敬请期待敬请期待敬请期待</h4>
                        </div> -->

                    </div>
            </div>
         </div>
        <div class="no-task-content" v-if="taskList.length == 0 && !taskLoading">
                <span>暂无任务</span>
                <img src="@/assets/task-no-data.png" alt="">
            </div>
         
     </div>
    
</template>

<script>
// import {RadarSpinner} from 'epic-spinners'
import { getRecuitNumberAPI,getTaskUserAPI } from '../../service/api'
import { divideArr } from '../../utils/utils'


export default {
  name: 'dashboard',
//   components: {
//       RadarSpinner
//     },
  data(){
    return {
      recruitToday: 0,
      recruitTotal: 0,
      taskList: [],
        loading: true,
        taskLoading: true,
    }
  },
  methods: {
      converToNumber(num){
          return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      },
      handleGoCustomer(route,active){
          this.$router.push({ name: route, query: { active }});
      },
      handleGoTask(route,item){
          this.$router.push(route);
          localStorage.setItem('taskItem',JSON.stringify(item));

      }
  },

  mounted(){
      console.time('getRecuit')
       getRecuitNumberAPI({
                corpid: this.$userInfo.corpid,
                userid: this.$userInfo.userid,
            }).then( res => {
                const data = res.data.data
                this.loading = false;
                this.recruitToday = this.converToNumber(data.todayNum);
                this.recruitTotal = this.converToNumber(data.totalNum);
                console.timeEnd('getRecuit')
            })

     console.log(this.$accessToken,this, '$accessToken')
     console.time('getTaskUse')
        getTaskUserAPI({
            corpid: this.$userInfo.corpid,
            userid: this.$userInfo.userid,
            XOpenApiToken: this.$accessToken,
        }).then( res => {
            console.timeEnd('getTaskUse')
            this.taskList = divideArr({
                arr: res.data.data,
                attribute: 'taskClass'
            });
            console.log(this.taskList,res, 'taskList')
            this.taskLoading = false;
        })
    

  }

}
</script>
<style lang="less">
.dashboard{
    padding: 0.32rem 0.2rem;
    &-title{
        font-size: 0.18rem;
        color: #969799;
        line-height: 0.25rem;
        font-weight: 400;
    }
    .recruit-wrap{
       display: flex;
       justify-content: space-between;
       margin: 0.2rem 0 0.23rem;
       .recruit-content-wrap {
            width: 1.6rem;
            height: 2.18rem;
            box-sizing: border-box;
            padding: 0.2rem 0.2rem 0.24rem 0.2rem;
            border-bottom: 0.06rem solid #44BB00;
            background: #fff;
            box-shadow: 0 0.06rem 0.14rem 0 rgba(168, 168, 168, 0.1);
            border-radius: 0.06rem;
            .recruit-icon{
                width: 0.72rem;
            }
            .recruit-title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0.16rem 0;
                h3{
                    color: #323233;
                    font-size: 0.17rem;
                }
                .recruit-arrow-right{
                    width: 0.24rem;
                    height: 0.24rem;
                }
            }
            .recruit-number{
                display: inline-block;
                min-width: 0.57rem;
                height: 0.4rem;
                line-height: 0.4rem;
                margin-right: 0.08rem;
                background: #F4F5F6;
                box-shadow: 0 0 0.01rem 0 rgba(0, 0, 0, 0.1);
                border-radius: 0.06rem;  
                font-size: 0.36rem;
                color: #323233;   
                text-align: center;  
                vertical-align: middle;
            }
            .recruit-unit{
                font-size: 0.14rem;
                color: #9B9B9B;
                vertical-align: middle;
            }
            &:last-child{
                border-bottom: 0.06rem solid #1989FA;
            }
       }
    }
    .task-title{
        margin: 0.16rem 0 0.1rem;
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #969799;
        font-weight: 400;

    }
    .task-loading{
        padding-top: 1rem;
    }
    .task-wrap{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .task-content-wrap{
            display: flex;
            flex-direction: column;
            width: 1.6rem;
            height: 1.12rem;
            background: #fff;
            box-shadow: 0 0.06rem 0.14rem 0 rgba(168, 168, 168, 0.1);
            border-radius: 0.06rem;
            .task-content{
                display: flex;
                color: #646566;
                font-size: 0.12rem;
                line-height: 0.17rem;
                // justify-content: space-between;
                .num {
                     font-size: 0.18rem;
                     color: #969799;
                     line-height: 0.24rem;
                }
                &-left{
                    width: 0.79rem;
                    .pending-num{
                        color:#1989FA;
                    }
                }
                .splite-line {
                    width: 0.01rem;
                    height: 0.62rem;
                    background-color: #EBEDF0;
                }
                 &-right{
                    width: 0.80rem;
                    .completed-num{
                        color: #19BE6B;

                    }
                }
                &-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                
            }
                .task-content-title{
                    display: flex;
                    align-items: center;
                    padding-left: 0.2rem;
                    height: 0.62rem;
                    font-size: 0.15rem;
                    color: #323233;
                    font-weight: normal;
                    border-bottom: 0.01rem solid #EBEDF0;
                }

                .allCompleted{
                    height: 0.6rem;
                    display: flex;
                    align-items: center;
                    img {
                        width: 0.2rem;
                        height: 0.2rem;
                        margin: 0 0.1rem 0 0.2rem;
                        vertical-align: middle;
                    }
                }
        }
    }
    .no-task-content{
        width: 160px;
        height: 60px;
        background: #FFFFFF;
        box-shadow: 0px 6px 14px 0px rgba(168, 168, 168, 0.1);
        border-radius: 6px;
        display: flex;
        padding:20px;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        color: #323233;
        line-height: 20px;
        margin-top:10px;
        img{
            width: 20px;
            height: 18px;
        }
    }
}
</style>
