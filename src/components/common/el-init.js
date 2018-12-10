import {assignIn as _assignIn , clone as _clone} from "lodash-es" ;
const table = {
    data: {
        m$searchInfo: {},//顶部查询的数据
        m$searchInfoAjax:{},//顶部查询给后台发送的ajax
        m$diaInfo: {},// dialog保存的数据
        m$le: 0,// 选中的 数量
        m$selectedRows: [],//选中的数据
        m$dialogVisible: false,// dialog是否显示
        m$tableData: [],// 表格显示的数据
        m$tableUrl: '',//加载数据表格的url
        m$page: { page: 1, rows: 35, total: '' },// 控制分页显示的数据 
    },
    methods: {
        /**
         * //查询数据,返回加载ajax的对象。
         * 参考文章： https://juejin.im/entry/583684d4880741006c081fa6
         */
        f$getAjax(){
            if( this.m$tableUrl){
                !this._m$queryHttp && (this._m$queryHttp=this.http(this.m$tableUrl));
                return scopeD.queryHttp ;
            }
        },
        /**
         * table表格选中事件
         * @param {*} r 
         */
        f$tableDataChangeFn(r){
            m$selectedRows=r,
            this.m$le = r.length ;
        },
        /**
         * 顶部查询按钮方法
         * @param {string} str ：查询成功的提示信息：默认提示 " 查询成功 " 
         */
        f$search(str){//顶部点击查询按钮的事件方法
            this.m$searchInfoAjax = _clone(this.searchInfo);
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
            this.$getAjax().post(this.f$getQueryData()).then(response => response.json()).then(data => {
                var $t = this;
                loading.close();
                this.m$page.total = data.total;
                $t.m$tableData = data.rows ; 
                str && this.$message({
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
                this.$getAjax().post(this.f$getQueryData()).then(response => response.json()).then(data => {
                    var $t = this;
                    loading.close();
                    this.m$page.total = data.total;
                    forEach(data.rows, d => {
                        $t.m$tableData.push(d);
                    });
                }).catch(() => {
                    loading.close();
                });
            }
        }
    }
}
export {
    table
}