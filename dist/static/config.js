window.INIS = {

    // API地址
    api: "https://api.inis.cn/api/",

    token: '19221686b6db02eb4953d688e5cb7231',

    // 路由模式 - true = 带 # 号路由
    route_hash: true,
    // 路由模式如果需要关闭，即不带 # 号的模式
    //   需要到服务器 nginx 做一些配置
    //   配置如下
    //     error_page 404 index.html;
    //     location / {
    //         try_files $uri $uri/ /index.html;
    //     }
    version: '1.2.0',
}
