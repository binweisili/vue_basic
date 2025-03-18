<template>
    <div class="container">
      <header-bar title="首页"></header-bar>
      
      <div class="content">
        <!-- 轮播图 -->
        <div class="swiper">
          <el-carousel height="180px">
            <el-carousel-item v-for="item in carousel" :key="item.id">
              <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/1_1751c5cf60ee4.png" alt="轮播图">
            </el-carousel-item>
          </el-carousel>
        </div>
  
        <!-- 菜单导航 -->
        <menu-items></menu-items>
  
        <!-- 推荐商品 -->
        <!-- <div class="recommended">
          <div class="section-title">推荐商品</div>
          <div class="product-grid">
            <product-item 
              v-for="product in hotProducts" 
              :key="product.id" 
              :product="product">
            </product-item>
          </div>
        </div> -->
      </div>
  
      <tab-bar></tab-bar>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import TabBar from '@/components/common/TabBar.vue'
  import MenuItems from '@/components/home/MenuItems.vue'
  import ProductItem from '@/components/product/ProductItem.vue'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'Home',
    components: {
      HeaderBar,
      TabBar,
      MenuItems,
      ProductItem
    },
    computed: {
      ...mapGetters('product', ['allProducts']),
      hotProducts() {
        return this.allProducts.filter(product => product.hot)
      }
    },
    data() {
      return {
        carousel: [
          { id: 1, image: 'https://via.placeholder.com/750x300?text=Banner+1' },
          { id: 2, image: 'https://via.placeholder.com/750x300?text=Banner+2' },
          { id: 3, image: 'https://via.placeholder.com/750x300?text=Banner+3' }
        ]
      }
    },
    created() {
      this.$store.dispatch('product/fetchProducts')
    }
  }
  </script>
  
  <style scoped>
  .swiper {
    margin-bottom: 10px;
  }
  .swiper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .section-title {
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    background: #fff;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
    background: #fff;
  }
  </style>
  