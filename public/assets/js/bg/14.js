!function(window,document,undefined){
// +----------------------------------------------------------------------
// | INIS [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 http://inis.cc All rights reserved.
// +----------------------------------------------------------------------
// | Author: racns <email: racns@qq.com> <url: https://inis.cn>
// +----------------------------------------------------------------------
// | 作用：助手函数 - 完整版支持链式操作
// +----------------------------------------------------------------------
// | 动态背景：旋转星空
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
  style:'width:100%;height:100%;position:fixed;top:0;left:0;z-index:-1;pointer-events: none;',
  id:'canvas'
}])

    window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60)
    }})();

    var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),w=canvas.width=window.innerWidth,h=canvas.height=window.innerHeight,hue=217,stars=[],count=0,maxStars=600;var canvas2=document.createElement("canvas"),ctx2=canvas2.getContext("2d");canvas2.width=100;canvas2.height=100;var half=canvas2.width/2,gradient2=ctx2.createRadialGradient(half,half,0,half,half,half);gradient2.addColorStop(0.025,"#fff");gradient2.addColorStop(0.1,"hsl("+hue+",61%,33%)");gradient2.addColorStop(0.25,"hsl("+hue+",64%,6%)");gradient2.addColorStop(1,"transparent");ctx2.fillStyle=gradient2;ctx2.beginPath();ctx2.arc(half,half,half,0,Math.PI*2);ctx2.fill();function random(min,max)
{
    if(arguments.length<2){max=min;min=0
    }

    if(min>max)
    {
        var hold=max;max=min;min=hold
    }

    return Math.floor(Math.random()*(max-min+1))+min
}

    function maxOrbit(x,y)
    {
        var max=Math.max(x,y),diameter=Math.round(Math.sqrt(max*max+max*max));return diameter/2
    }

    var Star=function()
    {
        this.orbitRadius=random(maxOrbit(w,h));this.radius=random(90,this.orbitRadius)/12;this.orbitX=w/2;this.orbitY=h/2;this.timePassed=random(0,maxStars);this.speed=random(this.orbitRadius)/180000;this.alpha=random(2,10)/10;count++;stars[count]=this
    };

    Star.prototype.draw=function()
    {
        var x=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,y=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY,twinkle=random(10);if(twinkle===1&&this.alpha>0){this.alpha-=0.05
    }

    else
    {
        if(twinkle===2&&this.alpha<1){this.alpha+=0.05
        }}

        ctx.globalAlpha=this.alpha;ctx.drawImage(canvas2,x-this.radius/ 2, y - this.radius /2,this.radius,this.radius);this.timePassed+=this.speed
    };

    for(var i=0;i<maxStars;i++)
    {
        new Star()
    }

    function animation()
    {
        ctx.globalCompositeOperation="source-over";ctx.globalAlpha=0.8;ctx.fillStyle="hsla("+hue+",64%,6%,1)";ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation="lighter";for(var i=1,l=stars.length;i<l;i++){stars[i].draw()
    }

        window.requestAnimationFrame(animation)
    }

    animation()
    
}(window,document)