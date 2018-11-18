import  {syncs} from "./components/sync/index";
import  Vue from  "vue" ;
import ElementUI from "element-ui" ;
import axios from "axios" ;
// import 'element-ui/lib/theme-chalk/index.css';   
Vue.use(ElementUI);
import router from "./router";

// const App = () => import('@/App.vue');
// console.log('APP加载成功了',App);
import App from "./App.vue";
console.log(App)
import  syncBanner from   "./components/banner/index.js";
// webpackChunkName:"async-banner" 下边这行这个是魔法注释，打包的时候的命名
import(/* webpackChunkName:"async-banner"*/"./components/banner/index.js").then(_=>{
    _.default.init() ;
    console.log('调用了第二次成功了')
});
console.log(router) ;
new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");

  

// syncBanner.init() ;
console.log('hello  webpack');
syncs('执行了没789');