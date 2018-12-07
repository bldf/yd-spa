<template class="show-time">
<div class="v-p-n-con">
  <el-container>
          <el-header>
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="searchInfo.user" placeholder="用1户名"></el-input>
          </el-form-item>
          <el-form-item label="注册日期">
            <el-date-picker
              type="daterange"
              v-model="searchInfo.dateRange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="$store.state.dateRangePickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="info">重置</el-button>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
          </el-header>


<!-- -------------------------------- Begin 中间显示table表格使用  -------------------------------------- -->
          <el-main class="v-p-n-main-table">
              <el-container>
                <el-main>
                   <el-table
                        v-loadmore="loadmoreFn"
                        :data="tableData3"
                        height="100%"
                        border
                        sum-text="汇总行"
                        style="width: 100%"
                      >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="name" label="姓名" width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                      </el-table>
                      <!--底部刷新组件-->
                      <el-footer height="36px" class="init-table-footer">
                            <el-col :span="24">
                              <b class="init-table-hzh">汇总行<i title="刷新数据" class="el-icon-refresh"></i></b>
                              <span class="init-table-nums">共16条</span>
                              </el-col>
                      </el-footer>
                </el-main>
                <el-footer>Footer</el-footer>
              </el-container>
          </el-main>
<!-- --------------------------------   中间显示table表格使用    End-------------------------------------- -->
          <el-footer>
            Footerdfa
          </el-footer>
    </el-container>
</div>
</template>
<style>
</style>
<script>
export default {
  name: "user",
  data() {
    return {
      searchInfo: {},
      diaInfo: {},
      dialogVisible: false,
      state: null,
      dateRange: null,
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
      pager: { current: 1, size: 10, total: 0, records: [] },
      tableData3: [
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    searchFn() {
      console.log(this.searchInfo);
    },
    loadmoreFn() {
      console.log('滚动到底部了') ;
      this.$message({
          message: '数据加载成功',
          center: true
        });
        // tableData3: [
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // }

        this.tableData3.push({
          date:'saf',
          name:'是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放是发放',
          address:'测试地址'+new Date()/1
        });
    },
    query() {
      return null;
      // this.$http.get("/user").then(res => {
      //   this.pager = res.data;
      // });
    },
    edit() {
      this.dialogVisible = true;
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map(item => item.userId);
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
      );
    },
    onRemoveFile(file) {
      // this.$http.delete(`/oss/remove/${this.bucketName}/${file.response}`);
    }
  }
};
</script>
