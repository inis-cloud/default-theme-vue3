// SVG 组件
import svgIcon from '@/components/tool/SvgIcon'
// 代码高亮
import JQ from 'jquery'
import store from '@/store'
import hljs from 'highlight.js'
import select2 from 'vue3-select2-component';
import { inisHelper } from '@/utils/helper/helper'


const plugins = {
    install: Vue => {

        // 定义全局组件
        Vue.component('svg-icon', svgIcon)
        Vue.component('select2', select2)

        // 自定义一个代码高亮指令
        Vue.directive('code-highlight',(el)=>{
            const highlight = el.querySelectorAll('pre code');
            highlight.forEach((block)=>{
                hljs.highlightBlock(block)
                // 显示行号
                block.innerHTML = "<ul><li>" + block.innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ul>";
                // 添加头
                let language = null
                block.classList.forEach((className)=>{
                    if (className.indexOf("language-") != -1) language = className.split('-')[1]
                })
                let pre_head = document.createElement("div")
                pre_head.classList.add('pre-head')
                pre_head.innerHTML = "<p><span class='code-language'>" + language.toUpperCase() + "</span><span class='copy'><img class='w-auto mr-1' src='assets/svg/tag.svg' />复制</span></p>";
                block.parentNode.insertBefore(pre_head, block)
                // 创建修复滚动条白点
                let repair = document.createElement("span")
                repair.classList.add("repair")
                block.parentNode.insertBefore(repair, block)
            })
            // 复制操作
            el.querySelectorAll('pre').forEach((item)=>{
                JQ(item).find('.copy').click(()=>{
                    let result = inisHelper.set.copy.text(JQ(item).find('code').text(), store.state.theme_config.other.copy.text || null)
                    if (result) $(item).find(".copy").html("<img class='w-auto mr-1' src='assets/svg/tag.svg' />已复制</span>")
                })
            })
        })
    }
}

const req = require.context('@/assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

export default plugins
