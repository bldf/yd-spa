<template class="show-time">
  <div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header">
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
      </div>
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
      <!--分页插件-->
      <el-footer height="80px" style="padding:0">
        
           <el-table
              height="80px"
              border
              sum-text="汇总行"
              style="width: 100%"
            >
        <el-table-column  width="55">
           
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
          <template slot="header" slot-scope="scope">
               <span>汇总行</span>
         </template>
        </el-table-column>
        <el-table-column  show-overflow-tooltip prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址">
          <template slot="header" slot-scope="scope">
               <span>共15条</span>
         </template>
        </el-table-column>
      </el-table>
            
      </el-footer>

      <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
      <!-- <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col> -->
      <!-- <el-pagination :current-page="pager.current" :page-size="pager.size" :total="pager.total" class="pagination text-right" :page-sizes="$store.state.paginationPageSizes" :layout="$store.state.paginationLayout"></el-pagination> -->
    </el-card>
    <el-dialog title="新增用户" :visible.sync="dialogVisible">
      <el-form :inline="true" :model="searchInfo" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="diaInfo.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="diaInfo.userName" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="diaInfo.userName2" type="password" placeholder="再次确认密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="test" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="test1" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="true"></el-option>
            <el-option label="女" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            action="this.$http.defaults.baseURL+'/oss/upload'"
            :data="{bucketName:bucketName}"
            :headers="{Authorization:'Bearer '+$store.state.token}"
            :on-remove="onRemoveFile"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.cell {
  text-align: center;
}
</style>
<script>
// import  Vue from  "vue" ;
// // import ElementUI from "element-ui";
// import {
//   // Pagination,
//   // Dialog,
//   // Autocomplete,
//   // Dropdown,
//   // DropdownMenu,
//   // DropdownItem,
//   // Menu,
//   // Submenu,
//   // MenuItem,
//   // MenuItemGroup,
//   Input,
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
//   Button,
//   // ButtonGroup,
//   Table,
//   TableColumn,
//   DatePicker,
//   // TimeSelect,
//   // TimePicker,
//   // Popover,
//   // Tooltip,
//   // Breadcrumb,
//   // BreadcrumbItem,
//   // Form,
//   // FormItem,
//   // Tabs,
//   // TabPane,
//   // Tag,
//   // Tree,
//   // Alert,
//   // Slider,
//   // Icon,
//   // Row,
//   // Col,
//   // Upload,
//   // Progress,
//   // Badge,
//   Card,
//   // Rate,
//   // Steps,
//   // Step,
//   // Carousel,
//   // CarouselItem,
//   // Collapse,
//   // CollapseItem,
//   // Cascader,
//   // ColorPicker,
//   // Transfer,
//   // Container,
//   // Header,
//   // Aside,
//   // Main,
//   // Footer,
//   Loading,
//   // MessageBox,
//   // Message,
//   // Notification
// } from 'element-ui';

// // Vue.use(Pagination);
// // Vue.use(Dialog);
// // Vue.use(Autocomplete);
// // Vue.use(Dropdown);
// // Vue.use(DropdownMenu);
// // Vue.use(DropdownItem);
// // Vue.use(Menu);
// // Vue.use(Submenu);
// // Vue.use(MenuItem);
// // Vue.use(MenuItemGroup);
// Vue.use(Input);
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
// Vue.use(Button);
// // Vue.use(ButtonGroup);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(DatePicker);
// // Vue.use(TimeSelect);
// // Vue.use(TimePicker);
// // Vue.use(Popover);
// // Vue.use(Tooltip);
// // Vue.use(Breadcrumb);
// // Vue.use(BreadcrumbItem);
// // Vue.use(Form);
// // Vue.use(FormItem);
// // Vue.use(Tabs);
// // Vue.use(TabPane);
// // Vue.use(Tag);
// // Vue.use(Tree);
// // Vue.use(Alert);
// // Vue.use(Slider);
// // Vue.use(Icon);
// // Vue.use(Row);
// // Vue.use(Col);
// // Vue.use(Upload);
// // Vue.use(Progress);
// // Vue.use(Badge);
// Vue.use(Card);
// // Vue.use(Rate);
// // Vue.use(Steps);
// // Vue.use(Step);
// // Vue.use(Carousel);
// // Vue.use(CarouselItem);
// // Vue.use(Collapse);
// // Vue.use(CollapseItem);
// // Vue.use(Cascader);
// // Vue.use(ColorPicker);
// // Vue.use(Transfer);
// // Vue.use(Container);
// // Vue.use(Header);
// // Vue.use(Aside);
// // Vue.use(Main);
// // Vue.use(Footer);

// Vue.use(Loading.directive);

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
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
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
