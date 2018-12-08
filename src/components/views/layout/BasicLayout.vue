<template>
  <el-container class="c-layout-b">
    <el-header class="c-layout-b-header">
        <el-row :gutter="20">
          <el-col :span="10">
              <div class="c-layout-b-company-logo" title="点击返回主页"> 
                <img height="36px"  src="../../../assets/logo.png" width="51px">
                <span style="padding-left:2mm;"> 仕点智能科技有限公司</span>
              </div>
            </el-col>
          <el-col :span="7" style="height:1px;"></el-col>
          <el-col class="c-layout-b-top-item" style="padding:0;" :span="7">
            <el-menu
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="2">
                <template slot="title">账户：张三</template>
                <el-menu-item index="2-1">修改密码</el-menu-item>
                <el-menu-item index="2-2">注销</el-menu-item>
                <el-menu-item index="2-3">基本信息</el-menu-item>
              </el-submenu>
              <el-menu-item index="1">帮助</el-menu-item>
            </el-menu>
          </el-col>
          <h2 class="main-title">物料管理<span>•出库记录</span></h2>
        </el-row>
    </el-header>
    <el-container>
      <el-aside class="c-layout-b-aside" width="140px">
        <el-menu
          default-active="1-1"
          class="c-layout-b-menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="c-layout-b-container">
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer class="c-layout-b-footer" height="30px">
               <div class="footer-reserved">Copyright ©  SDINT All Rights Reserved 仕点智能</div>
              <span style="position: absolute;right: 1em; top: 0;font-size: 12px;  line-height: 30px;">2018-11-30 14:05</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import("./BasicLayout.css");
export default {
  name: "App",
  data() {
    return {} ;
  }
};
</script>