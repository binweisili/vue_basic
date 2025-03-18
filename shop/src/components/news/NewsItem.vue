<template>
    <div class="news-item">
      <div class="news-img">
        <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/3_f59a776cbe055.png" alt="新闻图片">
      </div>
      <div class="news-content">
        <h3 class="news-title">{{ news.title }}</h3>
        <p class="news-date">发表时间：{{ news.date }}</p>
        <p class="news-clicks">点击：{{ news.clicks }}次</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewsItem',
    props: {
      news: {
        type: Object,
        required: true
      }
    },
    computed: {
      imgUrl() {
        // 这里使用占位图，实际项目中会使用新闻相关的图片
        return `https://via.placeholder.com/100x80?text=News${this.news.id}`
      }
    }
  }
  </script>
  
  <style scoped>
  .news-item {
    display: flex;
    padding: 10px 15px;
    border-bottom: 1px solid #e5e5e5;
    background-color: white;
  }
  .news-img {
    width: 100px;
    height: 80px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .news-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .news-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .news-title {
    font-size: 15px;
    margin: 0;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .news-date, .news-clicks {
    font-size: 12px;
    color: #999;
    margin: 5px 0 0;
  }
  </style>
  