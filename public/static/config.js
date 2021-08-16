window.INIS = {

    // API地址
    api: "https://api.inis.cn/api/",

    // 复制内容是否携带版权 - 开启全站生效 - 关闭仅仅复制代码框生效
    copyright: false,

    // 设置复制携带版权内容 \n = 换行 \t = 首行缩进
    copy_text: `您复制了INIS系统的内容\n网址：${window.location.href}`,

    // 文章配置
    article: {
        end_copy: true,                 // 是否显示页脚版权
    },

    // 页面配置
    page: {
        // 留言墙配置
        msg_wall: {
            ordain_day_ranking: 300,    // 留言墙处的 XX 天内排行
        }
    },

    // 帮助信息
    help: {
        is_show: true,
        title: '您好！请问有什么可以帮您！',
        btn_title: '帮助',
        btn_url: '//docs.inis.cc',
        img_src: 'assets/images/help-icon.svg',
    },

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
    version: '1.1.1',

    // 1.2版本之前，一些设置会放在当前配置文件里面，虽然不太友好
    // 1.2版本之后，配置信息将会以后台的形式存在，不再需要到当前文件配置
}
