import { syncs } from "./components/sync/index";
import("./style/cssreset.css");
import("./style/app.css");
import Vue from "vue";
import store from "./store";
import ElementUI from "element-ui";
import {
  map as _map
} from "lodash-es";
Vue.prototype.__map = _map ;
// import {
//   Pagination,
//   Dialog,
//   Autocomplete,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   // Input,
//   // InputNumber,
//   // Radio,
//   // RadioGroup,
//   // RadioButton,
//   // Checkbox,
//   // CheckboxButton,
//   // CheckboxGroup,
//   // Switch,
//   // Select,
//   // Option,
//   // OptionGroup,
//   // Button,
//   // ButtonGroup,
//   // Table,
//   // TableColumn,
//   // DatePicker,
//   // TimeSelect,
//   // TimePicker,
//   Popover,
//   Tooltip,
//   Breadcrumb,
//   BreadcrumbItem,
//   Form,
//   FormItem,
//   // Tabs,
//   // TabPane,
//   // Tag,
//   // Tree,
//   // Alert,
//   // Slider,
//   Icon,
//   Row,
//   Col,
//   // Upload,
//   // Progress,
//   // Badge,
//   // Card,
//   // Rate,
//   // Steps,
//   // Step,
//   Carousel,
//   CarouselItem,
//   Collapse,
//   CollapseItem,
//   Cascader,
//   // ColorPicker,
//   Transfer,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   // Loading,
//   // MessageBox,
//   // Message,
//   // Notification
// } from 'element-ui';

// Vue.use(Pagination);
// Vue.use(Dialog);
// Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// // Vue.use(Input);
// // Vue.use(InputNumber);
// // Vue.use(Radio);
// // Vue.use(RadioGroup);
// // Vue.use(RadioButton);
// // Vue.use(Checkbox);
// // Vue.use(CheckboxButton);
// // Vue.use(CheckboxGroup);
// // Vue.use(Switch);
// // Vue.use(Select);
// // Vue.use(Option);
// // Vue.use(OptionGroup);
// // Vue.use(Button);
// // Vue.use(ButtonGroup);
// // Vue.use(Table);
// // Vue.use(TableColumn);
// // Vue.use(DatePicker);
// // Vue.use(TimeSelect);
// // Vue.use(TimePicker);
// Vue.use(Popover);
// Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
// Vue.use(Form);
// Vue.use(FormItem);
// // Vue.use(Tabs);
// // Vue.use(TabPane);
// // Vue.use(Tag);
// // Vue.use(Tree);
// // Vue.use(Alert);
// // Vue.use(Slider);
// Vue.use(Icon);
// Vue.use(Row);
// Vue.use(Col);
// // Vue.use(Upload);
// // Vue.use(Progress);
// // Vue.use(Badge);
// // Vue.use(Card);
// // Vue.use(Rate);
// // Vue.use(Steps);
// // Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
// // Vue.use(ColorPicker);
// Vue.use(Transfer);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);

// Vue.use(Loading.directive);

// import axios from "axios" ;
// import 'element-ui/lib/theme-chalk/index.css';
Vue.directive('loadmore', {//添加指令
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper');
    // var RETIME ={date:new Date()};
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
Vue.use(ElementUI);
import router from "./router";

// const App = () => import('@/App.vue');
// console.log('APP加载成功了',App);
import App from "./App.vue";
console.log(App)
import syncBanner from "./components/banner/index.js";
// webpackChunkName:"async-banner" 下边这行这个是魔法注释，打包的时候的命名
import(/* webpackChunkName:"async-banner"*/"./components/banner/index.js").then(_ => {
  _.default.init();
  console.log('调用了第二次成功了')
});
console.log(router);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



// syncBanner.init() ;
console.log('hello  webpack');
syncs('执行了没789');