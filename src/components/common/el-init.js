import {merge as _merge ,assignIn as _assignIn ,forEach as _forEach, clone as _clone} from "lodash-es" ;
import { Loading } from 'element-ui';
import _T from "./index.js";
/**
 * 此js封装了基础表格的增删改查功能
 */
const table = {
    data(){
        return {
            m$searchInfo: {},//顶部查询的数据
            m$searchInfoAjax:{},//顶部查询给后台发送的ajax
            m$diaInfo: {},// dialog保存的数据
            m$le: 0,// 选中的 数量
            m$selectedRows: [],//选中的数据
            m$dialogVisible: false,// dialog是否显示
            m$tableData: [],// 表格显示的数据
            m$tableUrl: '',//加载数据表格的url
            m$diaTitle:'新增用户',
            m$page: { page: 1, rows: 35, total: '' },// 控制分页显示的数据
        };
    },
    methods: {
        /**
         * //查询数据,返回加载ajax的对象。
         * 参考文章： https://juejin.im/entry/583684d4880741006c081fa6
         */
        f$getAjax(){
            if( this.m$tableUrl){//this._m$queryHttp 是表格查询对象，不需要配置，自动生成
                !this._m$queryHttp && (this._m$queryHttp=this.http(this.m$tableUrl));
                return this._m$queryHttp;
            }else{
                console.warn('请初始化m$tableUrl')
            }
        },
        /**
         * table表格选中事件
         * @param {Array} r 
         */
        f$tableDataChangeFn(r){
            this.m$selectedRows=r,
            this.m$le = r.length ;
        },
        /**
         * 顶部查询按钮方法
         * @param {string} str ：查询成功的提示信息：默认提示 " 查询成功 " 
         */
        f$search(str){//顶部点击查询按钮的事件方法
            this.m$searchInfoAjax = _clone(this.m$searchInfo);
            this.f$refresh(str?str:'查询成功');
        },
        /**
         * 获取表格查询的参数
         */
        f$getQueryData(){
          var r={},o = _.assignIn({ page: this.m$page.page, rows: this.m$page.rows },this.m$searchInfoAjax);
          for(var a in o){
              if(o[a]!==''|| typeof o[a] !== 'undefined'){
                    r[a]=o[a];
              }
          }
          return r;
        },
        /**
         * 刷新数据成功后的提示信息
         * @param {string} str 
         */
        f$refresh(str){//刷新表格数据
            this.m$page.page=1 ;
            const loading = Loading.service({ background: 'transparent', target: 'div.is-scrolling-none', text: '加载中' });
            this.f$getAjax().post(this.f$getQueryData()).then(response => response.json()).then(data => {
                var $t = this;
                loading.close();
                this.m$page.total = data.total;
                $t.m$tableData = data.rows ;
                typeof str === 'string' && this.$message({
                    message: str,
                    center: true
                });
            }).catch(() => {
                loading.close();
            });
        },
        /**
         * //页面滚动的时候,加载数据 , 需要在table 表格绑定指令：  v-loadmore="f$loadmoreFn"
         */
        f$loadmoreFn(){
            if (this.m$tableData.length >= this.m$page.total) {
                this.$message({
                    message: '没有更多数据',
                    center: true
                });
            } else {
                ++this.m$page.page;
                const loading = Loading.service({ background: 'transparent', target: 'div.is-scrolling-none', text: '加载中' });
                this.f$getAjax().post(this.f$getQueryData()).then(response => response.json()).then(data => {
                    var $t = this;
                    loading.close();
                    this.$message({
                        message: '数据加载成功',
                        center: true
                    });
                    this.m$page.total = data.total;
                    _forEach(data.rows, d => {
                        $t.m$tableData.push(d);
                    });
                }).catch(() => {
                    loading.close();
                });
            }
        },
        /**
         * 表单重置
         */
        f$resetForm(formName){
            this[formName]={};
            this.$refs[formName]&&this.$refs[formName].resetFields&&this.$refs[formName].resetFields();
            // this.$message({
            //     message: '已重置',
            //     center: true
            // });
        },
        /**
         * 自定义表单验证使用的方法
         * @param {object} rule 
         * @param {string} value 
         * @param {function} callback 
         */
        f$ck(rule, value, callback){
            var re = _T.validate(value || '',rule.ck); 
            if(re.re){//如果验证通过
                callback();
            }else{//验证不通过
                callback(new Error((rule.label||'')+re.info));
            }
        },
        /**
         * 提交表单
         * @param {string} formName 
         */
        f$submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  alert('submit!');
                } else {
                  return false;
                }
              });
        },
        /**
         * 打开dialog
         * @param {string} title 打开dialog的标题 
         */
        f$openDialog(title,obj){
            this.m$diaTitle = title ;
            this.f$resetForm('m$diaInfo') ;
            _merge(this.m$diaInfo, obj) ;
            this.m$dialogVisible = true ;
        },
        /**
         * 删除数据
         */
        f$tableRemove(){
            this.$confirm(`删除确认,共【${this.m$le}】条?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              });
        },
        f$sortChange( column, prop, order ){
            console.log('999999999999999999999999999')
            alert(999)
                console.log('column, prop, order ',column, prop, order )
        }
    }
}
export {
    table
}