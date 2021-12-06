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
// | 动态背景：气泡背景
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
  config:{type:'div',tag:'body'},
  style:'width:100%;height:100%;position:fixed;top:0;left:0;z-index:-1;background-color:#000;',
  id:'bubble'
}])

  class BGBubble {
    constructor(opts) {
      this.defaultOpts = {
        id: '',                           //容器ID
        num: 100,                        // 个数
        start_probability: 0.1,          // 如果数量小于num，有这些几率添加一个新的
        radius_min: 1,                   // 初始半径最小值
        radius_max: 2,                   // 初始半径最大值
        radius_add_min: .3,               // 半径增加最小值
        radius_add_max: .5,               // 半径增加最大值
        opacity_min: 0.3,                 // 初始透明度最小值
        opacity_max: 0.5,                // 初始透明度最大值
        opacity_prev_min: .003,            // 透明度递减值最小值
        opacity_prev_max: .005,            // 透明度递减值最大值
        light_min: 40,                 // 颜色亮度最小值
        light_max: 70,                 // 颜色亮度最大值
        is_same_color: false,          //泡泡颜色是否相同
        background:"#f1f3f4"
      }
      if (Object.prototype.toString.call(opts) == "[object Object]") {
        this.userOpts = {...this.defaultOpts, ...opts}
      } else {
        this.userOpts = {...this.defaultOpts, id: opts}
      }
      this.color = this.random(0, 360)
      this.bubbleNum = []
      this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      this.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
    }

    random(a, b) {
      return Math.random() * (b - a) + a    //取a-b之间的随机值
    }

    initBubble(color, isSameColor) {
      const width = window.innerWidth
      const height = window.innerHeight
      const userOpts = this.userOpts
      const light = this.random(userOpts.light_min, userOpts.light_max)
      this.bubble = {
        x: this.random(0, width),
        y: this.random(0, height),
        radius: this.random(userOpts.radius_min, userOpts.radius_max),
        radiusChange: this.random(userOpts.radius_add_min, userOpts.radius_add_max),
        opacity: this.random(userOpts.opacity_min, userOpts.opacity_max),
        opacityChange: this.random(userOpts.opacity_prev_min, userOpts.opacity_prev_max),
        light,
        color: `hsl(${isSameColor ? color : this.random(0, 360)},100%,${light}%)`,
      }
    }

    bubbling(ctx, color, isSameColor) {
      !this.bubble && this.initBubble(color, isSameColor)
      const bubble = this.bubble
      ctx.fillStyle = bubble.color;
      ctx.globalAlpha = bubble.opacity;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      bubble.opacity -= bubble.opacityChange;
      bubble.radius += bubble.radiusChange;
      if (bubble.opacity <= 0) {
        this.initBubble(color, isSameColor)
        return
      }
    }

    createCanvas() {
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.canvas.id = "bg_canvas";
      this.canvas.style.display = 'block'        //防止全屏的canvas出现滚动条
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.canvas.style.position = 'fixed'
      this.canvas.style.top = '0'
      this.canvas.style.left = '0'
      this.canvas.style.zIndex = '-1'
      document.getElementById(this.userOpts.id).appendChild(this.canvas)
      window.onresize = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
      }
    }

    start() {
      const width = window.innerWidth
      const height = window.innerHeight
      this.color += 0.1
      this.ctx.fillStyle = this.defaultOpts.background; //这里修改颜色hsl(${this.color},100%,97%)//rgba(255, 255, 255, 0)
      this.ctx.fillRect(0, 0, width, height);
      if (this.bubbleNum.length < this.userOpts.num && Math.random() < this.userOpts.start_probability) {
        this.bubbleNum.push(new BGBubble())
      }
      this.bubbleNum.forEach(bubble => bubble.bubbling(this.ctx, this.color, this.userOpts.is_same_color))
      const requestAnimationFrame = this.requestAnimationFrame
      this.myReq = requestAnimationFrame(() => this.start())
    }

    destory() {
      const cancelAnimationFrame = this.cancelAnimationFrame
      cancelAnimationFrame(this.myReq)
      window.onresize = null
    }

  }

  const bubbleDemo = new BGBubble('bubble')
  bubbleDemo.createCanvas()
  bubbleDemo.start()
}()