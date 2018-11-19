import  item from  "./sync.css" ;
import  help from  '../common';

const  syncs = ()=>{
    // setTimeout(function(){


    //     document.querySelector('#app').innerHTML=`<h1 class="${item.test}"> 我的第一个单页应用 好开心啊</h1>` ;

    // },2000);
    // /node_modules/element-ui/lib/theme-chalk/index.css
    console.log('sync.js-->',help.version) ;
    fetch('/api/test').then(response=>response.json()).then(data=>{console.log(data)})
        .catch(err=>{
            console.log('访问地址错误啦') ;
            //  发短信
            // navigator.sendBeacon('www.aaa.com/a.gif?aa=');
        })
}
const isArray = args=>{
    console.log('yaoxinglin789897879789879798798') ;
}
export {
    syncs,
    isArray
}