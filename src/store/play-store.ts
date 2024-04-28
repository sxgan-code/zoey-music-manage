import {defineStore} from 'pinia'
import {MusicListType, MusicSongType} from "@/api/list/type.ts";
import {isEmptyReturnOldData} from "@/utils/common-utils.ts";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const usePlayStore = defineStore('play', {
    // other options...
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            staticBaseUrl: import.meta.env.VITE_BASE_URL + '/static',
            songList: {
                listId: 0,
                listName: '',
                listType: 1,
                listInfo: '',
                listStyle: '',
                listPic: '',
                userId: 0,
                createTime: '',
                updateTime: '',
            } as MusicListType,
            songInfo: {
                songId: 0,
                listId: 0,
                songName: '推荐音乐--> 遗憾最终',
                isLike: 1,
                songUrl: '/songs/遗憾最终.mp3',
                songPic: '/image/default/logo.png',
                lyricUrl: '',
                songStyle: '',
                releaseDate: '',
                albumId: 0,
                singerId: 0,
                delFlag: 0,
                createTime: '',
                updateTime: '',
                musicSinger: {
                    address: '',
                    createTime: '',
                    delFlag: 0,
                    singerId: 0,
                    singerName: '何仟仟',
                    singerPic: '',
                    updateTime: '',
                },
                musicAlbum: {
                    albumId: 0,
                    albumName: '',
                    albumPic: '',
                    createTime: '',
                    delFlag: 0,
                    releaseDate: '',
                    singerId: 0,
                    updateTime: '',
                }
            } as MusicSongType,
            songPlayingInfo: {
                isPlay: false, // 播放状态
                currentTime: '00:00', // 当前播放时间
                currentScale: 0, // 当前播放时间比例
                durationTime: '00:00',// 当前歌曲的总时长
                duration: 0,// 当前歌曲的总时长
                clickCurrent: 0, // 点击的进度
                cacheTimeScale: 0, // 当前缓存时间比例
                loopStyle: 'list', // 当前播放格式 one:单曲循环，list:列表循环，random：随机循环
                volume: 10, // 音量
                overCount: 0, // 每次播放完毕都会加一，上线为10会重置
                songs: [] as MusicSongType[] | undefined, // 当前播放歌曲所在歌单的所有歌曲
            }
        }
    },
    actions: {
        setSongList(data: MusicListType) {
            this.songList.listId = isEmptyReturnOldData(data.listId, this.songList.listId)
            this.songList.listName = isEmptyReturnOldData(data.listName, this.songList.listName)
            this.songList.listType = isEmptyReturnOldData(data.listType, this.songList.listType)
            this.songList.listInfo = isEmptyReturnOldData(data.listInfo, this.songList.listInfo)
            this.songList.listStyle = isEmptyReturnOldData(data.listStyle, this.songList.listStyle)
            this.songList.listPic = isEmptyReturnOldData(data.listPic, this.songList.listPic)
            this.songList.userId = isEmptyReturnOldData(data.userId, this.songList.userId)
            this.songList.createTime = isEmptyReturnOldData(data.createTime, this.songList.createTime)
            this.songList.updateTime = isEmptyReturnOldData(data.updateTime, this.songList.updateTime)
        },
        /* 设置歌曲 */
        setSongInfo(data: MusicSongType) {
            this.songInfo.songId = isEmptyReturnOldData(data.songId, this.songInfo.songId)
            this.songInfo.listId = isEmptyReturnOldData(data.listId, this.songInfo.listId)
            this.songInfo.songName = isEmptyReturnOldData(data.songName, this.songInfo.songName)
            this.songInfo.isLike = isEmptyReturnOldData(data.isLike, this.songInfo.isLike)
            this.songInfo.songUrl = isEmptyReturnOldData(data.songUrl, this.songInfo.songUrl)
            this.songInfo.songPic = isEmptyReturnOldData(data.songPic, this.songInfo.songPic)
            this.songInfo.lyricUrl = isEmptyReturnOldData(data.lyricUrl, this.songInfo.lyricUrl)
            this.songInfo.songStyle = isEmptyReturnOldData(data.songStyle, this.songInfo.songStyle)
            this.songInfo.releaseDate = isEmptyReturnOldData(data.releaseDate, this.songInfo.releaseDate)
            this.songInfo.albumId = isEmptyReturnOldData(data.albumId, this.songInfo.albumId)
            this.songInfo.singerId = isEmptyReturnOldData(data.singerId, this.songInfo.singerId)
            this.songInfo.delFlag = isEmptyReturnOldData(data.delFlag, this.songInfo.delFlag)
            this.songInfo.createTime = isEmptyReturnOldData(data.createTime, this.songInfo.createTime)
            this.songInfo.updateTime = isEmptyReturnOldData(data.updateTime, this.songInfo.updateTime)
            this.songInfo.musicSinger.address = isEmptyReturnOldData(data.musicSinger.address, this.songInfo.musicSinger.address)
            this.songInfo.musicSinger.createTime = isEmptyReturnOldData(data.musicSinger.createTime, this.songInfo.musicSinger.createTime)
            this.songInfo.musicSinger.delFlag = isEmptyReturnOldData(data.musicSinger.delFlag, this.songInfo.musicSinger.delFlag)
            this.songInfo.musicSinger.singerId = isEmptyReturnOldData(data.musicSinger.singerId, this.songInfo.musicSinger.singerId)
            this.songInfo.musicSinger.singerName = isEmptyReturnOldData(data.musicSinger.singerName, this.songInfo.musicSinger.singerName)
            this.songInfo.musicSinger.singerPic = isEmptyReturnOldData(data.musicSinger.singerPic, this.songInfo.musicSinger.singerPic)
            this.songInfo.musicSinger.updateTime = isEmptyReturnOldData(data.musicSinger.updateTime, this.songInfo.musicSinger.updateTime)
            this.songInfo.musicAlbum.albumId = isEmptyReturnOldData(data.musicAlbum.albumId, this.songInfo.musicAlbum.albumId)
            this.songInfo.musicAlbum.albumName = isEmptyReturnOldData(data.musicAlbum.albumName, this.songInfo.musicAlbum.albumName)
            this.songInfo.musicAlbum.albumPic = isEmptyReturnOldData(data.musicAlbum.albumPic, this.songInfo.musicAlbum.albumPic)
            this.songInfo.musicAlbum.createTime = isEmptyReturnOldData(data.musicAlbum.createTime, this.songInfo.musicAlbum.createTime)
            this.songInfo.musicAlbum.delFlag = isEmptyReturnOldData(data.musicAlbum.delFlag, this.songInfo.musicAlbum.delFlag)
            this.songInfo.musicAlbum.releaseDate = isEmptyReturnOldData(data.musicAlbum.releaseDate, this.songInfo.musicAlbum.releaseDate)
            this.songInfo.musicAlbum.singerId = isEmptyReturnOldData(data.musicAlbum.singerId, this.songInfo.musicAlbum.singerId)
            this.songInfo.musicAlbum.updateTime = isEmptyReturnOldData(data.musicAlbum.updateTime, this.songInfo.musicAlbum.updateTime)
        },
        /* 初始化 */
        initSongPlayingInfo() {
            this.songPlayingInfo.currentTime = '00:00'
            this.songPlayingInfo.currentScale = 0
            this.songPlayingInfo.durationTime = '00:00'
            this.songPlayingInfo.duration = 0
            this.songPlayingInfo.cacheTimeScale = 0
        }
    },
    getters: {
        // 返回歌单
        getSongList: (state) => state.songList,
        // 返回当前播放歌曲的信息
        getSongInfo: (state) => state.songInfo,
        // 返回当前播放状态等信息
        getSongPlayingInfo: (state) => state.songPlayingInfo,
    },
    persist: true,
})