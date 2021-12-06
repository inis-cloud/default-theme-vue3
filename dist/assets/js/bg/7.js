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
// | 动态背景：下雨背景
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
  style:'top: 0;left: 0;position: fixed;width: 100%;height: 100%;z-index: -1;display: block; background: rgb(56, 163, 179);',
  id:'bg_canvas'
}])

    let can = document.getElementById("bg_canvas");
	//设置2d绘图环境
	let ctx = can.getContext("2d");

	//获取浏览器窗口的宽高
	let w = can.width = window.innerWidth,
		h = can.height = window.innerHeight;
	//自适应浏览器窗口
	window.onresize = function () {
		w = can.width = window.innerWidth,
		h = can.height = window.innerHeight;
	}
	//         ctx.fillStyle="yellow"
	//       ctx.fillRect(100,100,100,100);
	//       //  绘制圆形
	//    ctx.arc(250,250,50,0,Math.PI*2,false);
	//    ctx.strokeStyle="yellow";
	//    ctx.stroke();
	// //运动
	// let y=0;
	// setInterval(function(){
	// y++;
	// ctx.clearRect(0,0,w,h);
	// ctx.fillRect(100,y,100,100);
	// },30);
	function Drop() {}; //创建雨滴类
	Drop.prototype = {
		init: function () {
			this.x = rand(0, w); //雨滴的初始化坐标
			this.y = 0; //雨滴y轴方向的坐标
			this.vy = rand(8, 9); //雨滴下落的速度
			this.l = rand(h * 0.8, h * 0.9); //雨滴下落的高度
			this.r = 1;
			this.vr = 1; //半径增加的速度
			this.a = 1;
			this.va = 0.98; //透明度的变化系数
		},
		draw: function () //绘制雨滴
		{
			if (this.y > this.l) {
				//绘制圆形
				ctx.beginPath(); //开始路径
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
				ctx.strokeStyle = "rgba(255,255,255," + this.a + ")";
				ctx.stroke();

			} else {
				//绘制下落的雨滴
				ctx.fillStyle = "rgb(255,255,255)";
				ctx.fillRect(this.x, this.y, 2, 10);
			}
			this.update();
		},
		update: function () //更新坐标
		{
			if (this.y < this.l) {
				this.y += this.vy;
			} else {
				if (this.a > 0.03) {
					this.r += this.vr;
					if (this.r > 50) {
						this.a *= this.va;
					}
				} else {
					//重新初始化了
					this.init();
				}
			}
		}
	}
	//实例化一个雨滴对象
	let drops = []; //默认值为undefined
	//console.log(drops)
	for (let i = 0; i < 30; i++) {
		setTimeout(function () {
			let drop = new Drop();
			drop.init();
			drops.push(drop);
		}, i * 200)
	}
	//实例初始化
	setInterval(function () {
		//绘制一个透明层
		ctx.id = "rainbow";
		ctx.fillStyle = "rgba(129, 135, 255, 0.44)";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < drops.length; i++) {
			drops[i].draw();
		}
	}, 30);

	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}
}()