<template>
  <div class="index-container">
    <div class="left-container">
      <Sidebar></Sidebar>
    </div>
    <div class="right-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'

  export default {
    components: {Sidebar},
    name: 'index'
  }
</script>

<style scoped>
  .index-container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .left-container {
    max-width: 140px;
    height: 100%;
    text-align: center;
  }

  .right-container {
    width: 100%;
    height: 100%;
  }
</style>
