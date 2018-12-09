<template class="show-time">
  <el-container class="v-p-n-con">
          <el-header style="height:auto;">
            <el-form :inline="true"  ref="searchInfo" :model="m$searchInfo" class="demo-form-inline">
              <el-form-item prop="user" label="账户">
                <el-input v-model="m$searchInfo.user"></el-input>
              </el-form-item>
              <el-form-item prop="flag" label="账户状态">
                <el-select v-model="m$searchInfo.flag">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="开启" value="1"></el-option>
                  <el-option label="关闭" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="createTime" label="注册日期">
                <el-date-picker   type="daterange"  v-model="m$searchInfo.createTime"  align="right" unlink-panels range-separator="至"
                  start-placeholder="注册开始日期"
                  end-placeholder="注册结束日期"
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
                        v-loadmore="loadmoreFn"
                        :data="m$tableData"
                        height="100%"
                        border
                        @selection-change	= "tableDataChangeFn"
                        style="width: 100%"
                      >
                        <el-table-column type="selection" ></el-table-column>
                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="name" label="姓名" width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column
                              label="状态"
                              width="80">
                              <template slot-scope="scope">
                               <el-switch v-model="other.delivery"></el-switch>
                              </template>
                            </el-table-column>
                      </el-table>
                </el-main>
                <el-footer style="height:auto;">
                   <!--底部刷新组件-->
                      <el-footer height="36px" class="init-table-footer">
                            <el-col :span="24">
                              <b class="init-table-hzh">汇总行<i title="刷新数据" class="el-icon-refresh"></i></b>
                              <span class="init-table-nums">共16条</span>
                              </el-col>
                      </el-footer>
                </el-footer>
              </el-container>
          </el-main>
<!-- --------------------------------   中间显示table表格使用    End-------------------------------------- -->
          <el-footer height="50px" style="line-height:50px">
            <el-button type="primary" @click="m$diaInfo={},m$dialogVisible = true" title="增加账户">增加</el-button>
            <el-button type="primary" :disabled="m$le!==1" title="修改账户">修改</el-button>
            <el-button type="danger" :disabled="!m$le>0" @click="remove"  title="删除账户">删除</el-button>
          </el-footer>

          
<!-- --------------------------------  Begin    弹出dialog   -------------------------------------- -->
<el-dialog title="新增用户" :visible.sync="m$dialogVisible">
      <el-form :inline="true" :rules="m$rules" status-icon ref="m$diaInfo" :model="m$diaInfo" label-width="80px">
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="m$diaInfo.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" label="密码">
          <el-input v-model="m$diaInfo.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item  prop="pwd2" label="确认密码">
          <el-input v-model="m$diaInfo.pwd2" type="password" placeholder="再次确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone"  label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="m$diaInfo.phone" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item   prop="email" label="电子邮件">
          <el-input v-model="m$diaInfo.email" placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item  prop="sex" label="性别">
          <el-select v-model="m$diaInfo.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
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
        <el-button @click="m$dialogVisible = false">取 消</el-button>
        <el-button @click="f$submitForm('m$diaInfo')" type="primary">确 定</el-button>
      </div>
    </el-dialog>

<!-- --------------------------------   弹出dialog    End-------------------------------------- -->
    </el-container>
</template>
<style>
</style>
<script>
export default {
  name: "user",
  data() {
    return {
      m$searchInfo: {},
      m$diaInfo: {},
      m$le:0,
      m$dialogVisible: false,
      m$tableData: [
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
      ],
      m$rules:{
          userName:[ { required: true, message: '请输入用户名', trigger: 'blur' }],
          sex:[{ required: true, message: '请选择性别', trigger: 'change' }],
          email:[{
          validator:(rule, v, callback)=>{
             var re =  (v+'').validate('el') ;
               if (!re.re) {
                  callback(new Error('请输入正确的邮箱地址'));
                }else {
                  callback();
                }
          },
          trigger:'blur'
          }],
          phone:[{
          validator:(rule, v, callback)=>{
             var re =  (v+'').validate('sj') ;
               if (!re.re) {
                  callback(new Error('请输入手机号码'));
                }else {
                  callback();
                }
          },
          trigger:'blur'
          }],
          pwd:[{
          validator:(rule, v, callback)=>{
               if (v === '') {
                  callback(new Error('请输入密码'));
                } else if (v !== this.m$diaInfo.pwd2) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
          },
          trigger:'blur'
          }],
          pwd:[{
          validator:(rule, value, callback)=>{
               if (value === '') {
                  callback(new Error('请输再次入密码'));
                } else if (value !== this.m$diaInfo.pwd) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
          },
          trigger:'blur'
          }]
      },
      other:{},
      state: null,
      dateRange: null,
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
      pager: { current: 1, size: 10, total: 0, records: [] },
      
    
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    f$submitForm:function(formName){
      console.log(formName) ;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    searchFn() {
      console.log(this.searchInfo);
    },
    tableDataChangeFn(r){
      this.m$le = r.length ;
    },
    loadmoreFn() {
      console.log('滚动到底部了') ;
      this.$message({
          message: '数据加载成功',
          center: true
        });
        // tableData: [
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // }

        this.m$tableData.push({
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
