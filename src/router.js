import Vue from 'vue' ; 
import Router from 'vue-router' ; 
import BasicLayout from "./components/layout/BasicLayout.vue" ;
Vue.use(Router) ;
const router = new Router({
    routes:[{
        path:'/',
        name:'BasicLayout',
        component:BasicLayout,
       // meta:{anonymous:true}
    }]
}) ;
export default router ;
