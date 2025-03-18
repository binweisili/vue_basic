<template>
    <div class="gallery-item">
      <div class="image-container">
        <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/3_f59a776cbe055.png" :alt="gallery.title">
      </div>
      <div class="gallery-info">
        <h3 class="gallery-title">{{ gallery.title }}</h3>
        <p class="gallery-category">{{ gallery.category }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GalleryItem',
    props: {
      gallery: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .gallery-item {
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  .gallery-item:hover .image-container img {
    transform: scale(1.05);
  }
  .gallery-info {
    padding: 10px 15px;
  }
  .gallery-title {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .gallery-category {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
  }
  </style>
  