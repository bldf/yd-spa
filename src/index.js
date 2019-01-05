import { syncs } from "./components/sync/index";
import { http } from "./components/common/util.js";
import("./style/cssreset.css");
import("./style/app.css");
import Vue from "vue";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css'
import {Select,Table,Radio,RadioGroup,DatePicker,TableColumn,Option,Dialog,Pagination,Col,Row,Container,Scrollbar,Header,FormItem,Form,Aside,Main,Footer,MenuItem,Input,Submenu,Menu,MenuItemGroup,Button,Tag,Tabs} from 'element-ui';
import router from "./router";
import App from "./App.vue";
import {
  map as _map,
  assignIn as __assignIn
} from "lodash-es";
Vue.prototype.__map = _map ;
Vue.prototype.http = http ;
Vue.prototype.assignIn = __assignIn ;

Vue.use(Container) ;
Vue.use(Pagination) ;
Vue.use(Header) ;
Vue.use(Col) ;
Vue.use(Row) ;
Vue.use(Menu) ;
Vue.use(Aside) ;
Vue.use(Main) ;
Vue.use(Footer) ;
Vue.use(Menu) ;
Vue.use(Submenu) ;
Vue.use(MenuItem) ;
Vue.use(Input) ;
Vue.use(Tag) ;
Vue.use(Button) ;
Vue.use(Form) ;
Vue.use(Scrollbar) ;
Vue.use(FormItem) ;
Vue.use(Select) ;
Vue.use(Table) ;
Vue.use(Radio) ;
Vue.use(RadioGroup) ;
Vue.use(DatePicker) ;
Vue.use(TableColumn) ;
Vue.use(Option) ;
Vue.use(Dialog) ;
// Vue.use(Form) ;
// Vue.use(Form) ;
// Vue.use(Form) ;
// Vue.use(Form) ;

// import axios from "axios" ;
Vue.directive('loadmore', {//添加滚动加载指令指令
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper');
    var RETIME  = new Date(),ifTop=0;//用于判断是往上滑还是往下滑    
    selectWrap.addEventListener('scroll', function () {
      let sign = 10;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight ;
      if (scrollDistance <= sign && ( (new Date() - RETIME)>200)) {
        if(!(scrollDistance>ifTop)){//如果是往下滑
          binding.value();
        }
        RETIME = new Date(); 
      }
      ifTop = scrollDistance ;
    })
  }
})
// Vue.use(ElementUI);

import syncBanner from "./components/banner/index.js";
// webpackChunkName:"async-banner" 下边这行这个是魔法注释，打包的时候的命名
// import(/* webpackChunkName:"async-banner"*/"./components/banner/index.js").then(_ => {
//   _.default.init();
//   console.log('调用了第二次成功了')
// });
console.log(router);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



// syncBanner.init() ;
console.log('hello  webpack');
syncs('执行了没789');