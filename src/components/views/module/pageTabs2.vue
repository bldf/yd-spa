<template>

  <el-header class="v-p-n-con-tag-sc" ref="header" height="40px" style="line-height:40px;">
            <!-- <el-scrollbar   style="height:50px;white-space: nowrap;" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section"> -->
       <el-scrollbar ref="scrollContainer" class="con-scroll" @wheel.native.prevent="handleScroll">
        <el-tag
            :key="tag.url"
            v-for="tag in m$dynamicTags"
            closable
            @contextmenu.native.prevent="f$showconTextMenu($event,tag)"
            color='#fff'
            type="info"
            :class="tag.url==onTagUrl?'on':''"
            @click.native="e$tagClick(tag)"
            @close="e$handleClose(tag)">
            {{tag.title}}
          </el-tag>
        </el-scrollbar>
        <el-button size="mini" @click="scrollLeft" class="btn-lef" icon="el-icon-arrow-left" ></el-button>
        <el-button size="mini" @click="scrollRight" class="btn-right" icon="el-icon-arrow-right" ></el-button>
        <contextmenu class="v-m-v-c-m-right-menu" 
                :target="contextMenuTarget" 
                :show="contextMenuVisible" 
                ref="refContextmenu"
                @update:show="(show) => !show && (contextMenuVisible = show)">
                <a href="javascript:;" @click="e$refTabs">刷新</a>
                <a href="javascript:;" @click="e$handleClose(1)">关闭</a>
                <a href="javascript:;" @click="e$closeOtherHandle">关闭其他</a>
    </contextmenu>
  </el-header>
   
</template>
<script>
import("./pageTabs2.css");
import("./VueContextMenu.css");
import contextmenu  from "./VueContextMenu.vue" ;
import { findIndex,sortBy,remove } from "lodash-es";
  export default {
     data() {
       let m$homePage = {url:'/',title:'首页',uuid:-1};
      return {
        contextMenuTarget:null,
        contextMenuVisible:false,
        m$homePage,
        m$dynamicTags:[],//页签的集合
        onTagUrl: m$homePage.url,//当前显示的url
        UUID:1,//内部使用，uuid自增长
        contextMenuTag:null //鼠标右击的页签
      };
    },
    mounted(){

    },
    methods: {
    /**
     * 鼠标滚动事件
     */
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40 ;
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap ;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4 ;
    },
    /**
     * 页签标题滚动条向左移动
     */
    scrollLeft(){
        this.handleScroll({wheelDelta:-120,deltaY:100});
    },
    /**
     * 页签标题滚动条向右移动
     */
    scrollRight(){
      this.handleScroll({wheelDelta:120,deltaY:-100});
    },
    /**
     * 鼠标右击标题
     */
    f$showconTextMenu(e,tag){
      this.contextMenuVisible = true ;
      this.contextMenuTag = tag ;
      this.$refs.refContextmenu.contextMenuHandler(e,true);
    },
    /**
     * 右击菜单，默认都会先走这个方法
     */
    e$clicka(clickName){
      this.contextMenuVisible = false ;
      this[clickName]();
    },
    /**
     * 关闭标签
     */
    e$handleClose(tag){
      tag==1&&(tag={url:this.onTagUrl});
      if(tag.url == this.onTagUrl ){//如果关闭的是当前已打开的页签，要回显示到上一次打开的页签中去
        let  arr = sortBy(this.m$dynamicTags,d=>d.uuid) ;
        this.$router.push(arr[arr.length -2].url); 
      }
      this.m$dynamicTags.splice(findIndex(this.m$dynamicTags,tag),1);
      this.contextMenuVisible = false ;
    },
    /**
     * 添加标签
     */
    f$addHandle(tag){
      if(tag.url == '/redirect2' ){
        return ;
      }
       this.onTagUrl = tag.url ;
       tag.uuid = this.f$getUUID() ;
       !~findIndex(this.m$dynamicTags,d=>d.url==tag.url)&&this.m$dynamicTags.push(tag);
    },
    /**
     * 获取UUID为了方便页签关闭或者切换的识货排序使用
     */
    f$getUUID(){
      this.UUID ++ ; 
      return this.UUID ;
    },
    /**
     * 刷新当前page
     */
    e$refTabs(){
       if(this.contextMenuTag.url == this.onTagUrl ){//如果刷新的是当前已打开的页签
          this.$router.push({name:'redirect2',params:{url:this.contextMenuTag.url}});
      }else{
           this.$router.push({name:'redirect',params:{url:this.contextMenuTag.url}});
      }
      this.contextMenuVisible = false ;
    },
    /**
     * 关闭其它标签
     */
    e$closeOtherHandle(tag){
      var u = this.contextMenuTag.url ;
      remove( this.m$dynamicTags,d=>d.url!=u) ;
       this.contextMenuVisible = false ;
       console.log(this.m$dynamicTags)

    },
    /**
     * 用户点击标签页
     */
    e$tagClick(tag){
      tag.uuid = this.f$getUUID() ;
      this.$router.push(tag.url) ;
    },
    /**
     * 关闭所有标签
     */
    e$closeAllHandle(){
      this.m$dynamicTags=[this.m$homePage] ;
    }
    },
    components: {
        contextmenu
    }
  }
</script>