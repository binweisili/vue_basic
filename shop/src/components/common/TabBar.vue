<template>
    <div class="tab-bar">
      <div class="tab-item" @click="routeTo('/')" :class="{ active: isActive('/') }">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </div>
      <div class="tab-item" @click="routeTo('/category')" :class="{ active: isActive('/category') }">
        <i class="el-icon-menu"></i>
        <span>分类</span>
      </div>
      <div class="tab-item" @click="routeTo('/cart')" :class="{ active: isActive('/cart') }">
        <div class="cart-icon">
          <i class="el-icon-shopping-cart-2"></i>
          <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
        <span>购物车</span>
      </div>
      <div class="tab-item" @click="routeTo('/user')" :class="{ active: isActive('/user') }">
        <i class="el-icon-user"></i>
        <span>我的</span>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'TabBar',
    computed: {
      ...mapGetters('cart', {
        cartCount: 'totalItems'
      }),
      currentPath() {
        return this.$route.path
      }
    },
    methods: {
      routeTo(path) {
        if (this.currentPath !== path) {
          this.$router.push(path)
        }
      },
      isActive(path) {
        return this.currentPath === path
      }
    }
  }
  </script>
  
  <style scoped>
  .tab-bar {
    display: flex;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
  }
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
  .tab-item i {
    font-size: 24px;
    margin-bottom: 2px;
  }
  .active {
    color: #2196F3;
  }
  .cart-icon {
    position: relative;
  }
  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #f56c6c;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
  }
  </style>
  