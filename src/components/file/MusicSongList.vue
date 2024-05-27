<script setup lang="ts">

import SearchBox from "@/components/common/SearchBox.vue";
import TableListBox from "@/components/common/TableListBox.vue";
import {onMounted, ref} from "vue";
import {PageType} from "@/api/common-types.ts";
import {getAllSongsApi} from "@/api/list";

export interface StudentType {
  id: number,
  name: string,
  age: number,
  address: string,
}


const initpage = ref<PageType>({
  currentIndex: 1,
  pageSize: 20,
  pageTotal: 1,
  dataTotal: 0,
  list: [],
  sizeOptions: [20, 50, 100, 200],
})

function delSong(song: StudentType) {
  console.log(song)
}

function editSong(song: StudentType) {
  console.log(song)
}

function change(page: PageType) {
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
  getSongs(initpage.value)
})
const headers = ref(['歌曲ID', '歌曲名称', '歌曲地址', '歌曲图片地址', '是否喜欢', '歌词文件地址', '歌曲风格',
  '发行日期', '专辑ID', '歌手ID', '删除标志', '上传时间', '更新时间', 'musicSinger', 'musicAlbum',])
</script>

<template>
  <div class="song-list-file-content">
    <div class="top-search-box">
      <search-box/>
    </div>
    <div class="content-list">
      <!-- 歌曲列表 -->
      <table-list-box :headers="headers" :page="initpage" :del="delSong"
                      :edit="editSong" :change="change"/>
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
</style>