<template>
    <div class="menu-items">
      <div class="menu-item" v-for="item in menuItems" :key="item.id" @click="navigate(item.route)">
        <div class="icon" :style="{ backgroundColor: item.color }">
          <i :class="item.icon"></i>
        </div>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MenuItems',
    data() {
      return {
        menuItems: [
          { id: 1, title: '新闻资讯', icon: 'el-icon-document', color: '#1ed59a', route: '/news' },
          { id: 2, title: '图片分享', icon: 'el-icon-picture', color: '#fc3c4f', route: '/gallery' },
          { id: 3, title: '商品购买', icon: 'el-icon-shopping-bag-1', color: '#3d80fd', route: '/products' },
          { id: 4, title: '留言反馈', icon: 'el-icon-chat-dot-square', color: '#2bc2f7', route: '/feedback' },
          { id: 4, title: '视频专区', icon: 'el-icon-video-camera', color: '#fd4000', route: '/feedback' },
          { id: 4, title: '联系我们', icon: 'el-icon-message', color: '#fe762a', route: '/feedback' }
        ]
      }
    },
    methods: {
      navigate(route) {
        this.$router.push(route)
      }
    }
  }
  </script>
  
  <style scoped>
  .menu-items {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    background: #fff;
  }
  .menu-item {
    flex: 1 1 calc(33.33% - 10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    margin-bottom: 15px;
  }
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  .icon i {
    font-size: 24px;
    color: white;
  }
  </style>
  