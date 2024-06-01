<script setup lang="ts">

const props = defineProps<{
  title: string,
}>()
const emit = defineEmits(['commitData', 'hideDialog'])

</script>

<template>
  <div class="dialog-box-root">
    <div class="dialog-box-content">
      <div class="dialog-box-content-body">
        <div class="title">{{ title }}</div>
        <div class="dialog-content-box">
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="btn-control">
        <button class="btn btn-default btn-confirm" @click="$emit('commitData')">确认</button>
        <button class="btn btn-default btn-cancel" @click="$emit('hideDialog')">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-box-root {
  $hel: 80vh;
  $wid: 80vw;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 8;
  background: rgba(0, 0, 0, 0.3);
  font-family: "HarmonyOS Sans", sans-serif;
  
  .dialog-box-content {
    
    overflow-y: auto;
    height: $hel;
    width: $wid;
    position: fixed;
    top: calc((100vh - $hel) / 2);
    left: calc((100vw - $wid) / 2);
    z-index: 9;
    border-radius: 1rem;
    background: var(--bg-light-rgb);
    box-shadow: 1rem 1rem 1rem 0 rgba(0, 0, 0, 0.2), -1rem -1rem 1rem 0 rgba(0, 0, 0, 0.2);
  }
  
  .dialog-box-content-body {
    width: $wid;
    height: calc($hel - 5rem);
    
    .title {
      height: 3rem;
      line-height: 3rem;
      text-align: left;
      font-size: 1.5rem;
      background: var(--zoey-bg-top);
      padding-left: 3rem;
    }
    
    .dialog-content-box {
      height: calc($hel - 8rem);
      overflow-y: auto;
      padding: 1rem 0;
      
      .content {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
  
  .btn-control {
    position: fixed;
    bottom: calc((100vh - $hel) / 2);
    width: $wid;
    height: 5rem;
    background: var(--zoey-bg-bottom);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  
  .btn {
    width: 8rem;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
    margin: 1rem 2rem 1rem 0;
    float: right;
  }
  
  .btn-close {
    border: 0.2rem solid var(--text-grey-light-5);
    background: var(--bg-light-rgb);
  }
  
  
  .btn-close:hover, .btn-commit:hover {
    border: none;
    background: var(--zoey-color-primary);
  }
  
}

.is-hidden {
  display: none;
}
</style>