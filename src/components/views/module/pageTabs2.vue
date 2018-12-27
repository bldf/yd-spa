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
                <a href="javascript:;" @click="e$clicka('e$refTabs')">刷新</a>
                <a href="javascript:;" @click="e$clicka('e$handleClose')">关闭</a>
                <a href="javascript:;" @click="e$clicka('e$closeOtherHandle')">关闭其他</a>
                <a href="javascript:;" @click="e$clicka('e$closeAllHandle')">关闭所有</a>
    </contextmenu>
  </el-header>
   
</template>
<script>
import("./pageTabs2.css");
import("./VueContextMenu.css");
import contextmenu  from "./VueContextMenu.vue" ;
import { findIndex } from "lodash-es";
  export default {
     data() {
       let m$homePage = {url:'/',title:'首页'};
      return {
        contextMenuTarget:null,
        contextMenuVisible:false,
        m$homePage,
        m$context:m$homePage,//当前右击的标签
        m$dynamicTags:[m$homePage]
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
      this.m$dynamicTags.splice(findIndex(this.m$dynamicTags,tag),1);
    },
    /**
     * 添加标签
     */
    f$addHandle(tag){
       this.m$dynamicTags.push(tag);
    },
    /**
     * 刷新当前page
     */
    e$refTabs(hash){
        location.hash= hash ;
    },
    /**
     * 关闭其它标签
     */
    e$closeOtherHandle(tag){
      this.m$dynamicTags=[tag] ;
    },
    /**
     * 关闭所有标签
     */
    e$closeAllHandle(){
      this.m$dynamicTags=[this.m$homePage] ;
    },
    addTab(targetName) {
    
    },
    removeTab(targetName) {
    
    }
    },
    components: {
        contextmenu
    }
  }
</script>