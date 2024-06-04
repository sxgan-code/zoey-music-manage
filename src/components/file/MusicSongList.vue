<script setup lang="ts">

import SearchBox from "@/components/common/SearchBox.vue";
import TableListBox from "@/components/common/TableListBox.vue";
import {onMounted, ref} from "vue";
import {PageType} from "@/api/common-types.ts";
import {getAllSongsApi, searchSongApi, updateSongApi} from "@/api/list";
import DialogBox from "@/components/common/DialogBox.vue";
import {MusicSongType} from "@/api/list/types.ts";
import msg, {PositionTypeEnum} from "@/components/message/index.ts"
import {useUserStore} from "@/store/user-store.ts";
import {fileUploadApi} from "@/api/file";
import {PlusOutlined} from "@ant-design/icons-vue";
import SongFileUploadProcess from "@/components/file/SongFileUploadProcess.vue";

const userStore = useUserStore();
const timestamp = ref<number>(0)

/**
 * @Description: 表格相关
 * @Author: sxgan
 * @Date: 2024/6/1 11:26
 * @Version: 1.0
 **/
const initPage = ref<PageType>({
  currentIndex: 1,
  pageSize: 20,
  pageTotal: 1,
  dataTotal: 0,
  list: [],
  sizeOptions: [20, 50, 100, 200],
})
const headers = ref(['歌曲ID', '歌曲名称', '歌曲地址', '歌曲图片地址', '是否喜欢', '歌词文件地址', '歌曲风格',
  '发行日期', '专辑ID', '歌手ID', '删除标志', '上传时间', '更新时间', 'musicSinger', 'musicAlbum',])

/* 删除歌曲 */
function delSong(song: MusicSongType) {
  console.log(song)
}

/* 分页数据更改刷新 */
function changePage(page: PageType) {
  getSongs(page)
}

/* 获取歌曲列表 */
function getSongs(page: PageType) {
  userStore.isMask = true
  getAllSongsApi(page).then(res => {
    if (res.status === 200) {
      timestamp.value = res.timestamp
      page.list = res.data.list
      page.pageTotal = res.data.pageTotal
      page.dataTotal = res.data.dataTotal
    } else {
      msg.error('获取歌曲列表失败', PositionTypeEnum.TOP)
    }
    userStore.isMask = false
  })
}

/* 初始化 */
onMounted(() => {
  getSongs(initPage.value)
})

/**
 * @Description: 歌曲图片修改上传
 * @Author: sxgan
 * @Date: 2024/6/1 11:25
 * @Version: 1.0
 **/
let dialogIsHidden = ref<boolean>(true)

const songRef = ref<MusicSongType | null>()

function editSong(song: MusicSongType) {
  console.log(song)
  songRef.value = song
  show('edit')
}

function commitUpdate(song: MusicSongType) {
  console.log(songRef.value)
  updateSongApi(songRef.value!).then(res => {
    console.log(res)
    if (res.status === 200) {
      msg.success('修改成功', PositionTypeEnum.TOP)
    }
  })
  hideDialog()
}

/**
 * @Description: 图片文件文件上传
 * @Author: sxgan
 * @Date: 2024/6/1 11:24
 * @Version: 1.0
 **/
const selectedFile = ref(null);

const handleFileChange = (event: any) => {
  selectedFile.value = event.target.files[0];
};
const uploadFile = async () => {
  if (!selectedFile.value) {
    msg.warning('请选择一个文件', PositionTypeEnum.TOP);
    return;
  }
  await fileUploadApi(selectedFile.value).then(res => {
    try {
      if (res.status === 200) {
        msg.success('上传成功', PositionTypeEnum.TOP)
      } else {
      
      }
    } catch (error) {
      msg.warning('文件上传异常', PositionTypeEnum.TOP)
    }
  })
};
/**
 * @Description: 歌曲文件上传
 * @Author: sxgan
 * @Date: 2024/6/1 11:24
 * @Version: 1.0
 **/
const uploadDialogIsHidden = ref<boolean>(true)

function show(flag: string) {
  if (flag === 'upload') {
    uploadDialogIsHidden.value = false
  } else if (flag === 'edit') {
    dialogIsHidden.value = false
  }
}

function hideDialog() {
  dialogIsHidden.value = true
  uploadDialogIsHidden.value = true
}

/**
 * @Description: 歌曲搜索
 * @Author: sxgan
 * @Date: 2024/6/4 19:21
 * @Version: 1.0
 **/
function search(song: MusicSongType) {
  console.log(song)
  userStore.isMask = true
  searchSongApi(song).then(res => {
    if (res.status === 200) {
      timestamp.value = res.timestamp
      initPage.value.list = res.data.list
      initPage.value.pageTotal = res.data.pageTotal
      initPage.value.dataTotal = res.data.dataTotal
      initPage.value.currentIndex = res.data.currentIndex
      initPage.value.pageSize = res.data.pageSize
    } else {
      msg.error('服务器异常，搜索失败', PositionTypeEnum.TOP)
    }
    userStore.isMask = false
  })
}

</script>

<template>
  <div class="song-list-file-content">
    <div class="top-search-box">
      <search-box @search="search"/>
    </div>
    <div class="top-add-box">
      <button class="btn-mini btn-primary" @click="show('upload')">
        <PlusOutlined/>
        上传文件
      </button>
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
        <div class="form-box">
          <div class="form-title">歌曲图片：</div>
          <div class="form-content">
            <div class="img-box"><img :src="userStore.staticBaseUrl+songRef?.songPic+'?time='+timestamp" alt=""></div>
            <div class="file-upload-box">
              <input class="file-upload" type="file" accept="image/*" @change="handleFileChange">
              <button type="button" class="btn-max btn-primary btn-box" @click="uploadFile">上传修改</button>
            </div>
          </div>
        </div>
      </dialog-box>
      <dialog-box title="上传歌曲" v-if="!uploadDialogIsHidden" @hideDialog="hideDialog">
        <SongFileUploadProcess/>
      </dialog-box>
    </div>
  </div>

</template>

<style scoped lang="scss">
.song-list-file-content {
  height: calc(100vh - 8rem);
  width: calc(100vw - 20rem);
  
  .top-add-box {
    width: 99%;
    height: 3rem;
    margin: 0.5rem auto;
    background: var(--bg-light-rgb);
    border-radius: 1rem;
    
    button {
      margin: 0.5rem 3rem;
    }
  }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    input {
      width: 30rem;
      height: 2.8rem;
      border: 0.15rem solid var(--zoey-bg-input);
      border-radius: 0.5rem;
      padding-left: 1rem;
      font-size: 1.4rem;
      color: var(--zoey-form-input-text);
    }
    
    .img-box {
      margin-top: 2rem;
      width: 20rem;
      height: 20rem;
      
      img {
        height: 100%;
        width: 100%;
      }
    }
    
    .file-upload-box {
      padding-top: 1rem;
      display: flex;
      
      .file-upload {
        width: 30rem;
        height: 3rem;
        line-height: 3rem;
      }
      
      .file-upload::file-selector-button {
        display: none;
        width: 8rem;
        height: 2.6rem;
        margin: 0.2rem 0;
        background-color: #1E9FFF;
        border: 1px solid #1E9FFF;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        font-size: 12px;
      }
    }
    
    .btn-box {
      margin: 0 3rem 0;
    }
  }
  
}
</style>