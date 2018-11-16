import  {syncs} from "./components/sync/index";
import  Vue from  "vue" ;

// import  syncBanner from   "./components/banner/index.js";
import(/* webpackChunkName:"async-banner"*/"./components/banner/index.js").then(_=>{
    _.default.init() ;
    console.log('调用了第二次成功了')
});
// syncBanner.init() ;
console.log('hello  webpack');
syncs('执行了没789');