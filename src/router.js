import Vue from 'vue' ; 
import Router from 'vue-router' ; 
import BasicLayout from "./components/views/layout/BasicLayout.vue";
import store from "./store";

Vue.use(Router) ;
const router = new Router({
    routes:[{
        path:'/',
        name:'BasicLayout',
        component:BasicLayout,
       // meta:{anonymous:true}
       children:[{
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'materiel',
        component: () => import("./components/views/materiel/aputInStorage.vue")
      },
    //   {
    //     // 当 /user/:id/posts 匹配成功
    //     // UserPosts 会被渲染在 User 的 <router-view> 中
    //     path: 'posts',
    //     component: UserPosts
    //   }
    
    ]
    }]
}) ;    
export default router ;
