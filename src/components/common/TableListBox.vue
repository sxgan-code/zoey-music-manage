<script setup lang="ts">
import {CloseOutlined, FormOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons-vue";
import {PageType} from "@/api/common-types.ts";
import {ref} from "vue";

const props = defineProps<{
  headers: String[],
  page: PageType,
}>()

const emit = defineEmits(['editSong', 'delSong', 'changePage'])

const pages = ref<PageType>(props.page)

function pageNumScope(): number[] {
  var index = pages.value.currentIndex
  var total = pages.value.pageTotal
  var num: number[] = [];
  if (total <= 7) {
    for (var i = 1; i <= total; i++) {
      num.push(i)
    }
  } else if (index <= 4) {
    for (var i = 1; i <= 7; i++) {
      num.push(i)
    }
  } else if (index > 4 && index <= total - 4) {
    for (var i = index - 3; i <= index + 3; i++) {
      num.push(i)
    }
  } else if (index > total - 4) {
    for (var i = total - 6; i <= total; i++) {
      num.push(i)
    }
  }
  return num;
}

const prevPage = () => {
  if (pages.value.currentIndex > 1) {
    pages.value.currentIndex--
  } else {
    pages.value.currentIndex = pages.value.pageTotal
  }
  emit('changePage', pages.value)
}
const nextPage = () => {
  if (pages.value.currentIndex < pages.value.pageTotal) {
    pages.value.currentIndex++
  } else {
    pages.value.currentIndex = 1
  }
  emit('changePage', pages.value)
}
</script>

<template>
  <div class="table-list-box">
    <table class="table" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th v-for="header in headers" :key="header as string">{{ header }}</th>
        <th class="th-control">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row,index) in page.list" :key="index">
        <td v-for="key in row" :key="'row'+index">{{ key }}</td>
        <td class="td-control">
          <button class="btn-mini btn-primary" @click="$emit('editSong',row)">
            <FormOutlined/>
            编辑
          </button>
          <button class="btn-mini btn-error" @click="$emit('delSong',row)">
            <CloseOutlined/>
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="page-num">
      <div class="text-info">总共{{ page.dataTotal }}条记录，
        {{ page.list.length < page.pageSize ? '当前页有' + page.list.length + '条，' : '' }}每页显示
        <select name="example" id="example"
                @change="page.currentIndex=1;emit('changePage', page)"
                v-model="page.pageSize">
          <option v-for="val in page.sizeOptions" :value="val">{{ val }}</option>
        </select>条
      </div>
      <div class="page-control">
        <div class="prev num-box" @click="prevPage()">
          <LeftOutlined/>
        </div>
        <div :class="page.currentIndex===item?'num-box box-selected':'num-box'"
             @click="page.currentIndex=item;emit('changePage', page)"
             v-for="item in pageNumScope()"> {{ item }}
        </div>
        <div v-if="page!.pageTotal>= 8 && page.currentIndex<=page.pageTotal-4">...</div>
        <div class="next num-box"
             @click="nextPage">
          <RightOutlined/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-list-box {
  height: calc(100vh - 22rem);
  width: 99%;
  margin: 0 auto;
  background: var(--bg-light-rgb);
  border-radius: 1rem;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  
  table {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    height: calc(100vh - 25rem);
    display: block;
    width: 100%;
    background: var(--bg-light-rgb);
    
    thead tr th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--zoey-color-primary-light-7);
      height: 2rem;
      font-size: 1.3rem;
      color: var(--text-deep-rgba-8);
    }
    
    tbody {
      overflow: hidden;
    }
    
    tbody tr td {
      font-size: 1.2rem;
      height: 3rem;
    }
    
    tr > th, td {
      min-width: 20rem;
      border: 0.1rem solid;
      border-color: var(--text-deep-rgba-1);
      padding: 0 0.5rem;
    }
    
    .th-control, .td-control {
      position: sticky;
      right: 0; /* 设置固定列的左边界位置 */
      box-shadow: -3px 0 3px rgba(0, 0, 0, 0.4);
    }
    
    .td-control {
      background: var(--bg-light-rgb);
      
      button {
        margin: auto 1rem;
      }
    }
  }
  
  .page-num {
    display: flex;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
    background: var(--zoey-color-info-light-9);
    font-family: "HarmonyOS Sans", sans-serif;
    font-size: 1.4rem;
    line-height: 3rem;
    
    .text-info {
      margin: 0 2rem;
    }
    
    .page-control {
      display: flex;
      margin: 0.3rem 2rem;
      
      div {
        line-height: 2.4rem;
        height: 2.4rem;
        min-width: 2rem;
        padding: 0 0.2rem;
        //width: 3.6rem;
        text-align: center;
        border: 0.1rem solid var(--text-deep-rgba-1);
      }
      
      .num-box:hover {
        background: var(--zoey-color-primary-light-5);
      }
      
      .box-selected {
        background: var(--zoey-color-primary-light-5);
      }
    }
  }
  
  //.table::-webkit-scrollbar {
  //  display: none; /* Chrome Safari */
  //}
  
  .table {
    //scrollbar-width: none; /* firefox */
    //-ms-overflow-style: none; /* IE 10+ */
    overflow-x: auto;
    //overflow-y: auto;
  }
}

</style>