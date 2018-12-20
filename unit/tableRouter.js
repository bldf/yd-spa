

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
        "rows":[
          {
            "img":"",
            "flag":2,
            "address":"沈阳市沈北新区蒲南路128号",
            "supplierNo":"123456",
            "crspd":"123456",
            "password":"13b88696e90fbe645ae451e5f5675f22",
            "phone":"13555771333",
            "enable":1,
            "supplier":"沈阳金瑞车业有限公司",
            "id":1103,
            "email":"zhangli@jsszcy.com;shjr@jsszcy.com;wucaili@jsszcy.com;wanhongjun@jsszcy.com",
            "username":"SYJR01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳上发",
            "supplierNo":"000000",
            "crspd":"000000",
            "password":"109fa0370855f33be777c62d5445bafb",
            "phone":"12345678123",
            "enable":1,
            "supplier":"冲压车间",
            "id":1104,
            "email":"12345@163.com",
            "username":"SYHF01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市沈北新区辉山大街150号",
            "supplierNo":"234567",
            "crspd":"234567",
            "password":"782b386fd15a75173f0a99d15a21e93d",
            "phone":"18957734261",
            "enable":1,
            "supplier":"江苏宝特汽车零部件有限公司",
            "id":1105,
            "email":"398666594@qq.com",
            "username":"JSBT01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳上发",
            "supplierNo":"000001",
            "crspd":"000001",
            "password":"63004d73e15b6454c48e276d92587e83",
            "phone":"122365498778",
            "enable":1,
            "supplier":"焊接车间",
            "id":1107,
            "email":"654321@163.com",
            "username":"SYHF02"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市道义北大街439-2号",
            "supplierNo":"1234567",
            "crspd":"1234567",
            "password":"11abd0083b41540c3ba10e8fd1b9a317",
            "phone":"13609880853",
            "enable":1,
            "supplier":"沈阳程胜汽车零部件有限公司",
            "id":1111,
            "email":"x_csqp@163.com",
            "username":"SYCS01"
          },
          {
            "img":"",
            "flag":2,
            "address":"浑南新区南屏东路26",
            "supplierNo":"1234568",
            "crspd":"1234568",
            "password":"295767968f3cb7e8c7fc834e5f7573df",
            "phone":"13940066859",
            "enable":1,
            "supplier":"沈阳华晨东兴汽车零部件有限公司",
            "id":1114,
            "email":"2009_wangwei@163.com",
            "username":"HCDX01"
          },
          {
            "img":"",
            "flag":2,
            "address":"辽宁省沈阳市大东区翰林大街2号",
            "supplierNo":"1234511",
            "crspd":"1234511",
            "password":"136d63e711af068798fc1dc54ed6233d",
            "phone":"13889830320",
            "enable":1,
            "supplier":"沈阳凌云吉恩斯科技有限公司",
            "id":1115,
            "email":"wangbin@lygf.com",
            "username":"SYLY01"
          },
          {
            "img":"",
            "flag":2,
            "address":"吴江汾湖经济开发区翠塔南灶工业小区彩虹路",
            "supplierNo":"1234512",
            "crspd":"1234512",
            "password":"1ac4505bca04697d2198fe76e73a3ee0",
            "phone":"15995564994",
            "enable":1,
            "supplier":"吴江新盛五金制品厂",
            "id":1116,
            "email":"15995564994@163.com",
            "username":"WJXS01"
          },
          {
            "img":"",
            "flag":2,
            "address":"辽宁省新民市金五台子镇",
            "supplierNo":"1234514",
            "crspd":"1234514",
            "password":"080b7df9f0a36b4a07619f45500aea0d",
            "phone":"15840160299",
            "enable":1,
            "supplier":"沈阳华星机械有限公司",
            "id":1117,
            "email":"syhxwlb@126.com",
            "username":"SYHX01"
          },
          {
            "img":"",
            "flag":2,
            "address":"乳山市开发区台湾路6号",
            "supplierNo":"1234510",
            "crspd":"1234510",
            "password":"a1ba541fc72b8fe3f1d83749c63c97b7",
            "phone":"1856314185",
            "enable":1,
            "supplier":"乳山市海洋机械有限公司",
            "id":1118,
            "email":"lixiaoming@haiyangmachine.com",
            "username":"RSHY01"
          },
          {
            "img":"",
            "flag":2,
            "address":"上海市闵行区马桥陪昆路1-2",
            "supplierNo":"1234513",
            "crspd":"1234513",
            "password":"41a1fce429cce92d1e952d2a8c50b19f",
            "phone":"18917338373",
            "enable":1,
            "supplier":"上海纳特标准件有限公司",
            "id":1119,
            "email":"songwei151@126.com",
            "username":"SHNT01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳经济技术开发区民营工业园民旺街2号",
            "supplierNo":"1234515",
            "crspd":"1234515",
            "password":"454b174a7a88c48d58f36eb5e71330ef",
            "phone":"13898270863",
            "enable":1,
            "supplier":"沈阳聚和源汽车部件有限公司",
            "id":1120,
            "email":"mdf@juheyuan.cn",
            "username":"SYHY01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳经济技术开发区浑河十三街二号",
            "supplierNo":"1234569",
            "crspd":"1234569",
            "password":"f4c9e38cb3778f61da1ac129cf4a2122",
            "phone":"13390244295",
            "enable":1,
            "supplier":"辽宁瑞博精密部件有限公司",
            "id":1121,
            "email":"songwei151@126.com",
            "username":"LNRB01"
          },
          {
            "img":"",
            "flag":2,
            "address":"上海市宝山区富联路1058号",
            "supplierNo":"1234516",
            "crspd":"1234516",
            "password":"7e3463947fd76b11dea205a0af04664f",
            "phone":"17316583916",
            "enable":1,
            "supplier":"上海航空发动机制造有限公司",
            "id":1122,
            "email":"18721981608@163.com",
            "username":"HFZB01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳经济技术开发区民营工业园民旺街2号",
            "supplierNo":"1234515",
            "crspd":"1234515",
            "password":"eb8979d270c3e68c927b3fa4f77b8d69",
            "phone":"13898270863",
            "enable":1,
            "supplier":"沈阳聚和源汽车部件有限公司",
            "id":1125,
            "email":"mdf@juheyuan.cn",
            "username":"SYHY02"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市大东区轩顺北路29号",
            "supplierNo":"1234517",
            "crspd":"1234517",
            "password":"045853f77f5c608016150dc3782126d3",
            "phone":"15041273937",
            "enable":1,
            "supplier":"沈阳世纪华通汽车部件有限公司",
            "id":1131,
            "email":"wl8_syht@chuatong.com",
            "username":"SJHT01"
          },
          {
            "img":"",
            "flag":2,
            "address":"吴江汾湖经济开发区翠塔南灶工业小区彩虹路",
            "supplierNo":"1234512",
            "crspd":"1234512",
            "password":"9b8f0a1f98415a29fc3bbe2636465ab1",
            "phone":"15995564994",
            "enable":1,
            "supplier":"吴江新盛五金制品厂",
            "id":1132,
            "email":"15995564994@163.com",
            "username":"WUJS01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市道义北大街439-2号",
            "supplierNo":"200001",
            "crspd":"200001",
            "password":"95d6f1088cfdb330ac3d040b9956b7ab",
            "phone":"15995564994",
            "enable":1,
            "supplier":"沈阳程胜汽车零部件有限公司 6",
            "id":1140,
            "email":"15995564994@163.com",
            "username":"SYCS06"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市沈北新区蒲南路128号",
            "supplierNo":"200002",
            "crspd":"200002",
            "password":"c0497f01cd997cd4db5f0df8e0558546",
            "phone":"15995564994",
            "enable":1,
            "supplier":"沈阳金瑞车业有限公司 6",
            "id":1141,
            "email":"15995564994@163.com",
            "username":"SYJR06"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市经济技术开发区浑河13街",
            "supplierNo":"200003",
            "crspd":"200003",
            "password":"7dd74ee4515da215ff9436d00a3fef31",
            "phone":"13940066859",
            "enable":1,
            "supplier":"辽宁瑞博精密部件有限公司 2",
            "id":1142,
            "email":"2009_wangwei@163.com",
            "username":"LNRB02"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市经济技术开发区浑河十三号街",
            "supplierNo":"200004",
            "crspd":"200004",
            "password":"7310c80b6463df461e92a435b5c2876c",
            "phone":"15840160299",
            "enable":1,
            "supplier":"辽宁瑞博精密部件有限公司 3",
            "id":1143,
            "email":"syhxfudi@126.com",
            "username":"LNRB03"
          },
          {
            "img":"",
            "flag":2,
            "address":"烟台市上庄工业园福新路77号",
            "supplierNo":"200011",
            "crspd":"200011",
            "password":"b1ff7cf1d4497a2a4434d3fc6a228414",
            "phone":"1856314185",
            "enable":1,
            "supplier":"烟台上发汽车零部件有限公司 04",
            "id":1144,
            "email":"1856314185@163.com",
            "username":"YTSF04"
          },
          {
            "img":"",
            "flag":2,
            "address":"烟台市上庄工业园福新路77号",
            "supplierNo":"200010",
            "crspd":"200010",
            "password":"6c94f6990eabd88cdc1db91016981736",
            "phone":"15995564994",
            "enable":1,
            "supplier":"烟台上发汽车零部件有限公司 06",
            "id":1145,
            "email":"15995564994@163.com",
            "username":"YTSF06"
          },
          {
            "img":"",
            "flag":2,
            "address":"上海市宝山区罗北路1959号",
            "supplierNo":"200009",
            "crspd":"200009",
            "password":"aa8ca0b3545931d661f3a6ae2024e1e9",
            "phone":"15995564994",
            "enable":1,
            "supplier":"上海爱德航汽车部件制造有限公司 01",
            "id":1146,
            "email":"15995564994@163.com",
            "username":"ADF01"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市沈北新区蒲南路128号",
            "supplierNo":"200005",
            "crspd":"200005",
            "password":"98df0f0df871ec9dad946cae82a6c0e0",
            "phone":"15840160290",
            "enable":1,
            "supplier":"沈阳金瑞车业有限公司 3",
            "id":1147,
            "email":"syhxfudi@126.com",
            "username":"SYJR03"
          },
          {
            "img":"",
            "flag":2,
            "address":"浑南新区南屏东路",
            "supplierNo":"200006",
            "crspd":"200006",
            "password":"9fb4c5e1da64fab50057b800343fce6b",
            "phone":"13555771333",
            "enable":1,
            "supplier":"沈阳华晨东兴汽车零部件有限公司 5",
            "id":1148,
            "email":"13555771333@163.com",
            "username":"HCDX05"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳市经济技术开发区浑河十三街",
            "supplierNo":"200007",
            "crspd":"200007",
            "password":"eea9828d2b21c6fc7cc6f51f5c703e0f",
            "phone":"18563141852",
            "enable":1,
            "supplier":"辽宁瑞博精密部件有限系公司 4",
            "id":1149,
            "email":"18563141852@163.com",
            "username":"LNRB04"
          },
          {
            "img":"",
            "flag":2,
            "address":"沈阳上发",
            "supplierNo":"000002",
            "crspd":"000002",
            "password":"50d5beac460de716b3c91a716f96726a",
            "phone":"13940074241",
            "enable":1,
            "supplier":"综合管理部",
            "id":1150,
            "email":"13940074241@163.com",
            "username":"SYHF03"
          }
        ]
      });

    });
    /**
     * 获取用户菜单
     */

};

module.exports =  menu ;
