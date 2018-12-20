import { __exportStar } from "tslib";

class AjaxFetch{
	constructor(opts, params){
		const isUrl = typeof opts === 'string';
		this.defaults = {
			method:'POST',
			headers:{},
			data:{},
			credentials:'include', //默认不带cookie，指定inlude，始终携带cookie
			cache:'default',
			// mode:''//请求时会自动识别是否跨域，不需要手动设置
		};
		this.options = Object.assign(this.defaults, (isUrl ? params : opts) || {});
		this.methods = ['GET','PUT','PATCH','DELETE','POST'];
		this.url = isUrl ? opts : this.options.url;
		this.init();
		return isUrl ? this : this[this.options.method.toLowerCase()](this.options.data)
	}
	init(){
		this.methods.forEach(method=>{
			this[method.toLowerCase()] = data => {
				 if('GET' == method){
				 	this.url += (this.url.includes('?')?'&':'?' + this.transformData(data))
				 }else{
				 	if(data instanceof FormData){
				 		this.options.headers['Content-Type'] = 'multipart/form-data;';
				 		this.options.body = this.transformData(data);
				 	}else{
				 		this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 				 		this.options.body = JSON.stringify(data);
				 		this.options.body = this.transformData(data);
				 	}
				 }
				 delete this.options.data;
				 this.options.method = method;
				return fetch(this.url, this.options);
			}
		})
	}
	transformData(obj){
		// 这里还需要做更多的处理
		if(obj instanceof FormData) return obj;
		var params = [];
		for(var i in obj){
			params.push(`${i}=${obj[i]}`);
		}
		return params.join('&');
	}
}
function http(opt, pms){
	if(!opt){
        console.error('ajax未传递url');
        return;
    } 
	return new AjaxFetch(opt, pms);
}

export {
    http
}