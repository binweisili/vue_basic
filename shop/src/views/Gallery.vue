<template>
    <div class="container">
      <header-bar title="图片分享" :showBack="true"></header-bar>
      
      <div class="content gallery-content">
        <!-- 分类选择 -->
        <div class="category-tabs">
          <el-tabs v-model="activeCategory">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane 
              v-for="category in categories" 
              :key="category" 
              :label="category" 
              :name="category">
            </el-tab-pane>
          </el-tabs>
        </div>
  
        <!-- 图片列表 -->
        <div class="gallery-grid">
          <gallery-item 
            v-for="item in filteredGallery" 
            :key="item.id" 
            :gallery="item">
          </gallery-item>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import GalleryItem from '@/components/gallery/GalleryItem.vue'
  import galleryData from '@/mock/gallery.js'
  
  export default {
    name: 'Gallery',
    components: {
      HeaderBar,
      GalleryItem
    },
    data() {
      return {
        galleryList: galleryData,
        activeCategory: 'all'
      }
    },
    computed: {
      categories() {
        const categoriesSet = new Set(this.galleryList.map(item => item.category))
        return Array.from(categoriesSet)
      },
      filteredGallery() {
        if (this.activeCategory === 'all') {
          return this.galleryList
        }
        return this.galleryList.filter(item => item.category === this.activeCategory)
      }
    }
  }
  </script>
  
  <style scoped>
  .gallery-content {
    background-color: #f5f5f5;
  }
  .category-tabs {
    background-color: white;
    margin-bottom: 10px;
  }
  .gallery-grid {
    padding: 10px;
  }
  </style>
  