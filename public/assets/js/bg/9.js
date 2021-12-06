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
// | 动态背景：蓝色气泡
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
  style:'top: 0;left: 0;position: fixed;width: 100%;height: 100%;z-index: -1;background: linear-gradient(to top, #c8e8f8, #2595f2);',
  id:'bg_canvas'
}])

// Canvas Init
let c = document.getElementById('bg_canvas'),
  ctx = c.getContext('2d'),
  width = window.innerWidth,
  height = window.innerHeight,
  particles = 60,
  minRadius = 5,
  maxRadius = 20,
  speed = 0.01,
  x = width / particles;

// Bubbles
let Bubbles = [];

for (let i = 0; i < particles; i++) {
  Bubbles.push({
    x: i * x,
    y: height * Math.random(),
    r: minRadius + Math.random() * (maxRadius - minRadius),
    speed: 10 * Math.random()
  });
}

function bubble() {

  c.width = width;
  c.height = height;
  for (i = 0; i < Bubbles.length; i++) {
    let b = Bubbles[i];
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
    
    b.alpha = .5 * (b.y / height);
    b.speed += speed;
    
    ctx.strokeStyle = "rgba(255, 255, 255, .5)";
    ctx.stroke();
    ctx.fillStyle = "hsla(203, 75%, 69%," + b.alpha + ")";
    ctx.fill();
    b.y -= b.speed;
    if (b.y < 0) {
      b.y = height;
      b.speed = Math.random() * 5;
    }
  }
}

// Draw
function draw() {
  bubble();
  window.requestAnimationFrame(draw);
}

// Resize Canvas
function resizeCanvas() {
  width = window.innerWidth,
  height = window.innerHeight;
  c.width = width;
  c.height = height;
  draw();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);

}()