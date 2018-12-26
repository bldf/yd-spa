<template>

<el-container class="v-p-n-con v-p-n-con-tag-sc">
  <el-header height="40px" style="line-height:40px;">
            <!-- <el-scrollbar   style="height:50px;white-space: nowrap;" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section"> -->
       <el-scrollbar ref="scrollContainer" class="con-scroll" @wheel.native.prevent="handleScroll">
          <el-tag v-for="d in 40" color="#fff" type="info" closable >标签二{{d}}</el-tag>
        </el-scrollbar>
        
        <el-button size="mini" class="btn-lef" icon="el-icon-arrow-left" ></el-button>
        <el-button size="mini" class="btn-right" icon="el-icon-arrow-right" ></el-button>
  </el-header>
  <el-main>Main</el-main>
</el-container>
</template>
<script>
import("./pageTabs2.css");
  export default {
     data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      };
    },
    methods: {
      handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>