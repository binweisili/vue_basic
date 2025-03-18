<template>
    <div class="product-item" @click="viewDetail">
      <div class="product-img">
        <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/4_4fc98e20dfa34.png" :alt="product.name">
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <div class="product-price">
          <span class="current-price">¥{{ product.price }}</span>
          <span class="original-price" v-if="product.originPrice">¥{{ product.originPrice }}</span>
        </div>
        <div class="product-hot" v-if="product.hot">热门</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductItem',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    methods: {
      viewDetail() {
        this.$router.push(`/product/${this.product.id}`)
      }
    }
  }
  </script>
  
  <style scoped>
  .product-item {
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 15px;
    position: relative;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .product-img {
    height: 180px;
    overflow: hidden;
  }
  .product-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .product-info {
    padding: 10px;
  }
  .product-name {
    margin: 0 0 10px;
    font-size: 14px;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .product-price {
    display: flex;
    align-items: baseline;
  }
  .current-price {
    color: #f56c6c;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
  }
  .original-price {
    color: #999;
    font-size: 12px;
    text-decoration: line-through;
  }
  .product-hot {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f56c6c;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
  </style>
  