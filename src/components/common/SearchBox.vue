<script setup lang="ts">
import {SearchOutlined} from '@ant-design/icons-vue';
</script>

<template>
  <div class="search-box">
    <div class="input-component">
      <span>歌曲名:</span>
      <input type="text" placeholder="请输入搜索内容">
    </div>
    <div class="input-component">
      <span>歌手:</span>
      <input type="text" placeholder="请输入搜索内容">
    </div>
    <div class="input-component">
      <span>专辑名:</span>
      <input type="text" placeholder="请输入搜索内容">
    </div>
    <div class="input-component">
      <span>发行时间:</span>
      <input type="datetime-local">
    </div>
    <div class="input-component">
      <span>创建时间:</span>
      <input type="datetime-local">
    </div>
    <div class="input-component">
      <span>更新时间:</span>
      <input type="datetime-local">
    </div>
    <div class="btn-component">
      <button class="btn-default btn-primary">
        <SearchOutlined class="ant-icon-search"/>
        搜索
      </button>
    </div>
  </div>

</template>

<style scoped lang="scss">
.search-box {
  width: 99%;
  height: 10rem;
  margin: 0.5rem auto;
  background: var(--bg-light-rgb);
  border-radius: 1rem;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0.2rem 0.2rem 0.2rem var(--text-grey-light-4);
  .input-component {
    height: 5rem;
    line-height: 5rem;
    margin: 0 1rem;
    
    span {
      margin-right: 1rem;
      font-size: 1.5rem;
      font-family: "HarmonyOS Sans", sans-serif;
      color: var(--text-color);
    }
    
    input {
      background: none;
      height: 1.5rem;
      width: 14rem;
      color: var(--text-color);
      border: solid 0.15rem var(--text-grey-light-7);
      padding: 0.3rem;
    }
  }
  
  .btn-component {
    width: 8rem;
    height: 1.5rem;
    line-height: 5rem;
    align-self: baseline;
    margin: 0.3rem 0 0 5rem;
  }
}
</style>