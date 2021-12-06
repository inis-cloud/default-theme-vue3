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
// | 动态背景：黑客帝国
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
      style:'width:100%;height:100%;position:fixed;top:0;left:0;z-index:-1;background-color:#000;',
      id:'cvs'
    }])
    
    let cvs = document.getElementById("cvs"); 
    let ctx = cvs.getContext("2d");
    let cw = cvs.width = document.body.clientWidth;
    let ch = cvs.height = document.body.clientHeight; 
    //动画绘制对象
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    let codeRainArr = []; //代码雨数组
    let cols = parseInt(cw/14); //代码雨列数
    let step = 16 ;    //步长，每一列内部数字之间的上下间隔
    ctx.font = " 14px microsoft yahei"; //声明字体，个人喜欢微软雅黑
    //创建代码雨
    function createCodeRain() {
        for (let n = 0; n < cols; n++) {
            let col = []; 
            //基础位置，为了列与列之间产生错位
            let basePos = parseInt(Math.random()*300);
            //随机速度 3~13之间
            let speed = parseInt(Math.random()*10)+3;
            //每组的x轴位置随机产生
            let colx = parseInt(Math.random()*cw)
            for (let i = 0; i < parseInt(ch/step)/2; i++) {
                let code = {
                    x : colx, 
                    y : -(step*i)-basePos, 
                    speed : speed, 
                    text : parseInt(Math.random()*10)%2 == 0 ? 0 : 1  //随机生成0或者1
    //                          text : ["a","b","c","d","e","f","g","h","o","s","x"][parseInt(Math.random()*11)] //随机生成字母数组中的一个
                }
                col.push(code);  
            }
            codeRainArr.push(col);
        }
    }
    //代码雨下起来
    function codeRaining(){
        //把画布擦干净
        ctx.clearRect(0,0,cw,ch);
        for (let n = 0; n < codeRainArr.length; n++) {
            //取出列
            col = codeRainArr[n];
            //遍历列，画出该列的代码
            for (let i = 0; i < col.length; i++) {
                let code = col[i]; 
                if(code.y > ch){ 
                    //如果超出下边界则重置到顶部
                    code.y = 0;
                }else{
                    //匀速降落
                    code.y += code.speed;
                }
                //颜色也随机变化
                ctx.fillStyle = "hsl("+(parseInt(Math.random()*359)+1)+",30%,"+(50-i*2)+"%)"; 
                //把代码画出来
                ctx.fillText(code.text,code.x,code.y);
            }
        }
        requestAnimationFrame(codeRaining);
    }
    //创建代码雨
    createCodeRain();
    //开始下雨吧 GO>>
    requestAnimationFrame(codeRaining);
}()