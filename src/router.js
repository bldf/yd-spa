import Vue from 'vue' ; 
import Router from 'vue-router' ; 


Vue.use(Router) ;

const BasicLayout = () => import('./components/layout/BasicLayout.vue');

const router = new Router({
    routers:[{
        path:'/',
        name:'index',
        component:BasicLayout,
        meta:{anonymous:true}
    },{
        path:'/test',
        name:'test',
        component:BasicLayout,
        meta:{anonymous:true}
    }]
}) ;
export default router ;