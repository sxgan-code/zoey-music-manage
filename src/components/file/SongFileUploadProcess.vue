<script setup lang="ts">
import {ref} from 'vue';
import msg, {PositionTypeEnum} from "@/components/message";
import {songFileUploadApi} from "@/api/file";
import {MusicSongType} from '@/api/list/types';
import {useUserStore} from "@/store/user-store.ts";
import {errorImg} from "@/assets/images/base64.ts";

const userStore = useUserStore()
/**
 * @Description: 文件上传处理
 * @Author: sxgan
 * @Date: 2024/6/1 14:30
 * @Version: 1.0
 **/
const selectedFile = ref(null);
const songInfo = ref<MusicSongType>()
const timestamp = ref<number>(0)
const isTip = ref(false)
const songFileChange = (event: any) => {
  isTip.value = false
  selectedFile.value = event.target.files[0];
};

const uploadFileHandle = async () => {
  if (!selectedFile.value) {
    msg.warning('请选择一个文件', PositionTypeEnum.TOP);
    return;
  }
  userStore.isMask = true
  await songFileUploadApi(selectedFile.value).then(res => {
    try {
      if (res.status === 200) {
        songInfo.value = res.data
        timestamp.value = res.timestamp
        console.log(songInfo.value)
        msg.success('上传解析成功', PositionTypeEnum.TOP)
      } else {
      
      }
    } catch (error) {
      msg.warning('文件上传异常', PositionTypeEnum.TOP)
    }
    userStore.isMask = false
  })
};


function imgError(e: any) {
  e.target.src = errorImg
  isTip.value = true
}
</script>

<template>
  <div class="form-box">
    <div class="form-title">歌曲文件：</div>
    <div class="form-content">
      <div class="file-upload-box">
        <input class="file-upload" type="file" accept="audio/*" @change="songFileChange">
        <button type="button" class="btn-max btn-primary btn-box" @click="uploadFileHandle">上传解析</button>
      </div>
    </div>
  </div>
  <div v-if="songInfo" class="song-info-box">
    <div class="form-box">
      <div class="form-title">歌曲名：</div>
      <div class="form-content">
        {{ songInfo!.songName }}
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">歌手：</div>
      <div class="form-content">
        {{ songInfo!.musicSinger.singerName }}
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">歌曲图片：</div>
      <div class="form-content">
        <div class="img-box"><img @error="imgError($event)"
                                  :src="userStore.staticBaseUrl+songInfo?.songPic+'?time='+timestamp" alt=""></div>
        <div v-if="isTip" class="tip-text">该歌曲图片文件无法解析，可能文件并未包含歌曲图片信息！！！</div>
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">专辑：</div>
      <div class="form-content">
        {{ songInfo!.musicAlbum.albumName }}
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">歌曲发行时间：</div>
      <div class="form-content">
        {{ songInfo!.releaseDate }}
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">歌曲上传路径：</div>
      <div class="form-content">
        {{ songInfo!.songUrl }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    font-size: 1.4rem;
    font-family: "HarmonyOS Sans", sans-serif;
    color: var(--zoey-form-title-text);
    
    .tip-text {
      color: var(--btn-error-hover);
    }
    
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
      //padding-top: 1rem;
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