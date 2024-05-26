<script setup lang="ts">
import {CloseOutlined, FormOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons-vue";

const props = defineProps({
  rows: {
    type: Array,
  },
  headers: {
    type: Array,
  },
  page: {
    type: Object,
  }
})
</script>

<template>
  <div class="table-list-box">
    <table class="table">
      <thead>
      <tr>
        <th v-for="header in headers" :key="header as string">{{ header }}</th>
        <th class="th-control">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row,index) in rows" :key="index">
        <td v-for="key in row" :key="key">{{ key }}</td>
        <td class="td-control">
          <button>
            <FormOutlined/>
            编辑
          </button>
          <button>
            <CloseOutlined/>
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="page-num">
      <div class="text-info">总共{{ rows!.length }}条记录，每页显示
        <select name="example" id="example">
          <option v-for="val in page!.sizeOptions" :value="val">{{ val }}</option>
        </select>条
      </div>
      <div class="page-control">
        <div class="prev num-box">
          <LeftOutlined/>
        </div>
        <div :class="page!.currentIndex===item?'num-box box-selected':'num-box'"
             v-for="item in page!.pageTotal>7?7:page!.pageTotal"> {{
            page!.currentIndex > 4 ? item + page!.currentIndex - 4 : item
          }}
        </div>
        <div v-if="page!.pageTotal>= 8">...</div>
        <div class="next num-box">
          <RightOutlined/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-list-box {
  height: calc(100vh - 19rem);
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
    height: calc(100vh - 22rem);
    display: block;
    width: 100%;
    background: var(--bg-light-rgb);
    
    //::-webkit-scrollbar {
    //  display: none;
    //}
    
    thead tr th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--el-color-primary-light-7);
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
        font-family: "HarmonyOS Sans", sans-serif;
        width: 8rem;
        height: 2.2rem;
        margin: 0 1rem;
        border: none;
        border-radius: 1rem;
        color: var(--bg-light-rgb);
      }
      
      button:first-child {
        background: var(--el-color-primary-light-5);
      }
      
      button:first-child:hover {
        background: var(--el-color-primary);
      }
      
      button:last-child {
        background: var(--el-color-error-light-5);
      }
      
      button:last-child:hover {
        background: var(--el-color-error);
      }
    }
  }
  
  .page-num {
    display: flex;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
    background: var(--el-color-info-light-9);
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
        width: 2.4rem;
        text-align: center;
        border: 0.1rem solid var(--text-deep-rgba-1);
      }
      
      .num-box:hover {
        background: var(--el-color-primary-light-5);
      }
      
      .box-selected {
        background: var(--el-color-primary-light-5);
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