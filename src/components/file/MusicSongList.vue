<script setup lang="ts">

import SearchBox from "@/components/common/SearchBox.vue";
import TableListBox from "@/components/common/TableListBox.vue";
import {onMounted, ref} from "vue";
import {PageType} from "@/api/common-types.ts";
import {getAllSongsApi, updateSongApi} from "@/api/list";
import DialogBox from "@/components/common/DialogBox.vue";
import {MusicSongType} from "@/api/list/types.ts";
import msg, {PositionTypeEnum} from "@/components/message/index.ts"

export interface StudentType {
  id: number,
  name: string,
  age: number,
  address: string,
}


const initPage = ref<PageType>({
  currentIndex: 1,
  pageSize: 20,
  pageTotal: 1,
  dataTotal: 0,
  list: [],
  sizeOptions: [20, 50, 100, 200],
})

function delSong(song: MusicSongType) {
  console.log(song)
}


function changePage(page: PageType) {
  getSongs(page)
}

function getSongs(page: PageType) {
  getAllSongsApi(page).then(res => {
    page.list = res.data.list
    page.pageTotal = res.data.pageTotal
    page.dataTotal = res.data.dataTotal
  })
}

onMounted(() => {
  getSongs(initPage.value)
})
const headers = ref(['歌曲ID', '歌曲名称', '歌曲地址', '歌曲图片地址', '是否喜欢', '歌词文件地址', '歌曲风格',
  '发行日期', '专辑ID', '歌手ID', '删除标志', '上传时间', '更新时间', 'musicSinger', 'musicAlbum',])

let dialogIsHidden = ref<boolean>(true)

function hideDialog() {
  dialogIsHidden.value = true
}

const songRef = ref<MusicSongType | null>()

function editSong(song: MusicSongType) {
  console.log(song)
  songRef.value = song
  dialogIsHidden.value = false
}

function commitUpdate(song: MusicSongType) {
  console.log(songRef.value)
  updateSongApi(songRef.value!).then(res => {
    console.log(res)
    if (res.status === 200) {
      msg.success('修改成功', PositionTypeEnum.TOP)
    }
  })
  dialogIsHidden.value = true
}
</script>

<template>
  <div class="song-list-file-content">
    <div class="top-search-box">
      <search-box/>
    </div>
    <div class="content-list">
      <!-- 歌曲列表 -->
      <table-list-box :headers="headers"
                      v-model:page="initPage"
                      @editSong="editSong"
                      @delSong="delSong"
                      @changePage="changePage"/>
      <dialog-box title="修改歌曲信息" v-if="!dialogIsHidden"
                  @hideDialog="hideDialog"
                  @commitData="commitUpdate">
        <div class="form-box">
          <div class="form-title">歌曲名：</div>
          <div class="form-content">
            <input type="text" placeholder="请输入歌曲名称" v-model="songRef!.songName"/>
          </div>
        </div>
        <div class="form-box">
          <div class="form-title">歌曲风格：</div>
          <div class="form-content">
            <input type="text" placeholder="请输入歌曲名称" v-model="songRef!.songStyle"/>
          </div>
        </div>
        <div class="form-box">
          <div class="form-title">发行日期：</div>
          <div class="form-content">
            <input type="date" v-model="songRef!.releaseDate"/>
          </div>
        </div>
      </dialog-box>
    </div>
    <div class="bottom-page-num">
      <!-- 分页 -->
    
    </div>
  </div>

</template>

<style scoped lang="scss">
.song-list-file-content {
  height: calc(100vh - 8rem);
  width: calc(100vw - 20rem);
}

.form-box {
  display: flex;
  font-family: "HarmonyOS Sans", sans-serif;
  line-height: 5rem;
  
  .form-title {
    width: 28%;
    font-size: 1.6rem;
    text-align: right;
    color: var(--zoey-form-title-text);
  }
  
  .form-content {
    width: 62%;
    padding-left: 5rem;
    
    input {
      width: 30rem;
      height: 2.8rem;
      border: 0.15rem solid var(--zoey-bg-input);
      border-radius: 0.5rem;
      padding-left: 1rem;
      font-size: 1.4rem;
      color: var(--zoey-form-input-text);
    }
  }
}
</style>