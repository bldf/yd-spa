<template class="show-time">
  <el-container class="v-p-n-con">
          <el-header style="height:auto;">
            <el-form :inline="true"  ref="searchInfo" :model="m$searchInfo" class="demo-form-inline">
              <el-form-item prop="user" label="发起账户">
                <el-input v-model="m$searchInfo.user"></el-input>
              </el-form-item>
              <el-form-item prop="flag" label="状态">
                <el-select v-model="m$searchInfo.flag">
                  <el-option label="已放行" value="0"></el-option>
                  <el-option label="拒绝放行" value="1"></el-option>
                  <el-option label="结束" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="createTime" label="放行日期">
                <el-date-picker   type="daterange"  v-model="m$searchInfo.createTime"  align="right" unlink-panels range-separator="至"
                  start-placeholder="放行开始日期"
                  end-placeholder="放行结束日期"
                  :picker-options="$store.state.dateRangePickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="info" @click="resetForm('m$searchInfo')" title="清空" icon="el-icon-zoom-out" circle></el-button>
                <el-button type="primary" @click="searchFn" title="查询" icon="el-icon-search" circle></el-button>
              </el-form-item>
            </el-form>
          </el-header>


<!-- -------------------------------- Begin 中间显示table表格使用  -------------------------------------- -->
          <el-main class="v-p-n-main-table">
              <el-container>
                <el-main>
                   <el-table
                        v-loadmore="f$loadmoreFn"
                        :data="m$tableData"
                        highlight-current-row
                        height="100%"
                        @selection-change	= "f$tableDataChangeFn"
                        style="width: 100%"
                      >
                      <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                  <el-form-item v-for="d in JSON.parse(props.row.finfo)" :key="d.id" width="140" :label="d.key">
                                      <span>{{d.value}}</span>
                                  </el-form-item>
                                </el-form>
                            </template>
                      </el-table-column>    

                        <el-table-column prop="flogin" label="发起账户" width="180"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="fname" label="用户名" width="180"></el-table-column>
                        <el-table-column prop="describes" label="发起描述"></el-table-column>
                         <el-table-column  show-overflow-tooltip prop="createdAt" label="发起日期" width="140"></el-table-column>
                          <el-table-column  show-overflow-tooltip prop="fxdate" label="放行日期" width="140"></el-table-column>
                        <el-table-column label="状态" width="120">
                          <template slot-scope="scope">
                                <el-tag v-if="scope.row.ftype == 1" type="warning" size="medium">未放行</el-tag>
                                <el-tag v-else-if="scope.row.ftype == 2" size="medium">已放行</el-tag>
                                <el-tag v-else-if="scope.row.ftype == 3" type="danger"  size="medium">拒绝放行</el-tag>
                                <el-tag v-else-if="scope.row.ftype == 4" type="success"  size="medium">结束</el-tag>
                          </template>
                        </el-table-column>
                      </el-table>
                </el-main>
                <el-footer style="height:auto;">
                   <!--底部刷新组件-->
                      <el-footer height="36px" class="init-table-footer">
                            <el-col :span="24">
                              <b class="init-table-hzh">汇总行<i title="刷新数据" class="el-icon-refresh"></i></b>
                              <span class="init-table-nums">共{{m$page.total}}条</span>
                              </el-col>
                      </el-footer>
                </el-footer>
              </el-container>
          </el-main>
    </el-container>
</template>
<style>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .cell {
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33333%;
  }
</style>
<script>
import { Loading } from 'element-ui';
import { forEach } from 'lodash-es';
export default {
  name: "user",
  data() {
    return {
      m$searchInfo: {},
      m$diaInfo: {},
      m$le:0,
      m$selectedRows: [],
      m$dialogVisible: false,
      m$tableData: [],
      m$page: { page: 1, rows: 35, total: ''},
      other:{},
      state: null,
      dateRange: null,
      test: null,
      test1: null,
      bucketName: "public",
    
    };
  },
  mounted() {
    this.f$refresh();
  },
  methods: {
    edit() {
      this.m$dialogVisible = true;
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map(item => item.userId);
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    remove() {
      this.$confirm(
        `此操作将永久删除, 是否继续?</br>共用户【${
          this.selectedRows.length
        }】个`,
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      ).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
    },
    onRemoveFile(file) {
      // this.$http.delete(`/oss/remove/${this.bucketName}/${file.response}`);
    }
  }
};
</script>
