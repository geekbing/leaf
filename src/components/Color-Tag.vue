<template>
  <el-tag :type="tagType" class="color-tag">
    <slot></slot>
  </el-tag>
</template>

<script>
  export default {
    name: 'color-tag',
    computed: {
      tagType () {
        let types = ['', 'gray', 'primary', 'success', 'warning', 'danger']
        return types[Math.floor(Math.random() * 6)]
      }
    }
  }
</script>

<style scoped>
  .color-tag {
    margin-right: 8px;
  }
</style>
