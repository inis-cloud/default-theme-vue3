!function(){
// +----------------------------------------------------------------------
// | INIS [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 http://inis.cc All rights reserved.
// +----------------------------------------------------------------------
// | Author: racns <email: racns@qq.com> <url: https://inis.cn>
// +----------------------------------------------------------------------
// | 作用：助手函数 - 完整版支持链式操作
// +----------------------------------------------------------------------
// | 动态背景：旋转特效
// +----------------------------------------------------------------------
class inisHelper{
    
    /**
     * @name 是否为NULL
     * @param {string} value 字符串
     * @return {boolean} result
     */
    isNull(value = "")
    {
        let result = false;
        
        if (value == null || typeof(value) == 'undefined' || value === undefined || value.length === 0) result = true;
        else result = false;
        
        return result;
    }
    
    /**
     * @name 判断是否为空 (包括空字符串、空格、null,{})
     * @param {string} string 字符串
     * @return {boolean} result
     */
    isEmpty(string = "")
    {
        let result = false;
        
        if (Array.isArray(string)){
            
            if (Array.prototype.isPrototypeOf(string) && string.length === 0) result = true;
            
        } else if (!this.isNull(string)) {
            
            if (string instanceof Object) {
                
                if (JSON.stringify(string) == "{}") result = true
                
            } else if ((string + '').replace(/(^\s*)|(\s*$)/g, '').length === 0) result = true;
            
        } else result = true;
        
        return result;
    }
    
    /**
     *
     * @name   静态资源按需批量引入
     * @param  {String | Array | Array.Object} url [需要导入的连接或自定义配置]
     * @param  {String} type [导入链接的标签]
     * @param  {String} tag [需要导入的位置head或body]
     * @return {Boolean}
     */
    setLinks(url, type = 'script', tag)
    {
        let script = () => {        // 导入JS
            
            tag = (this.isEmpty(tag)) ? 'body' : tag
            let script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('src',url);
            document.getElementsByTagName(tag)[0].appendChild(script);
            
        }, link = () => {           // 导入CSS
            
            tag = (this.isEmpty(tag)) ? 'head' : tag
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', url);
            document.getElementsByTagName(tag)[0].appendChild(link);
            
        }, customize = (obj) => {   // 导入自定义链接
            
            tag         = (this.isEmpty(tag)) ? 'body' : tag
            let config  = (!this.isEmpty(obj.config) ? obj.config : {type,tag})
            config.tag  = (this.isEmpty(config.tag)) ? tag : config.tag
            let element = document.createElement(config.type)
            
            if (!this.isEmpty(obj)) for (let i in obj) {
                if (i != 'config') element.setAttribute(i,obj[i]);
            }
            document.getElementsByTagName(config.tag)[0].appendChild(element);
            
        }, result = true
        
        if (Array.isArray(url)) {
            
            url.forEach(item=>{
                this.setLinks(item, type, tag)
            })
            
        } else if (typeof(url) == "object") {
            customize(url)
        } else if (typeof(url) == "string") {
            
            if (type == 'script') script()
            else link()
        }
        
        return result
    }
}

const helper = new inisHelper


helper.setLinks([{
  config:{type:'canvas',tag:'body'},
  style:'position: fixed;top: 0;left: 0; width: 100%; height: 100% ;z-index: -1;background: #fff;',
  id:'bg_canvas'
},{
  config:{type:'canvas',tag:'body'},
  style:'position: fixed;top: 0;left: 0; width: 100%; height: 100% ;z-index: -1;',
  id:'c'
}])

let canvas=document.getElementById("c");let ctx=canvas.getContext("2d");let w=canvas.width=window.innerWidth;let h=canvas.height=window.innerHeight;const{sin,cos,PI,sqrt}=Math;const PI2=PI*2;const SCALE=1;const radius=x=>Math.pow(x,3);const NUM=15;let t=1;let t2=0;let amount=1;function loop(){ctx.clearRect(0,0,w,h);ctx.translate(w/2,h/2);for(let r=0;SCALE*radius(r)<(w+h)/2;r++){let rad=SCALE*radius(r+t+t2);for(let i=0;i<NUM;i++){let a=PI2*(i+t)/NUM;let x=rad*cos(a);let y=rad*sin(a);ctx.beginPath();ctx.arc(x,y,0.2*(r+t+t2)*(r+t+t2),0,PI2);ctx.fill()}rad=SCALE*radius(r+t+t2+0.5);for(let i=0.5;i<NUM;i++){let a=PI2*(i-t)/NUM;let x=rad*cos(a);let y=rad*sin(a);ctx.beginPath();ctx.arc(x,y,0.2*(r+t+t2+0.5)*(r+t+t2+0.5),0,PI2);ctx.fill()}}t-=0.01*amount;if(t<=0)t+=1;ctx.translate(-w/2,-h/2);requestAnimationFrame(loop)}ctx.fillStyle="#595";loop();function background(){let canvas=document.getElementById("bg_canvas");let ctx=canvas.getContext("2d");let w=canvas.width=window.innerWidth;let h=canvas.height=window.innerHeight;ctx.fillStyle="#eee";ctx.fillRect(0,0,w,h);ctx.strokeStyle="#8c8";function loop(){ctx.clearRect(0,0,w,h);ctx.translate(w/2,h/2);for(let i=0;i<NUM*2;i++){ctx.beginPath();ctx.moveTo(0,0);for(let r=0;SCALE*radius(r)<(w+h)/2;r+=0.1){let rad=SCALE*radius(r+t2);let a=PI2*(i+(i<NUM?r:-r))/NUM;let x=rad*cos(a);let y=rad*sin(a);ctx.lineTo(x,y)}ctx.stroke()}t2=(t2+0.004*amount)%1;ctx.translate(-w/2,-h/2);requestAnimationFrame(loop)}loop()}background();window.onclick=function(e){amount=amount==0?1:0}
}()