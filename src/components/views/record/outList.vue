<template class="show-time">
  <el-container class="v-p-n-con">
          <el-header style="height:auto;">
             <!-- <el-form :inline="true" status-icon ref="m$diaInfo" :model="m$diaInfo" label-width="80px"> -->
            <el-form :inline="true" status-icon  ref="m$searchInfo" :model="m$searchInfo">
              <el-form-item  label="账户">
                <el-input v-model="m$searchInfo.user"></el-input>
              </el-form-item>
              <el-form-item  label="用户名">
                <el-input v-model="m$searchInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="供应商">
                <el-select v-model="m$searchInfo.flag">
                  <el-option label="供应商1" value="0"></el-option>
                  <el-option label="供应商2" value="1"></el-option>
                  <el-option label="供应商3" value="2"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item  label="是否启用">
                <el-radio-group v-model="m$searchInfo.enable">
                  <el-radio label="启用"></el-radio>
                  <el-radio label="禁用"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item  label="创建日期">
                <el-date-picker   type="daterange"  v-model="m$searchInfo.createTime"  align="right" unlink-panels range-separator="至"
                  start-placeholder="创建开始日期"
                  end-placeholder="创建结束日期"
                  :picker-options="$store.state.dateRangePickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="info" @click="f$resetForm('m$searchInfo')" title="清空" icon="el-icon-zoom-out" circle></el-button>
                <el-button type="primary" @click="f$search('查询成功')" title="查询" icon="el-icon-search" circle></el-button>
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
                        border
                        @selection-change	= "f$tableDataChangeFn"
                        style="width: 100%"
                      >
                       <el-table-column type="selection" ></el-table-column>
                        <el-table-column prop="username" label="账户" width="180"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="supplier" label="供应商名称" width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="email" label="邮件" width="140"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="phone" label="电话" width="140"></el-table-column>
                        <el-table-column  show-overflow-tooltip prop="crspd" label="对应人员" width="140"></el-table-column>
                        <el-table-column label="是否启用" width="120">
                          <template slot-scope="scope">
                               <el-switch @change="changeEnable(scope.row)" v-model="scope.row.enable"></el-switch>
                          </template>
                        </el-table-column>
                      </el-table>
                </el-main>
                <el-footer style="height:auto;">
                   <!--底部刷新组件-->
                      <el-footer height="36px" class="init-table-footer">
                            <el-col :span="24">
                              <b class="init-table-hzh">汇总行<i title="刷新数据" @click="f$refresh('更新成功')" class="el-icon-refresh"></i></b>
                              <span class="init-table-nums">共{{m$page.total}}条</span>
                            </el-col>
                      </el-footer>
                </el-footer>
              </el-container>
          </el-main>
          <el-footer height="50px" style="line-height:50px">
            <el-button type="primary" @click="f$openDialog('增加用户')" title="增加账户">增加</el-button>
            <el-button type="primary" :disabled="m$le!==1" @click="f$openDialog('修改用户',m$selectedRows[0])"  title="修改账户">修改</el-button>
            <el-button type="danger" :disabled="!m$le>0" @click="f$tableRemove"   title="删除账户">删除</el-button>
          </el-footer>

                   
<!-- --------------------------------  Begin    弹出dialog   -------------------------------------- -->
<el-dialog :title="m$diaTitle"   :visible.sync="m$dialogVisible">
      <el-form :inline="true" status-icon ref="m$diaInfo" :model="m$diaInfo" label-width="80px">
        <el-form-item prop="userName"  :rules="[{ck:'fk',validator:this.f$ck,trigger:'blur'}]"  label="姓名">
          <el-input v-model="m$diaInfo.userName" placeholder="必填"></el-input>
        </el-form-item>
         <el-form-item prop="job" :rules="[{ck:'fk',validator:this.f$ck,trigger:'blur'}]" label="职务">
          <el-input v-model="m$diaInfo.job"  placeholder="必填"></el-input>
        </el-form-item>
         <el-form-item  prop="sex" :rules="[{ck:'fk',validator:this.f$ck,trigger:'change'}]" label="部门">
          <el-select v-model="m$diaInfo.sex" placeholder="必填">
            <el-option label="部门1" value="1"></el-option>
            <el-option label="部门2" value="2"></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item  prop="sex2"  :rules="[{ck:'fk',validator:this.f$ck,trigger:'change'}]" label="性别">
          <el-select v-model="m$diaInfo.sex2" placeholder="必填">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="pwd2" :rules="[{ck:'fk',validator:this.f$ck,trigger:'blur'}]" label="工位">
          <el-input v-model="m$diaInfo.pwd2" type="password" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item  :rules="[{ck:'sj',validator:this.f$ck,trigger:'blur'}]"  label="手机号码">
          <el-input placeholder="选题" v-model="m$diaInfo.phone" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item   prop="email" :rules="[{ck:'el',validator:this.f$ck,trigger:'blur'}]" label="电子邮件">
          <el-input v-model="m$diaInfo.email" placeholder="选题"></el-input>
        </el-form-item>
        <el-form-item prop="remark"  :rules="[{ck:'fk',validator:this.f$ck,trigger:'blur'}]" label="备注">
          <el-input placeholder="选题" v-model="m$diaInfo.remark" class="input-with-select"></el-input>
        </el-form-item>
        <!-- <el-form-item label="头像">
          <el-upload
            action="this.$http.defaults.baseURL+'/oss/upload'"
            :data="{bucketName:bucketName}"
            :headers="{Authorization:'Bearer '+$store.state.token}"
            :on-remove="onRemoveFile"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="m$dialogVisible = false">取 消</el-button>
        <el-button @click="f$resetForm('m$diaInfo')" >重置</el-button>
        <el-button @click="f$submitForm('m$diaInfo')" type="primary">确 定</el-button>
      </div>
    </el-dialog>

<!-- --------------------------------   弹出dialog    End-------------------------------------- -->

    </el-container>
</template>
<script>
import { merge } from "lodash-es";
import  {table}  from "../../common/el-init.js";
export default merge(table,{
  name:'outList',
  methods:{
    changeEnable(d){//修改状态是否启用，此处应该发送ajax
      let msg = d.enable ? '启用':'禁用';
      let type = d.enable ? 'success':'info';
     this.$message({
          message: `${msg}成功`,
          center: true,
          type
        });
    }
  },
  mounted(){
    this.m$tableUrl = '/users.do';
    this.f$refresh();
    this.m$tableAddUrl='' ;
    this.m$tableUpUrl='' ;
    this.m$tableDelUrl='' ;
  }
  });
</script>
