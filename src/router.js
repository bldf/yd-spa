import Vue from 'vue' ; 
import Router from 'vue-router' ; 
import BasicLayout from "./components/views/layout/BasicLayout.vue";
import store from "./store";

Vue.use(Router) ;
const router = new Router({
    routes:[{
      path:'/redirect',
      name:'redirect',
      // redirect:'/system/user'
      redirect:to=>{
        const { hash, params, query } = to ;
        console.log('params',params.url)
        return params.url;
      }
    },{
        path:'/',
        name:'首页',
        component:BasicLayout,
       // meta:{anonymous:true}
       children:[{
        path:'/redirect2',
        name:'redirect2',
        component:() => import("./components/views/module/redirect.vue"),
      },{
        path: "dashboard",
        component: () => import("./components/views/Dashboard.vue"),
      },{
        name:'用户管理',
        path: "/system/user",
        component: () => import("./components/views/system/user.vue"),
        meta: { 
          keepAlive: true 
        }
      },{
        name:'入库记录',
        path: "/record/outList",
        component: () => import("./components/views/record/outList.vue"),
        meta: { 
          keepAlive: true 
        }
      },{
        // 当/user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'materiel',
        component: () => import("./components/views/materiel/aputInStorage.vue")
      },{
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/materiel/aputOutStorage',
        component: () => import("./components/views/materiel/aputOutStorage.vue")
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/materiel/mt',
        component: () => import("./components/views/module/tabs.vue")
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/materiel/mtp',
        component: () => import("./components/views/module/pageTabs.vue")
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/materiel/mtp2',
        component: () => import("./components/views/module/pageTabs2.vue")
      }
    //   {
    //     // 当 /user/:id/posts 匹配成功
    //     // UserPosts 会被渲染在 User 的 <router-view> 中
    //     path: 'posts',
    //     component: UserPosts
    //   }
    ]
    }]
}) ;    

// 导航之前拦截器
router.beforeEach((to, from, next) => {
 
  //  console.log('to',to);
  // console.log('from',from);
  // console.log('next',next);
  // console.log('99999')
// debugger ;
  // console.log({title,url}) ;
  // console.log( to.matched[0].instances) ;
  // if (to && (to.name !== '入库记录' || to.name !== '用户管理') ){
  //   // 不是去 C 页面，不缓存
  //   from.meta.keepAlive = false
  // } else {
  //   // 是去 C 页面，缓存
  //   from.meta.keepAlive = true
  // }

  try {
    var title = to.matched[1].name ;
    var url = to.matched[1].path ;
    to.matched[0].instances.default.$refs.tabheader.f$addHandle({title,url})
  } catch (error) {
    
  }


  next(); 
  // to.matched[1]
  // console.log('0000');
  // console.log(to.matched[0].components.default.components.tabheader.data)
  // console.log(to.matched[0].instances.default.$refs.tabheader.f$addHandle({title,url})); 
  // to.matched[0].components.default.components.tabheader.methods.f$addHandle({title,url}) ;

});
export default router ;
