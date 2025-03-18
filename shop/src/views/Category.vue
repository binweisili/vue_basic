<template>
    <div class="container">
      <header-bar title="商品分类"></header-bar>
      
      <div class="content category-content">
        <div class="category-container">
          <!-- 左侧分类导航 -->
          <div class="category-nav">
            <div 
              v-for="category in categories" 
              :key="category.id"
              class="category-nav-item"
              :class="{ active: activeCategory.id === category.id }"
              @click="selectCategory(category)"
            >
              {{ category.name }}
            </div>
          </div>
          
          <!-- 右侧子分类展示 -->
          <div class="subcategory-content">
            <div class="subcategory-title">{{ activeCategory.name }}</div>
            <div class="subcategory-grid">
              <div 
                v-for="subcategory in activeSubcategories" 
                :key="subcategory.id"
                class="subcategory-item"
                @click="goToProductList(subcategory)"
              >
                <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/4_4fc98e20dfa34.png" :alt="subcategory.name">
                <span>{{ subcategory.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <tab-bar></tab-bar>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import TabBar from '@/components/common/TabBar.vue'
  import categoriesData from '@/mock/categories.js'
  
  export default {
    name: 'Category',
    components: {
      HeaderBar,
      TabBar
    },
    data() {
      return {
        categories: categoriesData,
        activeCategory: {}
      }
    },
    computed: {
      activeSubcategories() {
        return this.activeCategory.subcategories || []
      }
    },
    methods: {
      selectCategory(category) {
        this.activeCategory = category
      },
      goToProductList(subcategory) {
        this.$router.push({
          path: '/products',
          query: { 
            category: this.activeCategory.name,
            subcategory: subcategory.name
          }
        })
      }
    },
    created() {
      if (this.categories.length > 0) {
        this.activeCategory = this.categories[0]
      }
    }
  }
  </script>
  
  <style scoped>
  .category-content {
    display: flex;
    flex-direction: column;
  }
  .category-container {
    display: flex;
    flex: 1;
    height: 100%;
  }
  .category-nav {
    width: 85px;
    background-color: #f7f7f7;
    overflow-y: auto;
    height: 100%;
  }
  .category-nav-item {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-left: 3px solid transparent;
    text-align: center;
    padding: 0 5px;
  }
  .category-nav-item.active {
    background-color: #fff;
    color: #2196F3;
    border-left-color: #2196F3;
  }
  .subcategory-content {
    flex: 1;
    background-color: #fff;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .subcategory-title {
    padding: 15px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .subcategory-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
  }
  .subcategory-item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .subcategory-item img {
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
  }
  .subcategory-item span {
    font-size: 12px;
    text-align: center;
  }
  </style>
  