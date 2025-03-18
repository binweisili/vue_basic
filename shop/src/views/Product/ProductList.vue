<template>
    <div class="container">
      <header-bar title="商品列表" :showBack="true"></header-bar>
      
      <div class="content product-list-content">
        <!-- 筛选栏 -->
        <div class="filter-bar">
          <div class="filter-item" @click="setSortBy('default')" :class="{ active: sortBy === 'default' }">默认</div>
          <div class="filter-item" @click="setSortBy('sales')" :class="{ active: sortBy === 'sales' }">销量</div>
          <div class="filter-item" @click="togglePriceSort" :class="{ active: sortBy === 'price' }">
            价格
            <i :class="['el-icon-caret-' + (priceAsc ? 'top' : 'bottom')]" v-show="sortBy === 'price'"></i>
          </div>
        </div>
  
        <!-- 商品网格 -->
        <div class="product-grid">
          <product-item 
            v-for="product in sortedProducts" 
            :key="product.id" 
            :product="product">
          </product-item>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import ProductItem from '@/components/product/ProductItem.vue'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'ProductList',
    components: {
      HeaderBar,
      ProductItem
    },
    data() {
      return {
        sortBy: 'default',
        priceAsc: true
      }
    },
    computed: {
      ...mapGetters('product', ['allProducts']),
      sortedProducts() {
        let products = [...this.allProducts]
        
        switch(this.sortBy) {
          case 'price':
            products.sort((a, b) => {
              return this.priceAsc ? a.price - b.price : b.price - a.price
            })
            break
          case 'sales':
            // 这里假设商品有sales属性，实际项目中根据实际数据处理
            products.sort((a, b) => (b.sales || 0) - (a.sales || 0))
            break
          default:
            // 默认排序，保持原样
            break
        }
        
        return products
      }
    },
    methods: {
      setSortBy(type) {
        this.sortBy = type
      },
      togglePriceSort() {
        if (this.sortBy === 'price') {
          this.priceAsc = !this.priceAsc
        } else {
          this.sortBy = 'price'
          this.priceAsc = true
        }
      }
    },
    created() {
      this.$store.dispatch('product/fetchProducts')
    }
  }
  </script>
  
  <style scoped>
  .product-list-content {
    background-color: #f5f5f5;
  }
  .filter-bar {
    display: flex;
    background-color: white;
    height: 40px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  .filter-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }
  .filter-item.active {
    color: #2196F3;
  }
  .filter-item i {
    margin-left: 3px;
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
  }
  </style>
  