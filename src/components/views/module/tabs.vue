<template>
  <el-tabs class="lay-con-tab"  type="card" closable v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      用户管理
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
      <sdintuser></sdintuser>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template> 
<script>
import sdintuser from "../record/outList.vue" ;
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    },
    components:{
      sdintuser 
    }


  };
</script>