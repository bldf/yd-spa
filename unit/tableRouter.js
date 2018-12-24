

	/**
   * @date	2017-07-26
   * @param  type [type:string] => *  aa:获取小写字母 ；
								   *  AA:获取大写字母；  
								   *  Aa:获取大小写字母 ；
								   *  am:获取字母+数字 ；
								   *  HH:获取中文；
								   *  DD:获取日期
								   *  MM : 全数字的字符串
   * @param MIN [type:number] ;获取最小值 ，如果type为DD获取日期类型的话，MIN为日期类型 * 1 :代表yyyy年/MM月/dd日 HH时mm分ss秒
																	      * 2：代表 'yyyy/MM/dd HH:mm:ss' ;
																	      * 3： 代表'HH:mm:ss' ;
																	      * 4：代表 'HH时mm分ss秒';
   * @param MAX [type:number] ; 获取最大值
   * 
   * @demo getRand('AA',3,9) ; 意思：随机获取全大写字母3到9个   返回为： 'OUDMID'
   * 	   getRand('DD',3) ; 意思：获取随机日期，日期格式为  HH:mm:ss   返回为：'23:22:20' ;
   * 随机获取一个随机数
   *
   */
	function getRand(type,MIN,MAX){
    function getR(str,min,max,who){//随机获取  (min到max )个字母,who==1获取随机字母+数字
      who == 1 ? str += Math.random().toString(35).substr(2) : str += Math.random().toString(35).substr(2).replace(/\d+/gi,'') ;
        if(str.length <min ){
            return getR(str,min,max) ;
    }else{
            return str.substring(0,getRound(min,max));
    }
   };
    if(type=='aa'){//随机获取小写字母
    return  getR('',MIN,MAX) ;
  }else if(type=='AA'){//随机获取大写字母
        return  getR('',MIN,MAX).toLocaleUpperCase() ;
  }else if(type=='Aa'){//获取随机大小写字母
    var num = getRound(MIN,MAX) ,// 先获取随机小写字母
      tag = getR('',num,num/2) + getR('',num/2).toLocaleUpperCase(),res='' ;//获取随机大写字母
      for(var a = 0 ,le = tag.length ; a<le; a++){
          res += tag[getRound(0,num-1)] ;
      }
      return  res;
  }else if(type=='am'){//获取随机数字+字母
        return getR('',MIN,MAX,1);//1 :获取随机数字+字母
  }else if(type == 'HH'){//获取随机中文，目前只支持部分中文
    var arr = ['供','了','四','基','本','据','类','型','和','两','种','特','殊','用','来','处','理','据','和','文','而','变','量','提','供','存','放','信','地','方','表','达','式','则','可','以','完','成','较','复','杂','信','息','处','理'],
      str = '' ;
      le = arr.length,
      num = getRound(MIN,MAX);
    for(var a = 0 ; a<num ; a++){
        str += arr[getRound(0,le-1)] ;
    }
    return str ;
  }else if(type=='DD'){//随机获取本年的日期
    var str = 'yyyy/MM/dd HH:mm:ss' ;
    if(MIN == 1){
        str = 'yyyy年/MM月/dd日 HH时mm分ss秒' ;
    }else if(MIN ==2){
        str = 'yyyy/MM/dd HH:mm:ss' ;
    }else if(MIN == 3){
        str = 'HH:mm:ss' ;
    }else if(MIN == 4){
        str = 'HH时mm分ss秒';
    }else if(MIN==5){
      str = 'yyyy-MM-dd';
    }
      return new Date(new Date().getFullYear(),getRound(1,12),getRound(1,31),getRound(1,24),getRound(1,60),getRound(1,60)).format(str) ;
  }else if(type=='MM'){//如果是获取全数字的字符串
    function getM(str,min,max,who){//随机获取  (min到max )个数字
         str += (Math.random()+'').replace(/0\.+/gi,'') ;
          if(str.length <min ){
              return getR(str,min,max) ;
      }else{
              return str.substring(0,getRound(min,max));
      }
     };
       return getM('',MIN,MAX) ;	
  }
}

/**
* 获取随机数
* min：随机数的最大值
* max：随机数的最小值
* num : 保留多少未数字
*/
function getRound(min,max,num){
  var range = max - min , rand = Math.random() ;
  if(!num) num = 0 ;
  return Number(parseInt( min) + Number( Math.abs(rand * range))).toFixed(num) ;
};

/**
* a :要判断的参数类型
*/
function checkType(a){
return ({}).toString.call(a).replace(/\[|\]/gi,'').replace(/[a-zA-Z]+\s+/gi,'').toLowerCase() ;
};
/**
* @date	2017-07-26
* 获取测试数据 。随机获取一个数组的json
* @param obj [type:JSON] ; 固定格式：{
* 										obj:{
* 												user:'HH9-12' ,//key:user不会变。value会变 。'HH9-12'意思： 中文9到12个 。注意：前2个字母必须为字母且必须是指定的特定的字母。并且必须有 '-' 分割的数量。这里的user ,key不会变，只是value会变
* 												'Aa3-5':'aa9-10'//'Aa3-5'意思是：key也为随机大小写字母3到5个。value:'aa9-10'。全小写字母9到10个。
* 											},
* 										size:[number]
* 									 }
* HH全中文    OK
* Aa全字母,包括大小写 OK
* AA全字母大写  OK
* aa全字母小写  OK
* DD:日期类型 ： 2016/07/02 23:23:23
* @demo : 
  getTestData({
         obj:{
             'aa3-4' : 'HH3-9',
             'AA3-4' : 'am8-8',
             'Aa3-4' : 'DD3-3',	
         },
         size:8
       });
    返回结果：
    [{UKF:"i7s1hgja",qwm:"完则和用而据理据",xqqt:"07:04:24"}] ; length=8 ;
  
* }
*/
function getTestData(obj){
    if(obj.size){//如果传递过来的有数量
  // 获取一个数据
  var arr = [] ;
  function getoneObj(){
            var object = obj.obj ,objOne = {};
            function getV(str){
                if(str.length>2 && str.indexOf('-')!=-1){ // 如果是随机的一个key
                    var arr  = str.match(/\d+/gi) ;
                    return getRand(str.substring(0,2),arr[0],arr.length==1?arr[0]:arr[1]) ;
                }else{
                    return str ;
      }
    };
            for(var key in object){
                objOne[getV(key)]=getV(object[key]) ;
            }
            return  objOne ;
  }
        for(var a = 0,si=obj.size ; a<si ;a++){
            arr.push( getoneObj() ) ;
  }
  return arr ;
}
};

/**
* 将日期转换为指定格式的字符串
* str="yyyy/MM/dd HH:mm:ss"
* 不传递参数默认格式为： str="yyyy/MM/dd HH:mm:ss"
*传递1表示 str =  "yyyy/MM/dd "
*传递2表示 str="HH:mm:ss"
*/
Date.prototype.format=function(str){
var y = this.getFullYear(), M = this.getMonth()+1, d = this.getDate(), H = this.getHours(), m = this.getMinutes() , s = this.getSeconds() ;
!str && (str = 'yyyy/MM/dd HH:mm:ss'); 
str === 1&&(str ="yyyy-MM-dd HH:mm:ss");
str === 2&&(str ="HH:mm:ss");
return str.replace('yyyy',y).replace('MM',toO(M)).replace('dd',toO(d)).replace('HH',toO(H)).replace('mm',toO(m)).replace('ss',toO(s)) ;
};

function toO(str){
  str= Number(str) ;
  return str<10 ?('0'+str) : str ;
}



function menu(app){
    app.post('/users.do',(req,res)=>{//查询用户基本信息的测试数据
      res.json({
        "total":28,
        "success":"操作成功！",
        "rows":[]
      });

    });
    /**
     * 获取用户菜单
     */

};

module.exports =  menu ;
