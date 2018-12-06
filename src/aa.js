//"use strict";
var LL = localStorage ,PW=parent.parent.parent,M={},WN=window; //localStorage:太长用LL代替 ; PW:顶级父页面的window对象
window.ActiveXObject&&navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1]<=9&&(location.href="https://support.dmeng.net/upgrade-your-browser.html");//你目前的IE版本为'+ie+'版本太低，请升级！
!~PW.location.href.indexOf('/test/upload')&&!~PW.location.href.indexOf('/home')&&!~PW.location.href.indexOf('/index')&&!~PW.location.href.indexOf('/pcindex')&&(PW.location.href="/home");
// M：对PC端封装的一些方法
$.extend(M,{
	/**
 	 *默认为设置选择器的值 
 	 *此方法默认为设置值,如果需要获取值, 请添加,getVal: true ; 
 	 *****赋值特点: 如果是取值,支持连续取值. 比如name=obj[0][user][name]等等
 	 * demo: <span name="obj[0].user.name"></span> .  js->  var obj = [{user:{name:'张三'}}]  结果<span name="obj[0].user.name">张三</span>
 	 * @param prev {string || domobject}  选择器 || dome的object对象
 	 * @param opt {Object}  配置参数
 	 * @param tb {string} : 增加默认值。在获取值的情况中，当获取到某一个值为空的时候用什么代替，默认为 ''; 
 	 * opt.data = {} ; 要赋值的json数据
 	 * opt.getVal = true , 获取值 , 默认为false ,设置值
 	 * opt.name ={string}, 标签中的某个属性为作为key，可逗号隔开。opt.name='name,id,class' ;
 	 * opt.type = 1, 只是赋值文本标签
 	 * opt.type = 2 , 只是赋值input标签
 	 * opt.type = 3 , 既可以赋值文本标签又可以赋值input标签 ， 默认为 3 。
 	 */
 	setV:function(prev,opt,tb){
	var arr = checkType(prev) === 'string'?$(prev):prev,key,ifI,ifT,data,reobj ;
	if(!opt.getVal&&!opt.data)console.warn('当前调用为设置值,请给第二位参数添加key为data值为要赋的值,否则将不会成功');
		opt = $.extend({name:'name',type:3,data:{}},opt);
		    key = opt.name ;
			ifI=~(opt.type+'').indexOf([3,2]) ;
			ifT=~(opt.type+'').indexOf([1,3]);
			data = opt.data;
			reobj={} ;
		function setV(d,v){
				(ifI || ifI==0) && checkType(d.value)==='string' ?d.value = v:d.innerText = v  ;//如果是input//如果是文本标签
			}
		function getV(d,t){
		return d[(ifI || ifI==0) && checkType(d.value)==='string'?'value':'innerText'] || t;
		}
 			for(var a = 0,d,attr,getVal=opt.getVal,ks;d=arr[a] ; a++){
 				  	 ks = key.split(','); 
 				  	 for(var  i = 0,k ;k=ks[i] ; i++){
 				  	 	attr=d.getAttribute(k); 
 				  	 	if(getVal){
 				  	 		attr&&(reobj[attr] = getV(d,tb||''));
 				  	 	}else{
	 				  	 	(function(){//解析语法为:   arr[0][username][id],这种取值.
	                            var od = data ;
					  	 			attr=attr.replace(/\./gi,'[').split(/\[/gi);
					  	 			if(attr.length==1){
					  	 				k=od?od[attr[0]]:null;
					  	 			}else{
					  	 				for(var j =0,c;c=attr[j];j++){
					  	 					c=c.replace(/\]/gi,'');
					  	 					if(c!=''){
					  	 						k=od[c];
					  	 						od=k;
					  	 						if(!k)break;
					  	 					}
					  	 				}
					  	 			}
					  	 		})();
 				  	 		setV(d,k==0?k:k|| tb || '');
 				  	 		if(k || k==0)break;
 				  	 	}
 				  	 }
 			}
 			return reobj ; 
 	},
	/**
 * 获取选择器的值
 * @param {string} prev : 选择器,或者原生对象
 * @param {Object} opt : 配置参数json格式，具体通M.setV中的opt参数配置一样。
 * @param {string} tb
 */
 	getV:function(prev,opt,tb){
 		return M.setV(prev,$.extend(opt,{getVal:true}),tb) ;
 	},
	 	/**
 	 * opt.type = 1, 只是赋值文本标签
 	 * opt.type = 2 , 只是赋值input标签
 	 * opt.type = 3 , 既可以赋值文本标签又可以赋值input标签 ， 默认为 3 。
 	 * @param {Object} prev 选择器
 	 * @param {Object} opt 配置参数
 	 */
 	reset:function(prev,opt){
 		M.setV(prev,$.extend(opt,{data:{}}));
 	},
	/**
	 * 验证选择器的值是否合法,默认验证是否为空 
	 * 如果验证失败需要添加提示的,请给标签添加属性 data-ts="你需要提示的key,比如,零件号:"
	 * @param {Object || string } pre 可以是选择器也可以是原生js对象
	 * @param {Object} opt
	 * opt.type = 1, 只是赋值文本标签
	 * opt.type = 2 , 只是赋值input标签
	 * opt.type = 3 , 既可以赋值文本标签又可以赋值input标签 ， 默认为 3 。
	 * opt.nocheck=[{key:'name',value:'张三'}]
	 * opt.get = [true] ; 如果配置为true , 当在匹配都成功的时候,获取值.
	 * opt.getOpt
	 *  简单的理解就是当标签的某个属性为某一个值的时候不做验证,这里是数组,value可以用逗号隔开,就是当某个属性为某个值或某一个值的时候不验证
	 *  该方法会首先验证有没有nocheck,如果有就立即不验证了
	 */
	checkPre:function(pre,opt){
		var arr,type,obj={},re=true,info='',nocheck,target;//obj最终返回的结果 . target:返回验证失败的对象，是原生对象
		opt = opt||{} ;
		type = opt.type || 3 ; 
		nocheck = opt.nocheck || [] ;
	   	if(checkType(pre)=='string'){//如果不是选择器,就是一个对象,如果为string默认就为一个选择器
	   		arr = $(pre) ;
	   	}
	   	for(var a = 0,d;d=arr[a]; a++){//如果没有验证规则,默认验证只是判断不能为空.默认 validate = kk ;
	   		var validate = d.getAttribute('data-validate') || 'fk',vl='value',cck;//获取验证规则
	   		 if(nocheck.length){//如果有不需要验证的标签
	   		 	 for(var o=0,j;j=nocheck[o];o++){
	   		 	 	 if(~(j.val+'').indexOf(d.attr(j.key))){//如果符合不需要验证的标签
	   		 	 	 	cck=true ;
	   		 	 	 	break ;
	   		 	 	 }
	   		 	 }
	   		 	 if(cck){//如果有不需要验证的标签,跳过本次循环
	   		 	 	continue ;
	   		 	 }
	   		 }
	   		 	if(checkType(d.value)!=='string'&& ~[1,3].indexOf(type)){//如果验证的是文本框
	   		 		vl = 'innerText'; 
	   		 	}
	   		 	var o =(d[vl]+'').validate(validate),t=d.parentNode.innerText.trim();
	   		 		if(!o.re){//如果验证失败
	   		 			if(d.attr('data-ts')){//如果有配置提示
	   		 				t = d.attr('data-ts') ;
	   		 			}
	   		 			if(t=='')t=d.parentNode.parentNode.innerText.trim();
	   		 			info = t+o.info ;
	   		 			re = false ;
	   		 			target = d ;
	   		 			break ;
	   		 		}
	   	}
	   	obj.re =re ; 
	   	obj.info = info ; 
	   	obj.target = target ;
	   	if(obj.re && opt.get){//如果都验证成功,获取验证的值,并且配置了获取值
	   		opt.getOpt=opt.getOpt||{};
	   		obj.obj = M.getV(arr,opt.getOpt,opt.getOpt.tb) ;
	   	}
	   	return obj ;
	},
	 /**
     * 将json转换为str
     * jTs 是缩写形式， 全民jsonToStr
     * demo:var obj = {aa:'asdfaf',bb:'afaf'}  ;  M.jTs(); 得到的结果为：aa:'asdfaf',bb:'afaf'
     * opt:[json]配置参数的一个json。opt.item=[].只是组装这个数组里边的key。   demo:  M.jTs({aa:'asf',bb:'999',id:'99'},{item:[id]}).结果： 'id:"99"' ;item:相当于是一个过滤器
     * opt.extend =''  ;自定义拼接字符串.注意结尾不要加逗号。demo:
     * 			demo:M.jTs({aa:'asf',bb:'999',id:'99'},{item:[id],extend:'def:window.abc'}).结果： 'id:"99",def:window.abc' ;item:相当于是一个过滤器
     */
    jTs:function(obj,opt){
        var h = '',it=opt? opt&&checkType(opt.item)==='array' ?opt.item:false:false;
        try {
            for(var a in obj ){
            	if(it && !~it.indexOf(a)){
            		continue ;
            	}
                if(checkType(obj[a])==='function'){//如果是方法
                    h+=(a+':'+obj[a].getFnName()+',');
                }else{//如果不是方法
                	checkType(obj[a])==='boolean'?h+=(a+":"+obj[a]+","):h+=(a+":"+"'"+obj[a]+"',");
                }
            }
            opt&&opt.extend &&(h+=opt.extend+',');
            if(h.length){
                h=h.substring(0,h.lastIndexOf(','));
            }
            return h ;
        } catch (e) {
            throw new Error('将json转换的时候出错了') ;
            return h ;
        }
    },
    /**
	 * 获取元素的offset, 来源JQ 
	 * @param {Object} str  string|object
	 */
	offset:function(str) {
            var b, c, d = {
                top: 0,
                left: 0
            }, e = checkType(str)==='string'?document.querySelector(str):str, f = e && e.ownerDocument;
        b = f.documentElement; 
  "undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()) ;
        c =checkType(f) ? f : 9 === f.nodeType ? f.defaultView || f.parentWindow : !1 ;
        return  {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                };
        },
	/**
	 * 去掉json中值为空字符串的key;
	 * jRe : json-remove-empty : 意思是json去除空字符串。简写后为jRe，方便调用
	 * 2017 / 12 /29 15:51 add
	 * 去掉json中，值为空的数据，主要是查询的时候调用了， 如果有值为空的数据， 就查询不出来了，所以增加了这个方法
	 */
	jRe:function(obj){
		try {
			for(var a in obj){
				checkType(obj[a])==='string' && obj[a].trim()==='' &&(delete obj[a]);
			}
		}catch (e) {
			throw new Error('去掉json中，值为空的数据,报错了');
		}
		return obj ;
	},
	/**
	 * 支持IE9及以上
	 * @param {Object} wrap 图片要存放的容器的选择器。 
	 * @param {Object} pre  图片的选择器 || 或图片对象。图片的地址为data-src
	 * fn:执行成功后的回调 。
	 * demo: M.sizeImg('#line11','#line11 img',function(){});
	 */
	sizeImg:function(wrap,pre,fn){//设置图片等比例缩放。
				var H = $(wrap).height(),W=$(wrap).width(); 
				function setSize(){//原理： 最大的要放到最小的里边去。
					var d=this,si,w,h,o = {
							h:d.naturalHeight ,
							w:d.naturalWidth ,
					};
					o[d.naturalHeight] = 'h' ; 
					o[d.naturalWidth] = 'w' ;
					si=Number(Math.min((W/o.w),H/o.h).toFixed(3));
					w=Number((o.w*si).toFixed(3));
					h=Number((o.h*si).toFixed(3));
					$(d).attr('width',w+'px').attr('height',h+'px');
					fn&&fn(wrap,w,h); 
				};
				for(var a = 0,d,arr=$.type(pre)==='string'?$(pre):pre;d=arr[a];a++){
					$(d).attr('src',$(d).attr('data-src')).load(setSize);
				}
	},
	/**
	 * @param {Object} wrap 图片要存放的容器的选择器。 
	 * @param {Object} pre  图片的选择器 || 或图片对象。图片的地址为data-src
	 *  obj: 参数配置： h:高数字类型。 w宽，数字类型
	 *  demo:  M.sizeDiv('body>div.content','body>div.content>ul',{w:1632,h:834}) ;
	 */
	sizeDiv:function(wrap,pre,obj){//设置容器等比例缩放。
		var H = $(wrap).height(),W=$(wrap).width(); 
		function setSize(o){//原理： 最大的要放到最小的里边去。
			var d=this,si,w,h;
			o[o.h] = 'h' ; 
			o[o.w] = 'w' ;
			si=Number(Math.min((W/o.w),H/o.h).toFixed(3));
			w=Number((o.w*si).toFixed(3));
			h=Number((o.h*si).toFixed(3));
			$(d).css('width',w+'px').css('height',h+'px');
			$(d).attr('data-size',si);
		};
		for(var a = 0,d,arr=$.type(pre)==='string'?$(pre):pre;d=arr[a];a++){
			setSize.call(d,obj);
		}
	}
}) ;
(function($) {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	var Class = function() {},ctd= function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init){
				this.init.apply(this, arguments);
			}
				
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = ctd;
		return Class;
	};
	Class.extend =ctd;
	$.Class = Class;
})(M);
/**
 * a :要判断的参数类型
 */
function checkType(a){
	return ({}).toString.call(a).replace(/\[|\]/gi,'').replace(/[a-zA-Z]+\s+/gi,'').toLowerCase() ;
};
/**
 * name:当前重置的名称，如果页面有多个重置，name不用是唯一的，因为这里是jquery对象调用的方法
 * prev：JQuery选择器或JQueryInput对象
 */
$.fn.checkInputNone=function(name,prev){//判断input是否全部为空
var $t = $(this) ;
	if(!$t.data(name)){
		if($.type(prev)==='object'){
			$t.data(name,prev);	
		}else{
			$t.data(name,$(prev));
		}
	}
var $inputs = $t.data(name),re=true ;
	if(!$inputs){return false;}
		for (var a = 0, input; input = $inputs[a]; a++) {
			var $input = $(input),cls = $input.attr('class'), es = false;
			if($input.attr('type') && $input.attr('type')!='text'){
				continue;
			}
			if (cls)es = cls.match(/easyui-\w+/gi);
			if (cls && es) {//如果EasyUI标签
					var key = es[0].replace('easyui-', '');
					if ($.trim($input[key]('getValue'))!='') {
						re = false;
						break;
					}
			} else {//如果不是easyUI标签
				if ($.trim($input.val()) != '') {
					re = false;
					break;
				}
			}
		}
	return re ;
	
};
/**
 * 判断一个元素是否有滚动条,如果有返回true , 没有返回false
 * num:初始值为多少。
 *
 */
$.fn.hasScroll = function(num){
	var $ar =this.find('>*'),H=this.outerHeight(),m=num||0 ,re=false;
	for(var a = 0,d;d=$ar[a];a++){
		m+=$(d).outerHeight();
		if(m>H){
			re=true ;
			break ;
		}
	}
	return re; 
	
//	var s =this.css('overflow'),re=false,$b=$('body'),h=$b.css('height'); 
//	 this.css('overflow','auto !important');
//	 (window.ActiveXObject || "ActiveXObject" in window)&&$b.css('height','auto') ; 
//	 this[0].scrollHeight >this[0].clientHeight && (re=true) ;
//	 (window.ActiveXObject || "ActiveXObject" in window)&&$b.css('height',h) ; 
//	 this.css('overflow',s);
//	 return re;
}
/**
 * name:当前重置的名称，如果页面有多个重置，请保证name是唯一
 * prev：JQuery选择器或JQueryInput对象
 */
function checkInputNone(name,prev){//判断input是否全部为空
	if(!checkInputNone[name]){
		if($.type(prev)==='object'){
			checkInputNone[name]=prev ;	
		}else{
			checkInputNone[name]=$(prev) ;
		}
	}
var $inputs = checkInputNone[name],re=true ;
		for (var a = 0, input; input = $inputs[a]; a++) {
			var $input = $(input),cls = $input.attr('class'), es = false;
			if($input.attr('type') && $input.attr('type')!='text'){
				continue;
			}
			if (cls)es = cls.match(/easyui-\w+/gi);
			if (cls && es) {//如果EasyUI标签
				var key = es[0].replace('easyui-', '');
				if ($.trim($input[key]('getValue'))!='') {
					re = false;
					break;
				}
			} else {//如果不是easyUI标签
				if ($.trim($input.val()) != '') {
					re = false;
					break;
				}
			}
		}
	return re ;
	
};
/**
 * 判断input输入框或easyUI输入框是否为空，有空返回false,和info,没有空，返回true;
 * prev可以使选择器也可以是一个inputs对象
 * arr = {key:'name',value:[]} // 标签的某一个属性， value不需要显示的值 。 简单理解就是 ， 标签的某个属性为某个值的时候不做判断。
 *
 * arr:{key:'name',value:[]}字符串的数组,如果是一个，可以是字符串 。 作用是筛选一下， 就是在要判断的对象中帅选那些不做判断 。比如:$('.cs td') 中  name="user" 不做判断 ： $('body').checkInputs('.cs td','user')
 * 如果对标签有验证规则。 请给标签添加属性： data-options="y:'ll3-4'" ; 具体验证的类型，请参考。 string.prototype.validate() 中的描述。  
 */
$.fn.checkInputs=function(prev,arr,ifText){
    if(!$(this).data('checkInputs')){
        if($.type(prev)==='object'){
            $(this).data('checkInputs',prev) ;
        }else{
            $(this).data('checkInputs',$(prev)) ;
        }
    }
    return $.checkInputs($(this).data('checkInputs'),arr,ifText) ;
};
//检测是否为空， 接收的是对象，有一个为空返回false， 全部不为空返回true
//arr:字符串的数组筛选一下， 就是在要判断的对象中帅选那些不做判断 。比如:$('.cs td') 中  name="user" 不做判断 ： $('body').checkInputs('.cs td','user')
$.checkInputs = function($inputs,arr,ifText){
    if($.type($inputs)==='string'){
        $inputs=$($inputs);
    }
    var  obj={},re= true,reobj;
    for (var a = 0, input; input = $inputs[a]; a++) {
        var $input = $(input),cls = $input.attr('class'), es = false , name;
        if (cls)es = cls.match(/easyui-\w+/gi);
        if(arr)	name = $input.attr(arr.key) ;
        if(name && arr.value.indexOf(name)!=-1){ // 如果有不需要检测的
            continue;
        }
        if (cls && es) {//如果EasyUI标签
            var key = es[0].replace('easyui-', '');
            if (($input[key]('getValues').length==1 &&  $.trim($input[key]('getValues')[0])=='' ) || !$input[key]('getValues').length) {
                obj.info= getIBI($input);
                re = false;
                reobj = $input.next().find('input:eq(0)') ;
                break;
            }
        } else {//如果不是easyUI标签
            var ip = $.type($input[0].value)==='string';
            if(ifText){//如果包含文本标签
                if(ip){
                    if ($.trim($input.val()) == '') {
                        obj.info= getIBI($input);
                        reobj = $input ;
                        re = false;
                        break;
                    }else{
                    	var p =($input.attr('data-options')+'').tojson();
                    	if(p.y){//如果有验证
                    		p=$input.val().validate(p.y);
                    		if(!p.re){
                    			obj.info= '【'+getIBI($input)+'】'+p.info;
                                reobj = $input ;
                                re = false;
                                break;		
                    		}
                    	}
                    }
                }else{
                    if ($.trim($input.text()) == '') {
                        obj.info= getIBI($input);
                        reobj = $input ;
                        re = false;
                        break;
                    }
                }
            }else{//如果不包含文本标签
                if ($.trim($input.val()) == '') {
                    obj.info= getIBI($input);
                    if($input.parent().hasClass('layui-form'))$input=$input.next();
                    reobj = $input ;
                    re = false;
                    break;
                }else{
                	var p =($input.attr('data-options')+'').tojson();
                	if(p.y){//如果有验证
                		p=$input.val().validate(p.y);
                		if(!p.re){
                			obj.info= '【'+getIBI($input)+'】'+p.info;
                            reobj = $input ;
                            re = false;
                            break;		
                		}
                	}
                }
            }
        }
    }
    obj.re=re ;
    obj.reobj = reobj ;
    return obj;
};
/**
 * 获取标签的详情， 比如【张三<input />】 ，获取的是张三
 * @param $tag
 * @returns
 */
function getIBI($tag){ //getIBI简写 : getInfoByInput 
var $p = $tag.parent(),text = ($.trim($p.text())+'').replace(/\s+/gi,''),v ;
    if($tag.attr('data-ts') && $tag.attr('data-ts').trim()!=''){return $tag.attr('data-ts').trim();}
    if($tag.hasClass('layui-upload-file'))text=$tag.prev().text();
	if(text ==''){
		return $.trim($p.prev().text()) ;
	}else{
		return text ;
	}
};
/**
 * 获取方法的名称
 */
Function.prototype.getFnName= function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
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
	return str.replace('yyyy',y).replace('MM',M.toO()).replace('dd',d.toO()).replace('HH',H.toO()).replace('mm',m.toO()).replace('ss',s.toO()) ;
};
/**
 * 如果一个字符串为 8 ， 返回'08';
 */
String.prototype.toO=function(){
	var a = Number(this) ; 
	if(a<10){
		return '0'+a ;
	}else{
		return a ;
	}
};
/**
 * 去除前后空格
 */
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,'');
};
/**
 * @date 2017/11/22 add
 * 解析字符串是否合法,验证成功返回{re:true,info:''},验证失败返回{re:false,info'描述'}
 * @param {Object} type ,要验证的类型
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
String.prototype.validate=function(type){
    var str = this.replace(/^\s+|\s+$/g,''),as = (type+'').split(','),obj={},le=str.length,info='',re=true,R={
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
		ll:function(ar,m1,m2){//不做任何判断只是验证长度是否合格
		 str = Number(str) ;
         if(checkAr(ar) && str && (m1||m1===0) && m2){
         	(str<m1 || str>m2)&&(as=[],info="值不能"+(str<m1?'小':'大')+"于"+((str<m1?m1:m2)));
         }else{
             info=!str?'非数字':"传递参数错误";
         }
		},
		le:function(ar,m1,m2){
			checkAr(ar)&&(le<m1 || le>m2)&&(as=[],info="长度"+(le<m1?'不足':'超出')+((le<m1?m1:m2))+'位');
		}
};
    // 验证数组的长度是否为2位,如果不是,则结束这个循环,并返回失败信息
    function checkAr(ar){
        if(ar.length!=2){
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
        		 if(!R[sw].test(str)){
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
 * 如果一个数字为 8 ， 返回'08';
 */
Number.prototype.toO=function(){
	return (Number(this)+'').toO() ;
};
/**
 * 弹出框
 * @param {string} info
 * @param {Number} num
 * fn 关闭的时候执行的方法
 * 此方法可以使用， 但是此弹窗永远只会看到最后一个，所以做了一下调整使用下边的$.al() ;参数一样
 */
//$.al=function(info,num,fn){
//	$.al.a && clearTimeout($.al.a);
//	$.al.b && clearTimeout($.al.b);
//	$span = $('<span class="shi-dian-dialog-al">'+info+'</span>') ;
//	parent.$('body').append($span);
//	setTimeout(function(){
//		$span .css({opacity:1,marginTop:0});
//	},10);
//	if(!num)num=2000;
//	$.al.a=setTimeout(function(){
//		$span.css({opacity:0}); 
//		$.al.b=setTimeout(function(){
//			parent.$('.shi-dian-dialog-al').remove();
//			fn && fn();
//		},250) ;
//	},num);
//}
/**
 * 弹出框
 * @param {string} info
 * @param {Number} num
 * fn 关闭的时候执行的方法
 * 此方法调用的是父元素的  sdalert 方法，也可单独使用，因为多个窗口依赖父元素，setTimeout受窗口显示，单页面使用没有影响
 */
$.al=function(info,num,fn){
	if(parent.parent.parent.parent.sdalert){
		parent.parent.parent.parent.sdalert(info,num,fn) ;	
	}else{
		   var $$ = parent.parent.parent.parent.$,$span = $$('<span class="shi-dian-dialog-al2">'+info+'</span>') ;
//		   var $$ = $,$span = $$('<span class="shi-dian-dialog-al2">'+info+'</span>') ;
		    !$$.ddd && $$('body').append('<div class="shi-dian-al-div" style="position:absolute;top:50%;left:50%;z-index:999999999999999;height:10px;transform:translate(-50%,-50%)"></div>') ;
		    $$.ddd = true ; //保证父级只有一个div
		    $$('body>div.shi-dian-al-div').append($span);
		    setTimeout(function(){
		        $span .css({opacity:1,marginTop:10});
		    },10);
		    if(!num)num=2000;
		        setTimeout(function(){
		            $span.css({opacity:0});
		            setTimeout(function(){ //关闭弹窗
		                $span.remove();
		                fn && fn();
		            },500) ;
		        },num);//设置多少时间关闭弹窗
		var $sps = $$('body>div.shi-dian-al-div>span') ;
//		    $sps.size()>5 && $sps.filter(':lt(1)').remove(); //超过4个把4个之前的删掉
		    $sps.size()>5 && $sps.eq(0).remove(); //超过4个把4个之前的删掉
	}
};



/**
 * 发送ajax
 */
$.sendAjax =  { // 发送ajax专用
		 url:"",
		 data:"",
		 callFn:$.noop,
		 send:function(url,DATA,fn,async,errFn){//async:true:异步，false：同步 ，1：不启动加载动画， 默认为true,异步加载；errFn:失败的时候调用的方法
			 var url2,data2 ;
			 if(window.layer){
				 layer.closeAll('loading');
				 async!==1&&checkType(async)!='boolean'&&layer.load(2);
			 }
			  url2 = url.replace(/\?.+/gi,'');
			  data2 = urlToJson(url);
		 arguments.length ==4 && $.type(async)==='boolean' ? async=async: async=true ;
		   	   $.ajax({
						type:$.type(errFn)==='object'?errFn.type?errFn.type:'POST':"POST",
						data: $.type(DATA)==='string'?DATA:$.extend(data2,DATA),
						url:$.type(DATA)==='string'?url.trim():encodeURI(url2.trim()),
						cache: false,
						async:async,
						contentType:$.type(errFn)==='object'?errFn.contentType?errFn.contentType:'application/x-www-form-urlencoded':"application/x-www-form-urlencoded",
						timeout:10000,
						success:function(data){
							if($.type(data)=='string'){
								var re = data.match(/<title\s*.*>\s*.*<\/title>/gi)||[] ;
								if(re.length==1 && ((re[0]+'').replace(/\w+|\<+|\>+|\/+/gi,'').indexOf('华域车身生产信息化系统')!=-1)){
										if(PW.OVERTIME)return ;
										PW.OVERTIME = true ;
										alert('登录超时！请重新登录！');
										PW.location.href="/" ;		
										return ;
								}else if(~data.indexOf('user_status') && ~data.indexOf('300') || (re.length==1 && ~(re[0]+'').indexOf('被踢出'))){
										if(PW.OVERTIME)return;
										PW.OVERTIME = true;
										alert('你已在其它地方登录！您已被踢下线！如非本人操作，请尽快修改密码');
										PW.location.href="/";		
										return ;
								}
							}
		                    fn.call(this,data,DATA) ; 
		                    if($.type(async)!=='number' && async!=1){//传入1不启动加载动画
		                    	window.layer && parent.layer.closeAll('loading');
		           		     }
		                    window.layer && layer.closeAll('loading');
						},
						error:function(s,t,e){
						var st = s.status ; 
							if( $.type(errFn)==='function' ) {
								errFn(st) ;
							}else{
								if(st!=200){
									if(st==404){
										$.SDal("访问错误(404)!",1000);
									}else if(st==0){
										(function(){//看板页面不弹出提示框
											var h=location.href,ar = ['kanbanlocat','totalOutput','board','stopErrorBoard','pcOtherWorkshops','allCarLoad','imgShow'] ;
											!~ar.indexOf(h.substring(h.lastIndexOf('/')+1,h.length))&&$.SDal('连接服务器失败！请联系系统管理员！',1000) ;
										})();
									}else{
										(function(){//看板页面不弹出提示框
											var h=location.href,ar = ['kanbanlocat','totalOutput','board','stopErrorBoard','pcOtherWorkshops','allCarLoad','imgShow'] ;
											!~ar.indexOf(h.substring(h.lastIndexOf('/')+1,h.length))&&$.SDal(t+': '+s.status+"请联系系统管理员!",1000);
										})();
									}
									window.layer && layer.closeAll('loading');
								}
							}
							window.layer && layer.closeAll('loading');
						},
						complete :function(XMLHttpRequest,status){
							if(status=='timeout'){//超时,status还有success,error等值的情况
								(function(){//看板页面不弹出提示框
									var h=location.href,ar = ['kanbanlocat','totalOutput','board','stopErrorBoard','pcOtherWorkshops','allCarLoad','imgShow'] ;
									!~ar.indexOf(h.substring(h.lastIndexOf('/')+1,h.length))&&$.SDal("请求数据超时！请重试,请检查网络或刷新重试",3000);
								})();
								window.layer && layer.closeAll('loading');
							}
							window.layer && layer.closeAll('loading');
						}
					});
		 }
};
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
 * 获取JQuery对象中的value ,前提是必须得有name,能获取easyUi的值
 * @param {Object} $tag:$JQuery对象,
 */
 function getValues($inputs){
	var re = {};
	for(var a = 0,input ;input=$inputs[a] ;a++){
		var $input = $(input), name = $.trim($input.attr('name')); 
		if(name == '')name=$.trim($input.attr('textboxname'));
		if(name !=''){
			re[name]=$input.val();
		}
	}
	 return re ;
};
/**
 * 获取JQuery对象中的value ,前提是必须得有name,能获取easyUi的值,没有name也可以，第三个参数就是标签的属性，通过该属性也可以取值
 * 注意：一般都是td>input ， input是同级的
 * 
 * @param prev:JQ选择器 或者  JQueryInput对象
 * text = boolean , 为true ，也能获取包含有name的文本text
 * namerep:如果传递过来的值没有name,因该用什么去命名取值到的key, 一般为标签的属性去取值， 比如id， <input id=aa/> 取到的值就是{aa:23}
 *      也可以是复杂组合用逗号隔开,优先使用name , 然后穿过来的key , 然后再是逗号隔开的 , easyUI除外
 */
$.fn.getValues=function(prev,text,namerep){
	if(!$(this).data('getValues')){
		if($.type(prev)==='string'){
			$(this).data('getValues',$(prev)) ;	
		}else{
			$(this).data('getValues',prev) ;
		}
	}
	return $.getValues($(this).data('getValues'),text,namerep);
};
$.getValues=function($inputs,text,namerep){
	var re = {};
	if($.type($inputs)==='string')$inputs=$($inputs);
	if(!$inputs){
		return {}; 
	}
	for(var a = 0,input ;input=$inputs[a] ;a++){
		var $input = $(input), name = $.trim($input.attr('name')); 
		if(namerep && name==''){
		var n = namerep.match(/\w+/gi) ;
			if(n){ //如果传递过来的是多个以逗号隔开的
				for(var q = 0 , d ; d= n[q] ; q++){
					if($.trim($input.attr(d))!=''){
						name = $.trim($input.attr(d)) ; 
						break ; 
					}
				}
			}else{
				name= $.trim($input.attr(namerep));	
			}
		}
		if(name == '')name=$.trim($input.attr('textboxname'));
		if(name !=''){
		var cls = $input.attr('class'),es = false ,it =$input.attr('type') ;
			if((it && $input.attr('type')!='text' && it!='number' &&  it!='radio' && it!='password'  && it!='checkbox' && it !='hidden')){
				continue;
			}
			if (cls)es = cls.match(/easyui-\w+/gi);
			if (cls && es) {//如果EasyUI标签
			var key = es[0].replace('easyui-', ''),arr =  $input[key]('getValues');
				if(arr.length === 1){
					re[name] = arr[0];
				}else{
					re[name] =arr.join(',') ;	
				}
			} else {//如果不是easyUI标签
				if(text && $.type($input[0].value)!=='string'){
					re[name]=$.trim($input[0].innerText);
				}else{
					if(!$input.hasClass('textbox-value')){
						if(name.match('-') && name.match('-').length && $input.val()!=''){//如果不是easyui的input才添加,是layui的日期选择框
							var ra = name.split('-'),vs=$input.val().split('~') ;	
							re[ra[0]]=$.trim(vs[0]);
							re[ra[1]]=$.trim(vs[1]);
						}else{
							re[name]=$.trim($input.val());//如果不是easyui的input才添加	
						}
					}	
				}
			}
		}
	}
	 return re ;
}
/**
 * 给input输入框赋值
 * prev可以使jq对象， 也可以是一个JQ选择器，obj要设置值的对象
 * nodeName:获取什么属性，默认获取name属性，如果不是可获取其他的，比如id,第三个参数就传入id
 */
$.fn.setValues=function(prev,obj,nodeName){
	if(!$(this).data('setValues')){
		if($.type(prev)==='string'){
			$(this).data('setValues',$(prev)) ;	
		}else{
			$(this).data('setValues',prev) ;
		}
	}
	var $inputs = $(this).data('setValues');
	$.setValues($inputs,obj,nodeName);
};
$.setValues=function($inputs,obj,nodeName){
	if($.type($inputs)==='string'){
		$inputs = $($inputs);
	}
	if(!$inputs){
		return ; 
	}
	if(!nodeName)nodeName = 'name' ;
	  for(var a = 0,input;input = $inputs[a] ;a++){
		var $input = $(input),cls = $input.attr('class'),name=$input.attr(nodeName), es = false;
			if($.type($input[0].value)!=='string'){
				continue;
			}
			if (cls)es = cls.match(/easyui-\w+/gi);
			if (cls && es) {//如果EasyUI标签
				name = $input.attr('textboxname') ;
			var key = es[0].replace('easyui-', '');
				name && (obj[name] || obj[name]==0)  && $input[key]('setValue',obj[name]) ;
			} else {//如果不是easyUI标签
				name && (obj[name] || obj[name]==0) && $input.val(obj[name]) ;
			}
	  }
};
/**
 * 讲json序列化为url地址栏参数
 * @param json
 */
function jsonToLiber(json){
	var re ='',i ;
	if(json){
		for ( var key in json) {
			json[key]!='' && ( re += key +'=' + json[key] +'&');
		}
	}
	i = re.lastIndexOf('&') ; 
	i!=-1&&(re = re.substring(0,i));
	return re;
};

/**
 * 将地址栏传递的参数转换为json 
 */
function urlToJson(str){
	var arr = (str+'').replace(/.+?\?/gi,'').split('&'),reobj={} ;
	if(arr[0]==str)return reobj ;
	for(var a =0,ra, d;d=arr[a];a++){
		ra=d.split('=');
		reobj[ra[0]]=ra[1] ;
	}
	return reobj ;
}

$.selectInfo=function(prev,obj,no,other){
var $tag =$.type(prev)==='string'?$(prev):prev,attr = 'name' ;
	!obj && (obj = {}) ;
    if(other && $.trim(other) !='' && $.type(other) ==='string') attr = other ;
	for(var a = 0 ,td;td=$tag[a]; a++){
	var $td = $(td),name = $td.attr(attr),v=obj[name] ;
		if(name && name!=''){
			if(v || v===0){
				$td.text(v) ;
			}else if(!no){
				$td.html('&nbsp;') ;
			}
		}
	}
};
/**
 * 给标签赋值
 * prev:JQ选择器，也可以是一个JQ对象。 需要被赋值，obj，要赋值的json
 * demo: $('#id').selectInfo('',obj);
 * no:boolean : 如果为true，当没有需要赋值的时候不用管。
 * other:如果不是根据name获取值根据其他获取值。 比如id ;
 */

$.fn.selectInfo=function(prev,obj,no,other){
	if(!$(this).data('select')){
		if($.type(prev) === 'string'){//如果是选择器
			$(this).data('select',$(prev)) ;  	
		}else if($.type(prev) === 'object'){ //如果是JQ对象
			$(this).data('select',prev) ;  
		}
	}
	$.selectInfo(prev,obj,no,other);
};

/**
	  *@ date 2017/09/25 
	  * 判断一个元素的标签类型 
	  * @param {Object} str
	  * demo :document.querySelectorAll('div')[0].is('div') ; 返回结果:true ;
	  */
	 HTMLElement.prototype.is = function(str){
	  	return this.tagName.toLocaleLowerCase()==(str+'').trim() ;
	 };
	 /**
  	  * 设置或者获取原生标签的属性 ,如果是设置返回自己,如果是获取返回获取的值
  	  * @param {Object} key
  	  * @param {Object} val
  	  */
  	  HTMLElement.prototype.attr = function(key,val){
		  	if(val){//如果是设置属性
		  		this.setAttribute(key,val) ;
		  		return this ;
		  	}else{//如果是获取属性
		  		return this.getAttribute(key);
		  	}
  	 };

/**
 * prev可疑是JQuery的选择器或者Jquery对象（input对象）
 * text  = boolean , 如果传过来为true,可清空td等文本标签的内容
 * ifTest :boolean , 如果为true,则不是清空这是添加假数据测试的数据 。 2017、08、17 add. 
 */	
	$.fn.resetInput=function (prev,text,ifTest){
			if(!$(this).data('resetInput')){
				if($.type(prev)==='string'){
					$(this).data('resetInput',$(prev)) ;	
				}else{
					$(this).data('resetInput',prev) ;
				}
			}
		$.resetInput($(this).data('resetInput'),text,ifTest);
		};
	$.resetInput=function (prev,text,ifTest){
		var $inputs = prev ; 
		$.type(prev)==='string' && ($inputs=$(prev));
		if(!$inputs)return ; 
		  for(var a = 0,input;input = $inputs[a] ;a++){
				var $input = $(input),cls = $input.attr('class'), es = false,it=$input.attr('type');
				if(it && it=='radio'){
					$input.removeAttr('checked');
					continue;
				}
				if($.type($input[0].value)!=='string'){
					continue;
				}
				if (cls)es = cls.match(/easyui-\w+/gi);
				if (cls && es) {//如果EasyUI标签
					var key = es[0].replace('easyui-', '');
					//ifTest==true 如果是测试就是添加数据而不是清空数据了
					if(ifTest){//如果是添加测试数据
					  if(key=='combobox'){//如果是combobox
						  var AR  =  $input[key]('getData'),RR= AR[getRound(0,AR.length-1)] ,VVV;
						  for(var A in RR){
							  VVV = RR[A] ;
						  }
						  $input[key]('setValue',VVV+'');
					  }else if(key=='datebox'){
						  var DD = new Date() ;
						  var y = DD.getFullYear(), M = DD.getMonth()+1;
						  $input[key]('setValue',new Date(y,getRound(M-1,M+1),getRound(1,28)).format('yyyy-MM-dd'));
					  }	
					}else{
						$input[key]($input[key].methods.clear?'clear':'setValue',''); 
					}
				} else {//如果不是easyUI标签
					if(text && $.type($input[0].value)!=='string'){
						ifTest? $input.text(getRand('am',4,5)):$input.text('');
					}else{
						if(ifTest){//如果是测试就是添加假数据赋值不是清空值
							if($.trim($input.val())=='')$input.data('inpnum')?$input.val(getRand('MM',2,2)):$input.val(getRand('am',4,5)) ;
						}else{
							if(!$input.hasClass('no-remove'))$input.val('');	
						}
					}
				}
		  }
		};
		/**
		 * 仕点智能统一确认框
		 * @param {Object} obj
		 * obj{
		 * 	title: (string) '标题'
		 *  info: (string) '显示的内容',
		 *  fn: (function) '点击确定执行的方法’
		 *  noFn: (function) '点击取消执行的放啊',
		 *  yes: (string) 左边确定按钮显示的文字，默认为显示为 “ 确定 ” 
		 *  no:(string)  右边按钮取消显示的文字， 默认显示为“ 取消 ”
		 *  addBtn:(boolean) 添加一个取消按钮,true:添加，false，不添加，不写默认不添加
		 *  initFn:(function)标签初始化创建完成之后执行的方法
		 *  如果fn或者noFn返回有参数 ， 则不关闭
		 *  canFn: 当有三个按钮的时候， 点击最右边的取消的回调函数
		 *  anima : boolean / string  添加动画效果
		 *  outanima : 出去时动画
		 * }
		 */
				$.SDcon=function(obj){
					parent.$('.shi-dian-dialog-al').remove();
					$('.shi-dian-dialog-yy,.shi-dian-dialog').remove();
					var $body = $('body') , options,$dia,$yy=$('<div class="shi-dian-dialog-yy"></div>');
				 	$('body').append($yy) ;
				    options = {title:"提示",addBtn:'' ,yes:'确定',no:'取消',info:'' ,fn:$.noop,noFn:$.noop,canFn:$.noop} ;
				    $.extend(options,obj);
				    if( obj.addBtn ) options.addBtn="<button class='layui-btn' title='取消'>取消</button>" ;
				    $dia=$('<div class="shi-dian-dialog">'+
							'<h4 class="dialog-title">'+options.title+'</h4>'+
							'<div id="dialog-info" class="dialog-info">'+options.info+'</div>'+
					           '<div class="dialog-botton">'+
						           	'<button class="layui-btn layui-btn-normal" title='+options.yes+'>'+options.yes+'</button>'+
						           	'<button class="layui-btn '+(options.addBtn?'layui-btn-normal':'')+'" title="'+options.no+'">'+options.no+'</button>'+options.addBtn+''+
					           '</div>'+
						'</div>');
					$body.append($dia) ;
					$dia.height($dia.find('.dialog-title').outerHeight()+$dia.find('div.dialog-botton').outerHeight()+30+$dia.find('#dialog-info').outerHeight()+40+'px');
					obj.anima===true&&(obj.anima='bounce');
					obj.outanima===true&&(obj.outanima='fadeOutUp');
					obj.anima && $dia.addClass('animated '+obj.anima).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				      $(this).removeClass('animated '+obj.anima);
				    });
					options.initFn && options.initFn() ; 
					$dia.find('.dialog-botton>button').click(function(){
						var i = $(this).index(),k ;//k:执行完方法返回的参数
						if(i==0)k =options.fn()  
						if(i==1)k=options.noFn() ;
						if(i==2)k=options.canFn();
						if(!k){
							$('.shi-dian-dialog-yy').remove() ;
							obj.outanima?$('.shi-dian-dialog').addClass('animated '+obj.outanima).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							      $('.shi-dian-dialog-yy,.shi-dian-dialog').remove();
						    }):$('.shi-dian-dialog-yy,.shi-dian-dialog').remove();;
						}else{
							var type = $.type(k) ;
							if(type==='string'){
								$.al(k) ;
							}else if(type==='function'){
								k() ;
							}
						}	
					}) ;
					$yy.click(function(){
						$('.shi-dian-dialog-yy').remove() ;
						obj.outanima?$('.shi-dian-dialog').addClass('animated '+obj.outanima).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						      $('.shi-dian-dialog-yy,.shi-dian-dialog').remove();
					    }):$('.shi-dian-dialog-yy,.shi-dian-dialog').remove();;
					});
		};
/**
 * 仕点智能统一提示框
 * @param {Object} obj
 * obj.title = 提示的标题
 * obj.info=提示的信息
 * obj.yyClick [boolean]  false:点击阴影不关闭弹窗 true:点击阴影可以关闭。 默认为true .	
 * 如果obj是字符串就是提示的内容
 * out,多久时间关闭， 
 * fn，多久时间关闭后的回调； 
 * anima : boolean / string  添加动画效果
 */
		$.SDal=function(obj,out,fn){
			$('.shi-dian-dialog-yy,.shi-dian-dialog').remove();
			var $body = $('body') , options,$dia,$yy=$('<div class="shi-dian-dialog-yy"></div>'),tm;
		 	$('body').append($yy) ;
		    options = {title:"提示" ,info:'' ,fn:$.noop,btn:'关闭',yyClick:true} ;
		    $.extend(options,$.type(obj)==='string'?{info:obj}:obj);
		    $dia=$('<div class="shi-dian-dialog">'+
					'<h4 class="dialog-title">'+options.title+'</h4>'+
					'<div id="dialog-info" class="dialog-info">'+options.info+'</div>'+
			           '<div class="dialog-botton">'+
				           	'<button class="layui-btn" title="'+options.btn+'">'+options.btn+'</button>'+
			           '</div>'+
				'</div>');
		    $body.append($dia) ;
		    $dia.height($dia.find('.dialog-title').outerHeight()+$dia.find('div.dialog-botton').outerHeight()+30+$dia.find('#dialog-info').outerHeight()+40+'px');
			obj.anima===true&&(obj.anima='bounce');
			obj.outanima===true&&(obj.outanima='fadeOutUp');
			obj.anima && $dia.addClass('animated '+obj.anima).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		      $(this).removeClass('animated '+obj.anima);
		    });
			$dia.find('button').click(function(){
				$yy.trigger('click',{type:1});
			}) ;
			$('.dialog-botton button').focus();
			$yy.click(function(e,D){
				if((D&&D.type===1) || options.yyClick){
					obj.outanima?$('.shi-dian-dialog').addClass('animated '+obj.outanima).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					      $('.shi-dian-dialog-yy,.shi-dian-dialog').remove();
				    }):$('.shi-dian-dialog-yy,.shi-dian-dialog').remove();;
					tm && clearTimeout(tm) ;
					fn && fn();	
				}
			});
			$('body').click();
			if( out )tm =setTimeout(function(){$yy.click();fn && fn();},out); 
		};
		/**
		 * 
		 * @param url:要打开页面的url
		 * @param id:id可为数字，也可为中文，当打开多个ifreame时代表唯一标识
		 * 如果不传递id，当关闭时，将关闭所以添加的ifreame
		 * fn:加载完成该页面后要执行的方法,回调传递过去一个JQ
		 */
		function insulate(obj,id,fn){
			var url, style="" ,yystyle='',cls = '',$if ,name='ifff';
			if($.type(obj) === 'object'){ //如果传递过来的是一个对象
				url = obj.url ;
				id = obj.id ;
				fn = obj.fn ;
				style = obj.style ;
				yystyle = obj.yystyle ;
			}else {//如果不是则按照参数传递
				url = obj ;
			}
			if(id){
				cls = ' ifff'+id ;
				name = name + id ; 
				$('.body-iframe-yy.ifff'+id+',.body-iframe.ifff'+id).remove();
				closeInsulate.timer && clearTimout(closeInsulate.timer) ;
			}
			if(!style)style="" ;
			$if =$('<iframe style="'+style+'" name="'+name+'" class="body-iframe'+cls+'" src="'+url+'" frameborder="no" scrolling="no" ></iframe>') ; 
			$(parent.document).find('body').append($if) ;
			fn && $if.on('load',function(){
				fn.call(parent[name],parent[name].$);
			})
			$(parent.document).find('body').append('<div style="'+yystyle+'" class="body-iframe-yy'+cls+'"></div>');
		}
		/**
		 * 关闭打开的ifreame，id代表ifreame的唯一标识，如果不传递，将关闭所有打开的ifreame ;
		 * @param id
		 */
		function closeInsulate(id){
		var cls = '' ;
			if(id)cls = '.ifff'+id ;
			$(parent.document).find('.body-iframe-yy'+cls).remove() ;
			$(parent.document).find('.body-iframe'+cls).hide(700);
			setTimeout(function(){
				$(parent.document).find('.body-iframe-yy'+cls+',.body-iframe'+cls).remove();
			},700);
		}
		/**
		 * 数组去除重复
		 * @param arr
		 * @returns
		 */
		function remorepeat(arr){
		    var r = [] ;
		    for(var a = 0 ,d;d=arr[a] ;a++){
		        if(r.indexOf(d)<0)r.push(d);
			}
		    return r ;
		}
		
		
		
		//初始化socket
		/**
		 * page ：后台模块的名称
		 * page : 连接成功后的回调
		 * fn:socket传递过来的值的回调
		  * prv：【object】 socket的配置参数。 prv={ts:'扫描枪,socket连接的提示信息,默认值为扫描枪'}
		 */
		  function SDsocket (page,fn,prv){
			  SDsocket.TIMERE && clearInterval(SDsocket.TIMERE ) ; // 清除定时器链接socket
			  var websocket =null ,psth = 'ws://'+page;
			  prv = $.extend({info:'扫描枪'},prv) ;
//            判断当前浏览器是否支持WebSocket
				if ('WebSocket' in window) {
				    websocket = new WebSocket(psth);
				}else {
				    alert('当前浏览器不支持 websocket,请更新浏览器！');
				    return ;
				}
				//连接发生错误的回调方法
				websocket.onerror = function () {
					layer.msg(prv.info+'连接发生错误！正在恢复链接，请稍等！',{offset: 'rb'}) ; 
					closeWebSocket() ;
					 SDsocket.TIMERE && clearInterval(SDsocket.TIMERE ) ; 
					 SDsocket.open = true ;
					SDsocket.TIMERE  = setInterval(function(){
						$.websocketopen = true ; // 这样写的目的仅仅是为了在链接失败后再次链接成功后增加的一个提示效果 。
						SDsocket(page,fn,prv,websocket) ;	
					},2000) ; 
//				    setMessageInnerHTML("WebSocket连接发生错误");
				};
				//连接成功建立的回调方法
				websocket.onopen = function () {
					PW.layui.use('layer',function(){
						parent.parent.layer.msg(prv.info+'连接成功！',{offset: 'rb'}) ; 
					});
//					  page && page(websocket) ;
					  SDsocket.TIMERE && clearInterval(SDsocket.TIMERE ) ; 
					  SDsocket.open &&  layer.msg(prv.info+'连接成功！',{offset: 'rb'}) ; 
					  SDsocket.open  = false ;
//				    setMessageInnerHTML("WebSocket连接成功");
				}
				//接收到消息的回调方法
				websocket.onmessage = function (event) {
					try {
						fn.call(this,JSON.parse(event.data),prv,websocket);
					} catch (e) {
						fn.call(this,event.data,prv,websocket);
					}
				}
				//连接关闭的回调方法
				websocket.onclose = function () {
					layer.msg(prv.info+'连接发生错误！正在恢复链接，请稍等！',{offset: 'rb'}) ; 
					closeWebSocket() ;
					 SDsocket.TIMERE && clearInterval(SDsocket.TIMERE ) ; 
					 SDsocket.open = true ;
					SDsocket.TIMERE  = setInterval(function(){
						$.websocketopen = true ; // 这样写的目的仅仅是为了在链接失败后再次链接成功后增加的一个提示效果 。
						SDsocket(page,fn,prv,websocket) ;	
					},2000) ; 
//				    setMessageInnerHTML("WebSocket连接关闭");
				}
				//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
				window.onbeforeunload = function () {
				    closeWebSocket();
				}
				//关闭WebSocket连接
				function closeWebSocket() {
				    websocket.close();
				}
				return  websocket ; 
		  }
		  /***
		   * 初始化socket： 因为操作都差不多，所以封装在了这里，直接调用就可以了，如果需要特殊处理
		   * 应用场景： 这个页面接受到的参数只有barcode和actualgw这两个值就可已直接调用；
		   * 掉用SDsocket方法，重新初始化 
		   * initSDsocket('mate')
		   * prv：扫描成功之后的操作，一般都是调用click , 可以是要被执行click的JQ选择器， 也可以是要被执行click,JQ对象，也可以是一个方法 。
		   */
		  
		 function  initSDsocket(mate,prv){
			  SDsocket (mate,function(data,prv){
				var $i = $('input:focus'),fn=function(){
						if(prv){
							 if($.type(prv)==='string'){
								 $(prv).click() ;
							 }else if($.type(prv)==='object'){
								 prv.click() ;
							 }else if($.type(prv)==='function'){
								 prv.call(this,data) ; 
							 }
						 }
					};
					 if($i.size() && $i.attr('type')=='text'  || ($i.size() && $i.hasClass('form-control'))){
						 var name = $i.attr('name') ; 
						 if(name == 'realweights' || name=='netweight'){
							 if( data.actualgw || data.actualgw === 0 ){
								 $i.val(data.actualgw) ;
								 fn();
							 } 
						 }else{
							 if( data.barcode || data.barcode===0 ){
								 $i.val(data.barcode) ; 
								 fn() ;
							 }  
						 }
					}
				},prv);   
		  };
 
  /**
   * 
   * 2017/05/31:add
   * 计算时间差
   * boo：{boolean}如果为true , date要计算的开始时间对象 和当前new Date()进行计算,否则相反的差
   * 如果date是number类型就是，秒数字类型，转换成我们想要的时间
   * 第三参数为数值类型 ， 1 返回格式 天，小时，分钟，秒  。  2：":" 隔开
   */
  function getCheckTime(date,boo,type){
	  var  thisTime,mms = date ,day,hh,mm,ss,re='' ;
	  if($.type(date)==='number'){
		  mms = date ; 
	  }else{
		   thisTime = new Date(),mms = (  date - thisTime)/1000 ,day,hh,mm,ss;
		  	if(boo && $.type(boo)==='boolean'){
		  		mms = ( thisTime - date)/1000; 
		  		if( isNaN(mms)  ){
		  	  		return false ;
		  	  	}
		  		}else{
		  			if( isNaN(mms)  ){
		  		  		return false ;
		  		  	}
		  		}
	  }
  		day = parseInt (  ((( mms / 60).toFixed(5)/ 60).toFixed(5) / 24).toFixed(5) ) ;
  		hh = parseInt ((mms / 60 / 60).toFixed(5) % 24) ;
  		mm = ( parseInt(mms / 60 )) % 60  ;
  		
  	    ss = parseInt( mms % 60 );
  	  if(type==1){
			    if(day)re+=Math.abs(day)+'天' ;
		  	    if(hh) re += Math.abs(hh) +'小时' ;
		  	    if(mm)re +=Math.abs( mm) + '分钟' ;
		  	    if(ss) re += Math.abs(ss) +'秒' ;
		}else if(type==2 || !type){
//			day ? re+=Math.abs(day).toO()+':' : re+='00:' ; 
			hh ? re += Math.abs(hh).toO() +':' : re +='00:' ;
			mm ?re +=Math.abs( mm).toO() + ':' :re +='00:' ; 
			ss ? re += Math.abs(ss).toO() +'' :re+='00' ;
		}
  		return {
  			day:Math.abs(day),
  			hh:Math.abs(hh),
  			mm:Math.abs(mm),
  			ss:Math.abs(ss),
  			info:re
  		}
  };

/**
 * 给输入框添加智能输入数字的事件,可以是小数点，保留3位小数点
 */		
  $(function(){
	  $('body').on('keyup','.shi-dian-inpnum',function(){
			 var $t = $(this), v = $t.val() , d = d = ($t.attr('data-inpnum')+'').tojson() ,i = v.lastIndexOf('.') ,fs='' ; // i = 最后一个小数点的坐标
			 if(d && d.fs && v[0]=='-' )fs='-' ;
			 var val = v.replace(/[^\d]/gi,function(a,b,c){//a:被匹配的值， b:坐标，c:原始字符串的值
				 var r = '' ;
				 if(a=='.' && b == i) r='.' ;
				 return r ;
			 }) ;
			 $t.val(fs+val) ;
		 });	
	  /**
	   * 绑定输入框，限制输入框输入的内容
	   * data-inpnum = "num:3,size" ; //存储的是JSON格式，num:保留的小数， 不写默认保留3位小数点 ,
	   * lt: number  |  选择器 。不能小于多少。如果是选择器就不能小于另一个选择器的值
	   * gt: number | 选择器 。 不能大于多少。 如果是选择器就不能小于另一个选择器的值 
	   * d.rI  {string}右边的提示信息。 demo：d.rI='库存数量：';当前输入框的值不能小于+d.rI+93
	   * fs:'-' ; 可以输入负数
	   * size:输入的长度，默认4位
	   * fn:执行完验证规则之后调用的方法。 
	   */
	  $('body').on('blur','.shi-dian-inpnum',function(){	
		  var $t = $(this), v = $t.val().replace(/[^(\d|\-|\.)]/gi,'') ,d = ($t.attr('data-inpnum')+'').tojson() , num = (d.num==0||d.num)?d.num:3,size=d.size||4,arr,fs='';
		  // d : 标签存储的输入配置json格式
		  if(v!='' && v!='-')v = parseFloat(v).toFixed(num) ;
		  arr = (v+'').split('.') ;
		  arr.length ==2 ? v = arr[0].substring(0,size)+'.'+arr[1] : v = arr[0].substring(0,size) ;//确定小数点
		  v==0&&!d.lt&&(v=''); 
		  d.fs && v[0]=='-' &&(fs='-');
		  if(v==''||v=='-'){
			  v='' ;  
		  }else{
			  v=fs+Math.abs(v);
		  }
		  if(d.lt && v!=''){
		  	 if($.type(d.lt)=='string'){//如果是选择器
		  	 	var n = $(d.lt).val() ;
		  	 	if(n!='' && Number(v)<Number(n)){
		  	 		layer.tips(getIBI($t)+'不能小于'+(d.rI||'')+getIBI($(d.lt)),$t) ;
		  	 		v='' ;
		  	 	}
		  	 }else{//如果是数值
		  	 	if(Number(v)<Number(d.lt)){
		  	 		layer.tips(getIBI($t)+'不能小于'+(d.rI||'')+d.lt,$t) ;
		  	 		v='' ;
		  	 	}
		  	 }
		  }
		  if(d.gt && v!=''){
		  	 if($.type(d.gt)=='string'){//如果是选择器
		  	 	var n = $(d.gt).val() ;
		  	 	if(n!='' && Number(v)>Number(n)){
		  	 		layer.tips(getIBI($t)+'不能大于'+(d.rI||'')+getIBI($(d.gt)),$t) ;
		  	 		v='' ;
		  	 	}
		  	 }else{//如果是数值
		  	 	if(Number(v)>Number(d.gt)){
		  	 		layer.tips(getIBI($t)+'不能大于'+(d.rI||'')+d.gt,$t) ;
		  	 		v='' ;
		  	 	}
		  	 }
		  }
		  $t.val(v) ;
		  $t[0].dispatchEvent(new Event('input'));
		  d.fn&&d.fn.call($t,v);
		 });	
	  
  });
  /***
   * 给标签赋值
   * setVBN = setValuesByName ;
   * $tag,要被赋值的对象，JQ选择器，或JQ对象
   * $passive JQ选择器或jq对象，可绑定easyUi，td灯文本标签，也可以是一个JSON对象
   * 应用场景,将一个页面的值，绑定到另一个页面，通过name就可绑定,或者在本页面将一个地方的值绑定到另一个地方，通过添加name就可绑定。
   * tim : boolean 类型，如果为空或没有值用什么表示， true,表示空， 字符串，字符串表示,如果不传递将不做操做
   * opt:{keyT :'name',keyP:'id',noAdd:['']} , 定义更具name获取还是更具id获取，或者更具其他属性获取值，
   * 			noAdd:[]数组类型 。 可传，可不传。如果有些值不需要赋值可添加参数noAdd['参数1','参数2']
   *     keyT ,第一个参数用到的属性值，默认为name获取， keyP第二个参数的属性值，默认也为name，如果第四个参数不写，默认两个参数都是更具name获取的
   */
   
   $.setAToB = function($tag, $passive,tim,opt) {
 	  var obj = {},keyT='name',keyP='name';
 	 	if ($.type($tag) === 'string')$tag = $($tag);
 	 	if ($.type($passive) === 'string')$passive = $($passive);
 	 	if(tim && $.type(tim) === 'boolean')tim = '' ;
 	 	if(opt && opt.keyT) keyT = opt.keyT ; 
 	 	if(opt && opt.keyP) keyP = opt.keyP ;
 	 	if($passive.size && $passive.hasClass){ // 如果是JQ对象
 	 		for (var a = 0, d; d = $passive[a]; a++) { //获取所有值
 		 	var $d = $(d), name = $d.attr(keyP), cls = $d.attr('class'), es = false;
 		 		if (cls) es = cls.match(/easyui-\w+/gi);
 		 		if (!name || name == '') name = $.trim($d.attr('textboxname'));
 		 		if (name && name != '') { //如果有name
 		 			if (cls && es) { //如果EasyUI标签
 		 			var key = es[0].replace('easyui-', ''),arr =  $d[key](key=='numberspinner'?'getValue':'getValues');
 						if(arr.length === 1){
 							obj[name] = arr[0];
 						}else{
 							obj[name] =arr.join(',') ;	
 						}
 		 			} else { //如果不是easyUI标签
 		 				$.type($d[0].value)==='string'? obj[name] = $d.val() :  obj[name] = $.trim($d.text());  
 		 			}
 		 		}
 		 	}
 	 	}else{//如果是JSON， 目前只有这两种情况
 	 		obj =  $passive  ; 
 	 	}
 	 	if(opt && opt.noAdd){
 	 		var noarr = opt.noAdd ;
 	 		for(var a = 0 , d ; d=noarr[a] ;a++){
 	 			delete obj[d] ;
 	 		}
 	 	}
 	 	for (var a = 0, d; d = $tag[a]; a++) {
 	 		var $d = $(d), name = $d.attr(keyT), cls = $d.attr('class'), es = false;
 	 		if (cls) es = cls.match(/easyui-\w+/gi);
 	 		if (!name || name == '') name = $.trim($d.attr('textboxname'));
 	 		if (name && name != '') { //如果有name
 	 			if (cls && es) { //如果被赋值EasyUI标签
 	 			var key = es[0].replace('easyui-', '');
 	 				if (obj[name]){
 	 					$d[key]('setValue', obj[name]);
 	 				}else{
 	 					tim &&  $d[key]('setValue','');  	
 	 				} 
 	 			} else { //如果不是easyUI标签
 	 				if ($.type($d[0].value)==='string') { //如果是input输入框
 	 					obj[name] ?  $d.val(obj[name]) :  tim &&   $d.val('');     
 	 				} else { //如果是文本框
 	 					obj[name] ? $d.text(obj[name]) : tim &&   $d.text(tim);    
 	 				}
 	 			}
 	 		}
 	 	}
 	 };
  /**
   * $.enterClick ： 本方法的作用是，当按下回车的时候，开始执行某一个点击操作，或执行某一个方法
   * $pv， 需要添加回车事件的选择器。 或者是JQuery对象也可以。 
   * pvc， 可以执行click操作的标签选择器，或者需要被执行的方法fn , 或者是一个方法也可以。 
   * 没做缓存处理，建议只是初始化一次
   */
  $.enterClick = function($pv,pvc){
	  if($.type($pv) === 'string')$pv = $($pv) ;
	  $pv.keyup(function(e){
		  if(e.keyCode== 13){
		     if ( $.type(pvc) == 'string' ) {
		    	 $(pvc).click() ;
		     }else if($.type(pvc) == 'function'){
		    	 pvc.call(this) ;
		     }else if($.type(pvc) == 'object'){
		    	 pvc.click() ;
		     }	  
		  }
	  }) ;
  }
  /**
   * 初始化点击查询的默认事件
   */
  $('body').on('click','.sd-search-click',function(e){
	  var $t = $(this), d = ($t.attr('data-options')+'').tojson(); //
	  	if(checkType(d)==='object'){
	  		if(d.dg && d.pre){
	  			try {
	  				var o = $.getValues(d.pre),$d=$(d.dg),KEY = ($d[0].className+'').match(/easyui-\w+/gi)[0].replace('easyui-', '');
		  			o.sdmsg='查询成功！'; 
		  		    $d[KEY]('reload',o);
		  		    delete o.sdmsg ;
		  		    d.fn&&d.fn(o);
				} catch (e) {
					d.fn&&d.fn($.getValues(d.pre));
				}
	  		}
	  	}
  });
  /**
   * 初始化点击重置的默认事件
   * 如果该元素的data存储了ts为true， 则清空成功后不提示。 
   */
  $('body').on('click','.sd-reset-click',function(e){
	  var $t = $(this), d = ($t.attr('data-options')+'').tojson(),$com=$('input[sname]'); //
	  	if(checkType(d)==='object'){
	  		if(d.pre){
	  		    $.resetInput(d.pre);
	  		    $com.length&&$com.combobox('reload') ;
	  		    !$t.data('ts') && layer.msg('已重置！');
	  		    d.fn && d.fn();
	  		}
	  	}
  });
  /**
   * 此方法主要用于开发人员用的测试传递给后台的参数是否都已传递了
   * 检测一个json是否全部包含一个数组中的key
   * obj:= {aa:223,bb:23223,cc:232}
   * arr['aa','bb','dd'] //字符串的数组
   * del:true || false ， 不传默认为false, 如果为true,删除obj中多余的数据。
   * return obj ; obj.re=没有的个数， obj.reArr； 没有的具体key
   * 
   */	
  $.checkJson=function(obj,arr,del){
	  var re = 0,reArr=[],reObj={}; 
	  for(var a = 0 , d ; d=arr[a] ; a++){
		  if(!obj[d]  && obj[d] !==0){
			  re ++ ;
			  reArr.push(d) ;
		  }
	  }
	  if(del){
		  for(var a in obj ){
			  if(arr.indexOf(a)==-1)delete obj[a] ;
		  }
	  }
	  reObj.re=re ;
	  reObj.reArr=reArr;
	  if(reObj.re !==0){
		  console.log(reArr) ;
	  }
	  return reObj ; 
  };
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
	 * 获取一个选择器或一个数组对象中包含name的测试数据
	 * @param tag
	 * tag: 选择器 | 原生js获取的对象数组
	 */
	function getTestDataByPre(tag){
		var arr = [],obj = {} ; 
		if(checkType(tag)==='string'){
			arr = document.querySelectorAll(tag) ;
		}else{
			arr = tag ;
		}
		for(var a = 0,d;d=arr[a] ;a++){
			 var n =d.getAttribute('name'); 
			if(n){
				obj[n]=getRand('MM',3,4);  
			}
		}
		return obj ; 
	}
	/**
	 * @date	2017-07-26
	 * @param  obj-->{Object} 需要替换的数据，比如：{user:'adfaf',pw:'weasdfa'}
	 * @param  tip-->{String}|{Object} 
	 * 				 {String}如果没有循环 ，tip 为字符串代表如果没有替换成功用什么代替，默认代替为'' ;
	 * 				 {Object}如果有循环，tip为Object对象具备以下属性
	 * 						 obj:'arrkey', //遍历对象的第一个数组key。 
	 * 						 obj1:'arr1key',//遍历的第二个数组的key
	 * 						 ...//依次类推，无限循环
	 * 						 tip:'遍历对象的第一个替换值'
	 * 						 tip1:'遍历对象的第二个替换值'	
	 * 						... //依次类推
	 *demo1: var a = "<span>{user}</span>" ; a.rep({user:'aaa'}) ;返回过来的是  "<span>aaa</span>"  						 
	 *demo2: 如果 tip为obj对象,就说明有for循环替换的东西
	 *demo3: 如果带有多个数组$(modH).html().rep(d,{obj:'records',obj1:'records',tip:'-',tip1:'2'});//records:数组对象的key
	 * 带有for循环的demo：$(modH).html().rep(d,{obj:'records'});//records:数组对象的key
	 	 <div id="modH">
	 	 	<div  class="mui-row tpm-do-info">
	    {{#
	        <div class="mui-card">
				<div class="mui-card-content">
					检查点：{checkContent}
				</div>
			</div>
		}}
		</div>
		</div>
	 */
	String.prototype.rep=function(obj,tip){
		var h =this ,index=0,obj2,ck=function(s,o,t){//s:string str 要替换的字符串, o:object obj 被替换的对象 ,t:tip 如果没有需要被替换的字符; 
			return s.replace(/{\w+}/gi,function(str){
				var l=o[str.replace(/{|}/gi,'')];
				 if(l===0)return '0';
	       		 return l || t || '';
			});
		};
		try{
			if(checkType(tip)==='object' && tip.obj){//如果是个json对象,说明有for循环替换的内容
			obj2 = tip.obj ;
			checkType(tip.obj)==='string' && (obj2 = obj[tip.obj]);
			h=h.replace(/\{\{#(.|\n)+?\}\}/gi,function(str){//第一步先替换for循环的内容,obj2是一个数组
				 var w = str.replace(/\{\{#|\}\}/gi,''),h2='';
				 obj2 = obj[tip['obj'+index] ||  tip.obj];
				 for(var a =0,d;d=obj2[a];a++){
				 	h2 += ck(w,d,tip[('tip'+index)]||tip['tip']) ;
				 }
				 index++;
				 return h2;
			}); 
			h = ck(h,obj,tip.tip) ;
			}else{
				h=ck(h,obj,tip);
			}
		}catch(e){
			throw new Error('字符串正则替换出错了');
			return '';
		}
	    return h;
	};
    /**
     * datapre:'header>table input',dgpre:'#dg' 转换结果为 = {datapre:'header>table input',dgpre:'#dg'}的一个对象
     * 将字符串转换为json， 引用场景， 
     *           比如某个标签的属性为  <input  data-opt="datapre:'header>table input',dgpre:'#dg'"/>
     *           如果将data-opt的字符串转换为json对象 ==》
     *           							    $('input').attr('data-opt').tojson()  结果为    ={datapre:'header>table input',dgpre:'#dg'}
     * 如果解析失败将返回自己本身。
     * @date    2017-10-29  
     */	
	String.prototype.tojson = function(){
		var str = {},d=this;
		if(d=='undefined'){return{}};
		try{
			str = eval("({"+d+"})");			
		} catch(e){
			throw new Error('字符串转换为json格式错误,请检查引号是否正确或格式是否为json格式');
			str = {} ; 
		}
		return str ;
	}
	/**
	 * @date	2017-09-14
	 * @param  
	 * @param	 
	 * 此方法和rep相反 ， 是将字符串中的{name}格式转换为一个json.
	 * demo  var a = '<span name="vender" class="mui-ellipsis">{vender}</span> ' ; 返回结果： {vender:''}
	 *  num :代表获取的是假数据的
	 */
	String.prototype.getRep=function(num){
		var obj = {},arr=this.match(/{\w+}/gi);
		for(var a = 0,d;d=arr[a] ;a++){
			obj[d.replace(/{|}/gi,'')]=num?getRand('MM',num,num):'';
		}
		return obj ; 
	};
	
	/**
	 * 判断是否需要添加no-click这个Class,这个方法在datagrid中inint初始化中用到了
	 * @param {Object} el   datagrid的原生html对象
	 * @param {Object} obj 数组，[{m:3||'3-8',o:'选择器'}] ；
	 * @ date 2017 11 11 
	 * obj.ck  {function}: 每一个选中的时候需要二次判断的回调。
	 */
	function checkButon(el,obj){
		var KEY = (el.className+'').match(/easyui-\w+/gi)[0].replace('easyui-', '') ;
			if(!obj)obj = $(el)[KEY]('options').s ;
		    if($.type(obj)==='array'){
		    	var le= $(el)[KEY]('getSelections').length,fn=function(d,add){
		    		if(add){
		    			$.type(d.o)==='string' ? $(d.o).addClass('no-click') :d.o.addClass('no-click');
		    		}else{
		    			$.type(d.o)==='string' ? $(d.o).removeClass('no-click') :d.o.removeClass('no-click');
		    		}
		    	} ;
		    	for(var a =0,d;d=obj[a] ;a++){
		    		var str = false ;
		    		if($.type(d.m)==='number'){//如果是数字类型
		    			d.m!=le && (str = true) ;
		    		}else{//如果不是数字就只能是字符串了,并且必须是以“-”分割的
		    			var i = parseInt(d.m.split('-')[0]),k=parseInt(d.m.split('-')[1]);
		    			!(le>=i && le<=k)&&(str=true);
		    		}
		    		fn(d,str) ;
		    		d.ck&&d.ck($(el)[KEY]('getSelections'),d) ;
		    	}
		    }
	};
	/**
 * 需要初始化用的页面. 比如开启选项卡.用的不多，但是又是通用的代码又不多，所以写在tool.js里边。 
 * @param {Object} str
 *  PC专用 。
 *  
 */
function initPage(obj){
	switch (obj.type){
		case 'tab'://初始化页签切换
			(function(){
				var $tabs = obj.con?obj.con:$('#con>div>div'),str=location.href.replace(/\/\//gi,''),h,$h;
			        str=str.substring(str.indexOf('/')).replace(/\/+/gi,'');
			        str=='home'&&(str='homeindex');
			        h=(LL[str]+'')!='undefined'?LL[str]:0,$h;
			        (obj.tit?obj.tit:$('#tit li')).click(function(){
				        var $t=$(this),i = $t.index(),$div=$tabs.eq(i),$ifr;
				        i===0? $('body>header').hide():$('body>header').show() ;
				        $t.addClass('select').siblings().removeClass('select');
				        $div.css('z-index','999').addClass('show').siblings().css('z-index','-1').removeClass('show');
				        if(!(obj.tab&&obj.tab.noResh)){
				        	WN.refreshDg&&WN.refreshDg();
				        	for(var a =0,d,w,arr=$div.find('iframe[src]');d=arr[a];a++){
					        	d.contentWindow.refreshDg&&d.contentWindow.refreshDg();
					        }
				        }
				        $ifr = $div.find('>iframe');
				        $ifr.size() && !$ifr.attr('src') && $ifr.attr('src',$ifr.attr('data-src'));
				        LL[str]=i;//增加记忆功能：方便刷新的时候还是在上一次的位置。
				        obj.tab&&obj.tab.fn&&obj.tab.fn.call($t);
				 });
				$h=obj.tit?obj.tit.eq(h):$('#tit li:eq('+h+')'); 
				$h.length?$h.click():(obj.tit?obj.tit:$('#tit li:eq(0)')).click();
			})();
			break;
		case 'upload' :// 初始化加载layui上传中的upload。 建议在 layui.upload加载完成后再调用。
				if(!$('#loadUpload').size()){
					$('body').append('<div id="loadUpload" lay-showpercent="true"   lay-filter="pdf"  class="layui-progress layui-hide layui-progress-big">'+
											'<div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div>'+
				  					'</div>');
					$('body').append('<style>.layui-progress.layui-progress-big{position:absolute;width:25%;top:62px;left:0;right:0;bottom:0;margin:auto;z-index:9999999999;}</style>');
					layui.element.render();
				}
				layui.upload.config={
							before: function(obj){ //初始化上传信息。
						 		$('#loadUpload').removeClass('layui-hide');
						 	    layer.load(3); //上传loading
						 	  },
						    progress: function(i){//上传进度回调 value进度值
						    	layui.element.progress('pdf', i+'%')//设置页面进度条
						 	},error:function(d){
						 		initPage.end();
						 		$.SDal({title:'上传失败',info:d.fail});
						 	},
						};
				initPage.end=function(){
					 $('#loadUpload').addClass('layui-hide');
					 layui.element.progress('pdf', '0%')//设置页面进度条
				     layer.closeAll('loading'); //关闭加载层
				}
			break ;
		case 'by'://加载标语。 主要是在看板中用到了 。
			 (function(){
				 	var $am = $('#animatePolice') ,footerW = $('.call-the-police').outerWidth(),arr=[],index=0,timer,$ca= $('#callthepolice');//$ca:报警标签
				 	if(!window.move)return ;
				 	function anima (){
				 		var o =arr[index],p,Q; 
				 		if(o){
				 			$('#animatePolice').css('transform','translateX('+footerW+'px)') ;
				 			$('#animatePolice').text(o.content).css('color',getColor(o.colour));
				 			 Q = move('#animatePolice').ease('in-out').x(-($('#animatePolice').outerWidth()+3));
				 			 Q.duration(25000);
				 			 Q.end() ;
				 			index ++ ; 
				 		}else{
				 				ld();
				 		}
				 	};
				 	// 获取标语，并开始
				 	function ld(){
				 		timer && clearTimeout(timer);
				 		index = 0;
				 		function LDS(d){
				 			arr = d.rows || [] ;
				 			!arr.length && (arr=[{content:'安全生产,责任重大'}]) ;
				 			!WN.ANIMABIAOYU&&(index=parseInt(getRound(0,arr.length-1)));//页面每次刷新后看到的第一条标语都不一样。 
				 			anima();
				 			timer=setInterval(anima,26000);
				 		}
				 		if(obj.dataFn){
				 			LDS(obj.dataFn()); 
				 		}else{
//				 			$.sendAjax.send('/slogin/selectSloginsetAll.do',{status:'启用',page:1,rows:999},function(d){
//					 			LDS(d); 
//					 		},1);	
				 		}
				 	};
				 	// 获取颜色
				 	function getColor(str){
				 		var o = (str+'').match(/红|白|黄|绿/gi);
				 		return ['red','#fff','yellow','green'][['红','白','黄','绿'].indexOf(o?o[0]:'黄')] ;
				 	};
				 	ld();
				 	!$('#main').length&&$('#animatePolice').parent().css('position','relative');
				 })();	
			 break ;
		case 'pullmap'://加载图形化页面使用
			(function(){
				/**
				 * 支持IE9及以上
				 * @param {Object} wrap 图片要存放的容器的选择器。 
				 * @param {Object} pre  图片的选择器 || 或图片对象。图片的地址为data-src
				 * fn:执行成功后的回调 。
				 */
				function setImgWidth(wrap,pre,fn){//设置图片等比例缩放。
						var H = $(wrap).height(),W=$(wrap).width(); 
						function setSize(){//原理： 最大的要放到最小的里边去。
							var d=this,si,w,h,o = {
									h:d.naturalHeight ,
									w:d.naturalWidth ,
							};
							o[d.naturalHeight] = 'h' ; 
							o[d.naturalWidth] = 'w' ;
							si=Number(Math.min((W/o.w),H/o.h).toFixed(3));
							w=Number((o.w*si).toFixed(3));
							h=Number((o.h*si).toFixed(3));
							$(d).attr('width',w+'px').attr('height',h+'px');
							fn&&fn(wrap,w,h); 
						};
						for(var a = 0,d,arr=$.type(pre)==='string'?$(pre):pre;d=arr[a];a++){
							$(d).attr('src',$(d).attr('data-src')).load(setSize);
						}
				}
				initPage({type:'time'});
					for(var a = 0,d,arr=$('div[data-no]');d=arr[a];a++){
						var n=d.getAttribute('data-no') ;
						if($(d).parent().hasClass('mate'))break; //如果是物料则不执行 
						$(d).append('<span data-after="'+n+'"></span><b>'+n+'</b>')
					}
					function resiW(){
						for(var a = 1;a<5;a++){
							setImgWidth('#line'+a,'#img'+a,function(wrap,w,h){
//								var $d = $(wrap);
//									$d.find('>div').css({width:w,height:h});
//									css('margin-top',($d.height()-h>6?($d.height()-h)/2:0)+'px')
							});			
						}
					}
					onresize=resiW ;
					resiW() ;
					if(!~PW.location.href.indexOf('localhost')){
						document.oncontextmenu=new Function("event.returnValue=false;");
						document.onselectstart=new Function("event.returnValue=false;");	
					}
				})();
			break ;
		case 'time' ://加载时间    obj.time.pre: 要赋值显示时间的选择器。
			if(!PW.SDINTSYSTEMTIME){
				function ld(){
					$.sendAjax.send('/users/getTime.do',1,function(d){
						d.time = d.time.replace('-','/') ;
						PW.TIMEINFO=d.time ; 
						PW.TIMEINFOTEXT =d.time ;
						$(obj.time&&obj.time.pre?obj.time.pre:'#timer').text(d.time);
					},1);	
				}
				PW.SDINTSYSTEMTIME = true;
				setInterval(function(){
					PW.TIMEINFOTEXT = new Date(PW.TIMEINFO).format() ;
					PW.TIMEINFO  =new Date( new Date(PW.TIMEINFO)/1+1000);
					$(obj.time&&obj.time.pre?obj.time.pre:'#timer').text(PW.TIMEINFOTEXT);
				  },1000) ;
				setInterval(ld,1000*60);
				ld();
			}else{
				setInterval(function(){
					$(obj.time&&obj.time.pre?obj.time.pre:'#timer').text(PW.TIMEINFOTEXT);	
				},1000);
			}
			break ;
		default:
			break;
	}
};
initPage.end = $.noop;
/**
 * 全屏,
 * pre : 全屏查看的点击事件的选择器。
 */
function fullScreen(pre){
	     var viewFullScreen = document.querySelector(pre),full=false;
	     if (viewFullScreen) {
	         viewFullScreen.addEventListener("click", function () {
	         	if(!full){
	         		var docElm = document.documentElement;
	                 if (docElm.requestFullscreen) {
	                     docElm.requestFullscreen();
	                     full=true ;
	                 }else if (docElm.msRequestFullscreen) {
	                     docElm = document.body; //overwrite the element (for IE)
	                     docElm.msRequestFullscreen();
	                     full=true ;
	                 }else if (docElm.mozRequestFullScreen) {
	                     docElm.mozRequestFullScreen();
	                     full=true ;
	                 }else if (docElm.webkitRequestFullScreen) {
	                     docElm.webkitRequestFullScreen();
	                     full=true ;
	                 }        		
	         	}else{
	         		if (document.exitFullscreen) {
	                     document.exitFullscreen();
	                     full = false ;
	                 }else if (document.msExitFullscreen) {
	                     document.msExitFullscreen();
	                     full = false ;
	                 }else if (document.mozCancelFullScreen) {
	                     document.mozCancelFullScreen();
	                     full = false ;
	                 }else if (document.webkitCancelFullScreen) {
	                     document.webkitCancelFullScreen();
	                     full = false ;
	                 }
	         	}
	         }, false);
	     }
};
// **********************    Begin 本系统专用不是特别的通用  ***************************************
WN.layui&&layui.use(['layer'],function(){//初始化添加关闭就刷新数据
	layui.layer.config({
		cancel:function(){
			var ifr = PW.$('div.center-boty-ifreame>iframe.on,div.center-boty-ifreame>.center-boty.on'),$$,pw;  
			if(ifr.size()){
				pw=ifr[0].contentWindow||PW;
				$$=pw.$;
				pw.refreshDg&&pw.refreshDg();
				if($$('#tit,.sdint-tab-tit').size()){//如果有页签
					ifr = $$('#con>div>div.show>iframe,.sdint-tab-con>div>div.show>iframe');
					  if(ifr.size()){
						  pw = ifr[0].contentWindow; 
						  pw.refreshDg&&pw.refreshDg(); 
					  }
				}
			}
		}
	});
});
$(function(){
// ***************** Begin  初始化加载结合layui加载的layui日期输入框 *****************************
	// 如果是日期输入框请添加class  layui-time , 如果有什么配置请添加属性data-options="min:-1" ;//里边是json格式。 默认是日期格式都可以选择的，如果有不同请重新配置  
	if($('.layui-time').size()){
		layui.use(['laydate'], function(){
			var laydate = layui.laydate , arr = $('.layui-time');
			layui.laydate.config.done=function(val,date, endDate){//修改初始化选中事件
				var t = this,lt=t.lt,gt=t.gt,dv;// dv:另一个元素的value值
				if($.type(lt)==='string'){//如果有传递lt，并且lt是选择器 。 lt只能小于某一个值
					dv = $(lt).val().trim();
					if(dv!='' && new Date(val) > new Date(dv)){
						layer.tips( getIBI($(t.elem[0]))+'的值不能大于'+getIBI($(lt))+'请重新选择',t.elem[0]);
						setTimeout(function(){t.elem[0].value=''},400);
					}
				}
				if($.type(gt)==='string'){//如果有传递gt，并且gt是选择器。 gt只能大于某一个值
					dv = $(gt).val().trim();
					if(dv!='' && new Date(val) < new Date(dv)){
						layer.tips( getIBI($(t.elem[0]))+'的值不能小于'+getIBI($(gt))+'请重新选择',t.elem[0]);
						setTimeout(function(){t.elem[0].value=''},400);
					}
				}
			};
			    for(var a = 0,o,d;d=arr[a] ;a++){
			    	 o = {
						  	type:'date',
						    elem: d, //指定元素
						    calendar:true
						 };
			    	 $.extend(o,($(d).attr('data-options')+'').tojson()) ;
			    	 laydate.render(o);	
			    }
		});
	};
	// ***************** 初始化加载结合layui加载的layui日期输入框    End*****************************	
	// ***************** Begin 初始化加载结合layui加载  点击弹出框  *****************************		
	if($('.sd-layui-open').size()){
		$('body').on('click','.sd-layui-open',function(){
			var $t = $(this),o=($t.attr('data-options')+'').tojson(),obj={
				type: 1,
				title: [$t.attr('title'),'text-align:center;font-size:2em;color:#000;'],
				area : [600,600],
				shadeClose: true, //点击遮罩关闭层
				content: ($.type(o.con)==='string'&&o.type!=2)?$(o.con):o.con,
			};
			if(o.con){
				delete o.title ;
				$.extend(obj,o);
				$.type(o.clearPre !=='boolean') &&o.type!=2&& (o.clearPre = o.clearPre || obj.content.find('input'));
				o.clearPre &&$.resetInput(o.clearPre,true);
				layer.open(obj);	
			}else{
				throw new Error('打开dialog错误，请检查key[con],是否配置正确');
			}
		})
	};
	// ***************** 初始化加载结合layui加载  点击弹出框  End*****************************	
	(function(){
		//如果有数值输入框，并且是工位PC
		if($('input.shi-dian-inpnum').size()&&~PW.location.href.indexOf('/pull/pcindex')){
			  var sc = document.createElement('script');
			      sc.type='text/javascript';
			      sc.src="/js/numkeyboard.js" ;
			      document.body.appendChild(sc);
			      sc.onload=sc.onreadystatechange=function(){
			    	  $('input.shi-dian-inpnum').numkeyboard({
			    			keyboardRadix:450,//键盘大小基数
			    			mainbackground:'#337ab7', //主背景色
			    			menubackground:'#66a2d6', //头背景色
			    			exitbackground:'#66a2d9', //关闭按钮背景色
			    			buttonbackground:'#66a2d6', //键盘背景色
			    			clickeve:true//是否绑定元素click事件
			    		});
			      }
		}
	})();
	/**********   Begin 去掉加载中     ****************/
	 $('#bodyLoading,#loadCss').remove();
	 parent.$('iframe[src="/'+location.href.split(/\//gi).slice(3).join('/')+'"]').parent().find('>div.sdint-body-load').remove();
	 $('#loading-center-absolute').fadeOut(300,'',function(){$('#loading-center-absolute').remove() ; });
	/**********   去掉加载中     End  ****************/
});
//主要是在报表中查看用到了
/**
 * type==='h' ,打开横向布局的报表
 * type==='z',打开纵向布局的报表
 * shadeClose = true ,不允许点击遮罩层关闭。 默认允许的 。
 * title:标题,默认为空
 */
function go(type,url,shadeClose,title){
	var $$=PW.$ ;
	if($$('#showreportstyle').size()){
//		span.layui-layer-setwin
//		$$('#showreportstyle').text('div.layui-layer.layui-layer-iframe{background:transparent;box-shadow:none;}'+(!shadeClose?'span.layui-layer-setwin{display:none}':''));
	}else{
//		var $s=$$('<style id="showreportstyle">'+(!shadeClose?'span.layui-layer-setwin{display:none}':'')+'div.layui-layer.layui-layer-iframe{background:transparent;box-shadow:none;}</style>');
//		$$('head').append($s);
	}
	PW.layer.open({
		type: 2,
		area :$.type(type)==='array'?type:[type==='h'?'297mm':'210mm', type==='h'?'209mm':'100%'],
		title:title||'',
		shadeClose: !shadeClose?true:false, //点击遮罩关闭层
		content:url,
		anim:10,
		success:function(t,a,b,c){
			$(t).css({background:'transparent','box-shadow':'none'});
		}
		});
};
/**
 * 针对datagrid经常对一些超链接，绑定一些事件，这里做了个封装,快速使用
 * @param pre   添加点击事件的元素，不写默认  a.dg-a-blue  
 * @param fn  点击事件要执行的方法
 * @param dgpre : datagrid    的选择器， 不写默认   dg
 * 如果fn返回的是一个json，就说明在这里添加提示框，并且发送ajax。pre选择器 可添加  data-db=""配置
 * 			demo: function fmr(r,v,i){
					var s = "title:'隔离入库',info:'隔离入库确认'";
				 return	'<button data-index="' +i + '" data-db="'+s+'" data-id="' + v.id + '" class="layui-btn rk layui-btn-danger">隔离入库</button>';
				}
				DB(function(obj){
					return {url:'/isolationStock/inStock.do',data:obj};
				},'button.rk'); 
 * 
 */
function DB(fn,pre,dgpre){
	pre = pre || 'a[class="dg-a-blue"]';
	dgpre = dgpre || '#dg';
	$('body').on('click',pre,function(){//
		var obj = $(dgpre).datagrid('getData').rows[$(this).attr('data-index')],re,dd=($(this).attr('data-db')+'').tojson();
		if(fn){
			re =fn.call(this,obj);
			if($.type(re)==='object'){//如果返回的是对象，说明是这里发送ajax
				$.SDcon({title:re.title||dd.title,info:re.info||dd.info,fn:function(){
					if(re.url){
						$.sendAjax.send(re.url,re.data,function(d){
							if(d.success){
								layer.msg(re.title||dd.title,{icon:1});
								 $('.datagrid-i-refresh').click();
							}else{
								$.SDal({title:(re.title||dd.title)+'失败',info:d.fail});
							}
						});
					}else{
						console.wran('缺少url');
					}
				}});
			}
		}
	});
}
if(LL.sdintuname=='SD-KB001'&&!~PW.location.href.indexOf('/production/kanbanlocat')){
	PW.location.href='/production/kanbanlocat';
}else if((LL.sdintuname+'').substring(0,5)=='SD-PC'&&!~PW.location.href.indexOf('/pull/pcindex')){
	PW.location.href='/pull/pcindex';
}
//**********************    禁止图片拖动***************************************
$('body').attr('ondragstart','return false');
//**********************    本系统专用不是特别的通用   End***************************************