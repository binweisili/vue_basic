<template>
    <div class="container">
      <header-bar title="新闻资讯" :showBack="true"></header-bar>
      
      <div class="content news-content">
        <div class="news-list">
          <router-link 
            v-for="item in newsList" 
            :key="item.id" 
            :to="{ path: `/news/${item.id}` }" 
            class="news-link"
          >
            <news-item :news="item"></news-item>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import NewsItem from '@/components/news/NewsItem.vue'
  import newsData from '@/mock/news.js'
  
  export default {
    name: 'News',
    components: {
      HeaderBar,
      NewsItem
    },
    data() {
      return {
        newsList: newsData
      }
    }
  }
  </script>
  
  <style scoped>
  .news-content {
    background-color: #f5f5f5;
  }
  .news-list {
    padding: 10px 0;
  }
  .news-link {
    display: block;
    margin-bottom: 10px;
    text-decoration: none;
    color: inherit;
  }
  </style>
  