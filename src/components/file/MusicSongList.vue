<script setup lang="ts">

import SearchBox from "@/components/common/SearchBox.vue";
import TableListBox from "@/components/common/TableListBox.vue";
import {onMounted, ref} from "vue";
import {PageType} from "@/api/common-types.ts";
import {getAllSongsApi, updateSongApi} from "@/api/list";
import DialogBox from "@/components/common/DialogBox.vue";
import {MusicSongType} from "@/api/list/types.ts";
import msg, {PositionTypeEnum} from "@/components/message/index.ts"
import {useUserStore} from "@/store/user-store.ts";
import {fileUploadApi} from "@/api/file";

const userStore = useUserStore();
const timestamp = ref<number>(0)

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
    timestamp.value = res.timestamp
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

/**
 * @Description: 文件上传
 * @Author: sxgan
 * @Date:
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

</script>

<template>
  <div class="song-list-file-content">
    <div class="top-search-box">
      <search-box/>
    </div>
    <div class="top-add-box">
      <div class="input-component">
        <span>歌曲名:</span>
        <input type="text" placeholder="请输入搜索内容">
      </div>
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
              <button type="button" class="btn-default btn-primary btn-box" @click="uploadFile">上传修改</button>
            </div>
          </div>
        </div>
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
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
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