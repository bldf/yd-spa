   function _T(){

    };
    /**
     * 将日期转换为指定格式的字符串
     * str="yyyy/MM/dd HH:mm:ss"
     * 不传递参数默认格式为： str="yyyy/MM/dd HH:mm:ss"
     *传递1表示 str =  "yyyy-MM-dd HH:mm:ss "
     *传递2表示 str="HH:mm:ss"
     */
    _T.format=function(date,str){
        var y = date.getFullYear(), M = date.getMonth()+1, d = date.getDate(), H = date.getHours(), m = date.getMinutes() , s = date.getSeconds() ;
        !str && (str = 'yyyy/MM/dd HH:mm:ss');
        str === 1&&(str ="yyyy-MM-dd HH:mm:ss");
        str === 2&&(str ="HH:mm:ss");
        return str.replace('yyyy',y).replace('MM',_T.toO(M)).replace('dd',_T.toO(d)).replace('HH',_T.toO(H)).replace('mm',_T.toO(m)).replace('ss',_T.toO(s)) ;
    };
    _T.toO=function(str){
        str= Number(str) ;
        return str<10 ?('0'+str) : str ;
    }
    /**
     * @date 2017/11/22 add
     * @param str {string} 要验证的字符串
     * 解析字符串是否合法,验证成功返回{re:true,info:''},验证失败返回{re:false,info'描述'}
     * @param type  {Object} ,要验证的类型
     ll30-40 ; 验证字符串是否为数字并且比30大并且比40小
     le4-9 ;仅仅验证长度是否到达4-9为的长度
     el ; 验证字符串是否为邮箱格式
     wz ; 验证字符串是否为网址的格式
     rq ; 验证字符串是否为日期格式, 日期指定格式有    2017/11/11 或者  2017-11-11目前仅支持这2中验证格式,能判断闰年 .
     sj: 验证是否为手机格式
     dh: 验证是否为电话格式
     fk: 验证是否为空字符
     如果有多个规则用 ","逗号拼接起来就可以了,只要有一个不符合规则立即停止验证，暂时用不上，后续需要用上了在写。。。
     */
    _T.validate=function(string,type){
        var STR = string.replace(/^\s+|\s+$/g,''),as = (type+'').split(','),obj={},le=STR.length,info='',re=true,R={
            el:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            els:'非邮箱格式',
            sj:/^1[34578]\d{9}$/,
            sjs:'非手机格式',
            dh:/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            dhs:'非电话格式',
            wz:/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            wzs:'非网址格式',
            rq:/((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/,
            rqs:'非日期格式',
            fk:/\S{1,}/gi,
            fks:'不能为空',
            ll:function(ar,m1,m2){//判断数值的区间值
                STR = Number(STR) ;
                if(checkAr(ar) && STR && (m1||m1===0) && m2){
                    (STR<m1 || STR>m2)&&(as=[],info="值不能"+(STR<m1?'小':'大')+"于"+((STR<m1?m1:m2)));
                }else{
                    as=[];
                    info=!STR?'非数字':"传递参数错误";
                }
            },
            le:function(ar,m1,m2){//不做任何判断只是验证长度是否合格
                checkAr(ar)&&(le<m1 || le>m2)&&(as=[],info="长度"+(le<m1?'不足':'超出')+((le<m1?m1:m2))+'位');
            }
        };
        // 验证数组的长度是否为2位,如果不是,则结束这个循环,并返回失败信息
        function checkAr(ar){
            if(ar.length!==2){
                info = '参数传递错误' ;
                as=[] ;//用于判断结束for循环
            }else{
                return true ;
            }
        };
        for(var ar,m1,m2,sw,i = 0,k; k=as[i];i++){
            ar = k.substring(2,k.length).split('-');//这个数组存储的是长度,比如,3-4,长度为3到4个
            m1 = Number(ar[0]);
            m2=Number(ar[1]) ;
            sw=k.substring(0,2) ;
            if(R[sw]){
                if(R[sw].test){//如果是正则
                    if(!R[sw].test(STR)){
                        info=R[sw+'s']
                        as=[] ;
                    }
                }else{//如果是方法
                    R[sw](ar,m1,m2) ;
                }
            }else{
                console.error('无法识别验证规则【'+sw+'】');
            }
            !as.length&&(re=false);
        }
        obj.re=re ;
        obj.info = info;
        return obj ;
    };
    /**
     * 验证json是否符合我们想要的数据
     * @param validateObj ; 验证的规则 , key就是需要验证的key, value ，是以逗号分割开的，名称,验证规则
     * @param tar ， 需要被验证的json对象 ,
     *
     */
    _T.ckJ=function(tar,validateObj ){
        var reObj = {re:true},re,ar ;
        tar = tar || {};
        validateObj =validateObj||{} ;
        for(var a in validateObj){
            ar=validateObj[a].split(',');
            re =_T.validate((tar[a] || '')+'',ar[1]) ;
            !re.re&&(reObj.re=false,reObj.info=ar[0]+re.info);
        }
        return reObj ;
    };
    /**
     * 判断元素类型
     * @param a　需要判断的类型
     * @returns {string}
     */
    _T.type=function(a){
        return ({}).toString.call(a).replace(/\[|\]/gi,'').replace(/[a-zA-Z]+\s+/gi,'').toLowerCase() ;
    };
    _T.version = '0.0.1' ;
    export  default   _T ;