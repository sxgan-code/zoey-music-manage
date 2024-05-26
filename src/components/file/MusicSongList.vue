<script setup lang="ts">

import SearchBox from "@/components/common/SearchBox.vue";
import TableListBox from "@/components/common/TableListBox.vue";
import {ref} from "vue";

export interface StudentType {
  id: number,
  name: string,
  age: number,
  address: string,
}

const list = ref<StudentType[]>([
  {id: 1, name: '张三', age: 18, address: '北京'},
  {id: 2, name: '李四', age: 20, address: '上海'},
  {id: 3, name: '王五', age: 22, address: '广州'},
  {id: 4, name: '赵六', age: 24, address: '深圳'},
  {id: 5, name: '钱七', age: 26, address: '杭州'},
  {id: 6, name: '孙八', age: 28, address: '南京'},
  {id: 7, name: '张三', age: 18, address: '北京'},
  {id: 8, name: '李四', age: 20, address: '上海'},
  {id: 9, name: '王五', age: 22, address: '广州'},
  {id: 10, name: '赵六', age: 24, address: '深圳'},
  {id: 11, name: '钱七', age: 26, address: '杭州'},
  {id: 12, name: '孙八', age: 28, address: '南京'},
  {id: 13, name: '张三', age: 18, address: '北京'},
  {id: 14, name: '李四', age: 20, address: '上海'},
  {id: 15, name: '王五', age: 22, address: '广州'},
  {id: 16, name: '赵六', age: 24, address: '深圳'},
  {id: 17, name: '钱七', age: 26, address: '杭州'},
  {id: 18, name: '孙八', age: 28, address: '南京'},
  {id: 19, name: '张三', age: 18, address: '北京'},
  {id: 20, name: '李四', age: 20, address: '上海'},
  {id: 21, name: '王五', age: 22, address: '广州'},
  {id: 22, name: '赵六', age: 24, address: '深圳'},
  {id: 23, name: '钱七', age: 26, address: '杭州'},
  {id: 24, name: '孙八', age: 28, address: '南京'},
])

const page = ref({
  currentIndex: 6,
  pageSize: 20,
  pageTotal: 9,
  list: list.value,
  sizeOptions: [20, 50, 100, 200],
})
</script>

<template>
  <div class="song-list-file-content">
    <div class="top-search-box">
      <search-box/>
    </div>
    <div class="content-list">
      <!-- 歌曲列表 -->
      <table-list-box :rows="list" :headers="['id','name','age','address']" :page="page"/>
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