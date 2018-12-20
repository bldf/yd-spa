<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      用户管理
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
      
      123
      <sdintuser></sdintuser>


    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template> 
<script>
import sdintuser from "../record/outList.vue" ;
import Vue from "Vue" ;
Vue.use(sdintuser) ;
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>