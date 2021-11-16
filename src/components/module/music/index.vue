<template>
    <div v-show="play.is_music" class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg dropdown-msg" aria-labelledby="topbar-music">
        <div class="dropdown-item noti-title p-0">
            <div class="dropdown-item notify-item text-white">
                <div id="audio">
                    <audio src="" controls="controls" loop="false" hidden="true"></audio>
                </div>
                <div class="notify-icon">
                    <img :src="music_info.cover || ''" class="img-fluid rounded-circle" />
                </div>
                <p class="notify-details">
                    <span>{{music_info.name}}</span>
                    <span style="color:#4e4748">{{music_info.msg || null}}</span>
                </p>
                <p class="mb-0 svg-list">
                    <span v-if="play.mode == 'order'" v-on:click.stop="methods.switchPlayMode('random')" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-order"></svg-icon></span>
                    <span v-else-if="play.mode == 'random'" v-on:click.stop="methods.switchPlayMode('single')" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-random"></svg-icon></span>
                    <span v-else-if="play.mode == 'single'" v-on:click.stop="methods.switchPlayMode('list')" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-single"></svg-icon></span>
                    <span v-else-if="play.mode == 'list'" v-on:click.stop="methods.switchPlayMode('order')" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-list"></svg-icon></span>
                    <span v-on:click.stop="methods.previous" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-left"></svg-icon></span>
                    <span v-if="!play.is_play" v-on:click.stop="methods.isPlay(true)" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-play"></svg-icon></span>
                    <span v-else-if="play.is_play" v-on:click.stop="methods.isPlay(false)" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-stop"></svg-icon></span>
                    <span v-on:click.stop="methods.next" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-right"></svg-icon></span>
                    <span v-if="!play.is_muted" v-on:click="methods.muted(false)" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-sound-on"></svg-icon></span>
                    <span v-if="play.is_muted" v-on:click="methods.muted(true)" class="mr-1" data-stopPropagation="true"><svg-icon i-class="music" file-name="music-sound-off"></svg-icon></span>
                    <span v-on:click="methods.playlist" class="music-play-list mr-1" data-stopPropagation="true">
                        <svg-icon v-if="play.is_playlist" i-class="music" file-name="music-songs"></svg-icon>
                        <svg-icon v-else-if="!play.is_playlist" i-class="music" file-name="music-songs-1"></svg-icon>
                    </span>
                </p>
                <div class="progress-w-percent m-0">
                    <div v-on:click="methods.speed" class="progress progress-sm float-right cursor" data-stopPropagation="true">
                        <div class="progress-bar" role="progressbar" :style="'width: '+ music_info.speed +'%'" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 歌曲列表 - 开始 -->
        <div class="slimscroll" style="max-height: 0;height:unset">
            <a v-for="(data, index) in music.songs" :key="index" v-on:click.stop="methods.musicInfo(index,data.song_id)" data-stopPropagation="true" class="dropdown-item notify-item cursor">
                <span class="limit font-13 mr-2">
                    <span class="text-muted mr-2">{{ index + 1 }}</span>
                    {{data.name}}
                </span>
                <span class="limit">
                    <small>{{data.author}}</small>
                </span>
            </a>
        </div>
        <!-- 歌曲列表 - 结束 -->

        <!-- VIEW All -->
        <a v-on:click.stop="methods.openList()" href="javascript:;" data-stopPropagation="true" class="dropdown-item text-center text-primary notify-item notify-all">
            {{music.view || '显示歌曲列表'}}
        </a>
        <!-- VIEW All -->

        <!-- 歌单列表 - 开始 -->
        <div class="slimscroll music-playlist" style="max-height: 230px;">
            <a v-for="data in music_play_list.data" :key="data.id" v-on:click.stop="methods.setPlayListId(data.id)" data-stopPropagation="true" href="javascript:;" class="dropdown-item notify-item">
                <div class="notify-icon">
                    <img :src="data.head_img || ''" class="img-fluid rounded-circle" />
                </div>
                <p class="notify-details">{{data.title || '歌单名称'}}</p>
                <p class="text-muted mb-0 user-msg">
                    <small>{{data.description || '歌单描述'}}</small>
                </p>
            </a>
        </div>
        <!-- 歌单列表 - 结束 -->

    </div>
    <div v-show="!play.is_music" class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg dropdown-msg" aria-labelledby="topbar-music">
        <div class="dropdown-item noti-title" style="min-height:unset">
            <h5 class="m-0">
                <span class="float-right">
                </span>
                音乐播放器提示
            </h5>
        </div>
        <div class="card-body text-center">
            <span class="badge badge-primary-lighten">后台未设置歌单</span>
        </div>
    </div>
</template>

<script>
import { GET } from '@/utils/http/request'
import { onMounted, reactive, toRefs, watch, watchEffect } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import { useStore } from 'vuex'
import JQ from 'jquery'

export default {
    setup() {

        const store = useStore()
        const state = reactive({
            music: [],          // 音乐
            music_info:[],      // 当前播放的音乐数据
            music_play_list:[], // 歌单列表
            play: {mode:'order',is_play:false,is_muted:false,is_playlist:true}, // 播放方式
        })

        // 判断浏览器是否存在缓存
        let storage_music = inisHelper.get.storage('music')
        if (!inisHelper.is.empty(storage_music) && storage_music) {
            state.play = storage_music
            state.play.is_play = false
        }

        const methods = {
            // 获取歌单数据
            music(id=null, info = true) {
                GET('music',{
                    params: {id,mode:'list'}
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.music = res.data.data
                        document.querySelector('.slimscroll').style.height = "unset"
                        if (info) methods.musicInfo()
                    }
                })
            },
            // 打开歌曲列表
            openList(){
                let DOM = document.querySelector('.music-nav .slimscroll')
                DOM.style.setProperty('transition','all .3s ease')
                DOM.style.setProperty('height','unset')
                if (DOM.style.maxHeight == '0px') {
                    state.music.view = '隐藏歌曲列表'
                    DOM.style.setProperty('max-height','230px')
                } else {
                    state.music.view = '显示歌曲列表'
                    DOM.style.setProperty('max-height','0px')
                }
            },
            // 自适应
            autoBar(){
                let is_mobile = inisHelper.get.storage('inis','mobile')
                if (is_mobile) {
                    // let DOM = document.querySelector('.music-nav')
                    // let width = DOM.offsetWidth + DOM.offsetLeft - 15
                    // document.querySelector('.music-nav .dropdown-menu').style.setProperty('width', width + 'px', 'important')
                }
            },
            // 切换播放方式
            switchPlayMode(val = 'order'){
                state.play.mode = val
                inisHelper.set.storage('music',state.play)
                // 单曲循环
                if (val=='single') document.querySelector("#audio audio").loop = true
                event.stopPropagation();
            },
            // 是否播放
            isPlay(bool = false){
                state.play.is_play = bool
                inisHelper.set.storage('music',state.play)
                // event.stopPropagation();
            },
            // 当前播放音乐的数据
            musicInfo(index = 0, song_id = null) {
                // 随机获取歌曲
                if (inisHelper.is.empty(song_id) && state.play.mode == 'random') {
                    index = inisHelper.get.random.num(0, state.music.songs.length)
                }
                state.music_info = state.music.songs[index]
                // 索引
                state.music_info.id = index
                // 是否已获取播放地址
                state.music_info.check = false
                // 总时长
                state.music_info.duration = 0
                // 当前播放位置
                state.music_info.current_time = 0
                // 播放进度
                state.music_info.speed = 0
                // 是否点击播放
                if (!inisHelper.is.empty(song_id)) {
                    methods.getMusicUrl(song_id)
                    state.play.is_play = true
                }
            },
            // 上一曲
            previous(){
                
                let index = state.music_info.id - 1
                if (index < 0) index = state.music.songs.length - 1

                if (state.play.mode == 'random') {
                    index = inisHelper.get.random.num(0, state.music.songs.length)
                }
                methods.musicInfo(index)
                methods.getMusicUrl()
            },
            // 下一曲
            next(){

                let index = state.music_info.id + 1
                if (index >= state.music.songs.length) index = 0

                if (state.play.mode == 'random') {
                    index = inisHelper.get.random.num(0, state.music.songs.length)
                }
                methods.musicInfo(index)
                methods.getMusicUrl()
            },
            // 获取播放地址
            async getMusicUrl(id=state.music_info.song_id){

                let result = false

                let params = {
                    id,
                    mode:'song',
                    who: state.music.info.expand.type,
                }

                result = await GET('music',{params})

                if (result.data.code == 200) {
                    state.music_info.url = result.data.data.url
                    state.music_info.check = true
                    methods.setPlayUrl(result.data.data.url)
                    result = true
                }

                return result
            },
            // 播放或暂停
            play(is_play = true){
                let audio = document.querySelector("#audio audio")
                if (is_play) audio.play()
                else audio.pause()
            },
            // 是否静音
            muted(is_muted = true){

                state.play.is_muted = !is_muted
                inisHelper.set.storage('music',state.play)

                let audio = document.querySelector("#audio audio")
                if (!is_muted) audio.muted = true
                else audio.muted = false

                event.stopPropagation();
            },
            // 设置播放地址
            setPlayUrl(url = ''){
                let audio = document.querySelector("#audio audio")
                let img = document.querySelector(".music-nav .noti-title .notify-icon img")
                audio.src = url
                let playPromise = audio.play()
                if (playPromise !== undefined) {

                    let result = new Promise((resolve, reject)=>{
                        playPromise.then(() => {
                            state.play.is_play = true
                            state.music_info.msg = null
                            img.classList.add('rotate')
                            resolve(true)
                        }).catch(()=>{
                            state.music_info.msg = "播放地址已失效"
                            img.classList.remove('rotate')
                            state.play.is_play = false
                            reject(false)
                        })
                    })

                    result.then((res) => {},(err) => {
                        setTimeout(()=>{
                            methods.next()
                        },1500)
                    })
                }
                // 获取音乐时长
                audio.oncanplay = () => {
                    state.music_info.duration = audio.duration
                }
                if (state.play.is_play) audio.play()
            },
            // 跳转播放进度
            speed(){
                let DOM = document.querySelector(".music-nav .progress-w-percent .progress")
                // 进度条宽度
                let width= DOM.offsetWidth
                // 进度条距离屏幕左边位置
                let left = DOM.getBoundingClientRect().left
                // 鼠标点击的位置
                let position = event.clientX
                let speed = ((position - left) / width) * state.music_info.duration
                // 更新播放进度
                document.querySelector(".progress-bar").style.setProperty('width',(position - left) / width * 100 +'%')
                document.querySelector("#audio audio").currentTime = speed
            },
            // 显示歌单列表
            playlist(){

                let items = document.querySelectorAll(".music-nav .dropdown-menu .slimScrollDiv")

                if (state.play.is_playlist) {
                    state.play.is_playlist = false
                    // 动画
                    setTimeout(()=>{
                        inisHelper.set.css(".music-playlist","height:unset!!important;display: block;")
                    },100)
                    for (let item in items) if (item == 1) {
                        items[item].style.setProperty('background-color','var(--inis-primary)')
                        items[item].classList.add('enlarge')
                        items[item].classList.remove('narrow')
                    }
                } else {
                    state.play.is_playlist = true
                    // 动画
                    for (let item in items) if (item == 1) {
                        items[item].classList.add('narrow')
                        items[item].classList.remove('enlarge')
                        items[item].style.setProperty('background-color','#ffffff00')
                    }
                    setTimeout(()=>{
                        inisHelper.set.css(".music-playlist","display: none;")
                    },100)
                }
                inisHelper.set.storage('music',state.play)
                event.stopPropagation();
            },
            // 获取歌单列表
            musicPlayList(){
                let params = {limit: 20,order:'create_time desc'}
                GET('music',{params}).then(res=>{
                    if (res.data.code == 200) {

                        state.music_play_list = res.data.data
                        let play_list_id = inisHelper.get.storage('music','play_list_id')

                        // 存在公开的歌单
                        if (!inisHelper.is.empty(res.data.data.data)) {

                            let new_id = res.data.data.data[0].id

                            // 检查缓存是否存在已选歌单
                            if (!inisHelper.is.empty(play_list_id)) for (let item of res.data.data.data) {
                                // 缓存中的已选歌单ID后台未删除
                                if (play_list_id == item.id) new_id = play_list_id
                            }

                            methods.music(new_id)
                            // 更新歌单ID
                            state.play.play_list_id = new_id
                            // 更新播放器状态
                            state.play.is_music = true

                        } else state.play.is_music = false
                        // 更新缓存
                        inisHelper.set.storage('music',state.play)
                    }
                })
            },
            // 设置歌单ID
            setPlayListId(id = null){
                if (!inisHelper.is.empty(id)) {

                    let info = true
                    // 正在播放音乐 - 只刷新歌曲列表
                    if (state.play.is_play) info = false

                    methods.music(id, info)
                    inisHelper.set.storage('music',{play_list_id:id})
                }
            },
        }

        onMounted(()=>{
            methods.autoBar()
            // 监听是否显示音乐播放器
            watch(()=>store.state.theme_config.basic, ()=>{
                let basic = store.state.theme_config.basic
                let music_show = (basic.music_show == 'true') ? true : false
                if (music_show) methods.musicPlayList()
            })
            // 监听静音按钮，初始化缓存中的数据
            watchEffect(() => {
                let audio = document.querySelector("#audio audio")
                if (state.play.is_muted) {
                    audio.muted = true
                } else audio.muted = false
                // 单曲循环
                if (state.play.mode == 'single') audio.loop = true
                else audio.loop = false
            })
        })

        // 监听播放按钮
        watch(() => state.play.is_play, async () => {

            // 未获取播放地址，执行获取播放地址
            if (!state.music_info.check) {
                await methods.getMusicUrl()
            }

            let audio = document.querySelector("#audio audio")
            let img = document.querySelector(".music-nav .noti-title .notify-icon img")

            if (state.play.is_play) {
                methods.play()
                img.classList.add('rotate')
                window.interval = window.setInterval(()=>{
                    state.music_info.current_time = audio.currentTime
                    state.music_info.speed = (state.music_info.current_time/state.music_info.duration) * 100
                    if (state.music_info.speed == 100 && state.play.mode != 'single') {
                        methods.next()
                    }
                }, 1000);
            } else {
                methods.play(false)
                img.classList.remove('rotate')
                window.clearInterval(window.interval);
            }
        })

        // 指定要操作的元素的click事件停止传播—定义属性值data-stopPropagation的元素点击时停止传播事件
        JQ("body").on('click','[data-stopPropagation]', (e)=>{
            e.stopPropagation();
        });

        return { ...toRefs(state), methods }
    },
    methods: {
        
    },
    computed: {

    },
    watch: {

    },
}
</script>

<style scoped>

</style>