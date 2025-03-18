<template>
    <div class="blue-header">
      <div class="back-button" v-if="showBack" @click="goBack">
        <i class="el-icon-arrow-left"></i> 返回
      </div>
      <span>{{ title }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderBar',
    props: {
      title: {
        type: String,
        required: true
      },
      showBack: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
  </script>
  
  <style scoped>
  .blue-header {
    position: relative;
  }
  </style>
  