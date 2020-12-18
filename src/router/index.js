import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard/dashboard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
    // beforeEnter: (to, from, next) => {
    //   if(to.query.code ){
    //     //   //"username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";
    //     //   // document.cookie = to.query.code.userid;
    //       next();
    //     } else {
    //       window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww11eb75f29f111014&redirect_uri=32f285c112.zicp.vip&response_type=code&scope=snsapi_privateinfo#wechat_redirect';
    //     }
    //     // const cookie = document.cookie;
    //     // if(cookie){
    //     //   next();
    //     // } else {
         
    //     // }
    // }
  }
  ,
  {
    path: '/material',
    name: 'material',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/material/material.vue')
  },
  {
    path: '/taskDetail',
    name: 'taskDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/taskDetail.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../views/customer/customer.vue')
  },
 
  {
    path: '/customerDetail',
    name: 'customerDetail',
    component: () => import('../views/customer/customerDetail.vue')
  }, 
  {
    path: '/customerInfo',
    name: 'customerInfo',
    component: () => import('../views/customer/customerInfo.vue')
  },
  {
    path: '/customerTag',
    name: 'customerTag',
    component: () => import('../views/customer/customerTag.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/user.vue')
  },
  {
    path: '/notAuthorized',
    name: 'notAuthorized',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/other/notAuthorized.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name === 'home' && Vue.prototype.$routeState !== 'null' ){
    console.log(Vue.prototype.$routeState,'Vue.prototype.$routeState')
    next(Vue.prototype.$routeState);
  }else{
    next();
  }
 
})

export default router
