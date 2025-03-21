<template>
    <div class="container">
      <header-bar title="个人中心"></header-bar>
      
      <div class="content user-content">
        <!-- 用户信息 -->
        <div class="user-header">
          <div class="avatar">
            <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/avatar_default_64211e6f43c54.png" alt="用户头像">
          </div>
          <div class="user-info">
            <div>登录/注册</div>
            <!-- <div class="username">用户名：{{ userInfo.username }}</div>
            <div class="user-id">用户ID：{{ userInfo.id }}</div> -->
          </div>
        </div>
        
        <!-- 订单导航 -->
        <div class="order-nav" style="margin-left: 10px; margin-right: 10px;">
          <div class="nav-title">
            <span>我的订单</span>
            <span class="view-all" @click="goToOrders">查看全部订单 <i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="nav-items">
            <div class="nav-item" @click="goToOrderType('pending')">
              <i class="el-icon-wallet"></i>
              <span>待付款</span>
            </div>
            <div class="nav-item" @click="goToOrderType('shipping')">
              <i class="el-icon-box"></i>
              <span>待发货</span>
            </div>
            <div class="nav-item" @click="goToOrderType('receiving')">
              <i class="el-icon-truck"></i>
              <span>待收货</span>
            </div>
            <div class="nav-item" @click="goToOrderType('completed')">
              <i class="el-icon-circle-check"></i>
              <span>已完成</span>
            </div>
          </div>
        </div>
        
        <!-- 工具列表 -->
        <div class="tool-list" style="margin-top: 10px;">
          <div class="tool-group">
            <div class="tool-item" @click="goToAddress">
              <i class="el-icon-location"></i>
              <span>收货地址</span>
              <i class="el-icon-arrow-right right-icon"></i>
            </div>
            <div class="tool-item">
              <i class="el-icon-star-off"></i>
              <span>我的收藏</span>
              <i class="el-icon-arrow-right right-icon"></i>
            </div>
            <div class="tool-item">
              <i class="el-icon-message"></i>
              <span>我的评价</span>
              <i class="el-icon-arrow-right right-icon"></i>
            </div>
          </div>
          
          <!-- <div class="tool-group">
            <div class="tool-item">
              <i class="el-icon-service"></i>
              <span>联系客服</span>
              <i class="el-icon-arrow-right right-icon"></i>
            </div>
            <div class="tool-item">
              <i class="el-icon-question"></i>
              <span>帮助中心</span>
              <i class="el-icon-arrow-right right-icon"></i>
            </div>
            <div class="tool-item">
              <i class="el-icon-setting"></i>
              <span>设置</span>
              <i class="el-icon-arrow-right right-icon"></i>
            </div>
          </div> -->
        </div>
      </div>
      
      <tab-bar></tab-bar>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import TabBar from '@/components/common/TabBar.vue'
  
  export default {
    name: 'MyCenter',
    components: {
      HeaderBar,
      TabBar
    },
    data() {
      return {
        userInfo: {
          id: 'U1001',
          username: '张三',
          avatar: 'https://via.placeholder.com/80x80?text=Avatar'
        }
      }
    },
    methods: {
      goToOrders() {
        this.$message.info('订单页面功能开发中...')
      },
      goToOrderType(type) {
        this.$message.info(`${type}订单页面功能开发中...`)
      },
      goToAddress() {
        this.$router.push('/address')
      }
    }
  }
  </script>
  
  <style scoped>
  .user-content {
    background-color: #f5f5f5;
  }
  .user-header {
    display: flex;
    align-items: center;
    padding: 20px 15px;
    background-color: #2196F3;
    color: white;
  }
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user-info {
    flex: 1;
  }
  .username {
    font-size: 18px;
    margin-bottom: 5px;
  }
  .user-id {
    font-size: 14px;
    opacity: 0.8;
  }
  .order-nav {
    background-color: white;
    margin: 10px 0;
    padding: 15px;
  }
  .nav-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .view-all {
    color: #999;
    font-size: 14px;
  }
  .nav-items {
    display: flex;
    justify-content: space-around;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
  }
  .nav-item i {
    font-size: 24px;
    margin-bottom: 5px;
    color: #2196F3;
  }
  .tool-list {
    padding: 0 10px;
  }
  .tool-group {
    background-color: white;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .tool-item {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #f5f5f5;
  }
  .tool-item:last-child {
    border-bottom: none;
  }
  .tool-item i {
    font-size: 18px;
    color: #2196F3;
    margin-right: 10px;
  }
  .right-icon {
    margin-left: auto;
    color: #ccc !important;
  }
  </style>
  