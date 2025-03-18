<template>
    <div class="container">
      <header-bar title="商品详情" :showBack="true"></header-bar>
      
      <div class="content product-detail-content">
        <!-- 商品图片 -->
        <div class="product-image">
          <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/4_4fc98e20dfa34.png" :alt="product.name">
        </div>
  
        <!-- 商品信息 -->
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
          <div class="product-price">
            <span class="price">¥{{ product.price }}</span>
            <span class="original-price" v-if="product.originPrice">市场价：¥{{ product.originPrice }}</span>
          </div>
          <div class="product-stock">库存：{{ product.stock }}</div>
        </div>
  
        <!-- 购买数量 -->
        <div class="product-quantity">
          <div class="quantity-label">购买数量：</div>
          <counter v-model="quantity" :max="product.stock"></counter>
        </div>
  
        <!-- 商品描述 -->
        <div class="product-description">
          <div class="section-title">商品描述</div>
          <div class="description-content">
            {{ product.description }}
          </div>
        </div>
      </div>
  
      <!-- 底部操作栏 -->
      <div class="action-bar">
        <div class="action-left">
          <div class="action-btn" @click="goToCart">
            <i class="el-icon-shopping-cart-2"></i>
            <span>购物车</span>
          </div>
        </div>
        <div class="action-right">
          <el-button type="warning" @click="addToCart">加入购物车</el-button>
          <el-button type="danger" @click="buyNow">立即购买</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import Counter from '@/components/product/Counter.vue'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'ProductDetail',
    components: {
      HeaderBar,
      Counter
    },
    data() {
      return {
        quantity: 1
      }
    },
    computed: {
      ...mapGetters('product', ['getProductById']),
      productId() {
        return this.$route.params.id
      },
      product() {
        return this.getProductById(this.productId) || {}
      }
    },
    methods: {
      addToCart() {
        if (this.quantity > 0 && this.quantity <= this.product.stock) {
          this.$store.dispatch('cart/addProduct', {
            ...this.product,
            quantity: this.quantity
          })
          this.$message({
            message: '成功加入购物车',
            type: 'success'
          })
        } else {
          this.$message.error('请选择有效的购买数量')
        }
      },
      buyNow() {
        this.addToCart()
        this.$router.push('/cart')
      },
      goToCart() {
        this.$router.push('/cart')
      }
    },
    created() {
      this.$store.dispatch('product/fetchProducts')
    }
  }
  </script>
  
  <style scoped>
  .product-detail-content {
    background-color: #f5f5f5;
    padding-bottom: 60px;
  }
  .product-image {
    height: 300px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .product-image img {
    max-width: 100%;
    max-height: 100%;
  }
  .product-info {
    padding: 15px;
    background: white;
    margin-bottom: 10px;
  }
  .product-name {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .product-price {
    margin-bottom: 10px;
  }
  .price {
    color: #f56c6c;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 14px;
  }
  .product-stock {
    color: #666;
    font-size: 14px;
  }
  .product-quantity {
    display: flex;
    align-items: center;
    padding: 15px;
    background: white;
    margin-bottom: 10px;
  }
  .quantity-label {
    margin-right: 10px;
  }
  .product-description {
    background: white;
  }
  .section-title {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    font-weight: bold;
  }
  .description-content {
    padding: 15px;
    line-height: 1.6;
    color: #666;
  }
  .action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    background: white;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  }
  .action-left {
    display: flex;
    width: 30%;
    border-right: 1px solid #eee;
  }
  .action-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #666;
  }
  .action-btn i {
    font-size: 20px;
    margin-bottom: 2px;
  }
  .action-right {
    flex: 1;
    display: flex;
    padding: 8px;
  }
  .action-right .el-button {
    flex: 1;
    margin: 0 5px;
  }
  </style>
  