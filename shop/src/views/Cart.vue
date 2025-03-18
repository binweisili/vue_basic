<template>
    <div class="container">
      <header-bar title="购物车"></header-bar>
      
      <div class="content cart-content">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <i class="el-icon-shopping-cart-2"></i>
          <p>购物车空空如也，去挑选心仪的商品吧~</p>
          <el-button type="primary" @click="goToHome">去购物</el-button>
        </div>
        
        <div v-else class="cart-list">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="cart-item"
          >
            <div class="item-select">
              <el-checkbox 
                v-model="item.selected" 
                @change="updateSelection"
              ></el-checkbox>
            </div>
            <div class="item-image">
              <img src="https://pic2.ziyuan.wang/user/binweisili/2025/03/4_4fc98e20dfa34.png" :alt="item.name">
            </div>
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">¥{{ item.price }}</div>
              <div class="item-actions">
                <counter 
                  v-model="item.quantity" 
                  :max="item.stock"
                  @input="updateQuantity(item.id, item.quantity)"
                ></counter>
                <i class="el-icon-delete" @click="removeItem(item.id)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cart-footer" v-if="cartItems.length > 0">
        <div class="footer-select">
          <el-checkbox 
            v-model="allSelected"
            @change="selectAll"
          >全选</el-checkbox>
        </div>
        <div class="footer-total">
          <div>合计: <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span></div>
          <div class="total-desc">不含运费</div>
        </div>
        <div class="footer-checkout">
          <el-button type="danger" @click="checkout">去结算({{ selectedCount }})</el-button>
        </div>
      </div>
      
      <tab-bar></tab-bar>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  import TabBar from '@/components/common/TabBar.vue'
  import Counter from '@/components/product/Counter.vue'
  import { mapState } from 'vuex'
  
  export default {
    name: 'Cart',
    components: {
      HeaderBar,
      TabBar,
      Counter
    },
    data() {
      return {
        localCartItems: []
      }
    },
    computed: {
      ...mapState('cart', ['cartItems']),
      displayCartItems() {
        return this.localCartItems.map(item => ({
          ...item,
          selected: item.selected !== undefined ? item.selected : true
        }))
      },
      allSelected: {
        get() {
          return this.displayCartItems.length > 0 && this.displayCartItems.every(item => item.selected)
        },
        set(value) {
          // 这里不需要实现，会通过selectAll方法处理
        }
      },
      selectedItems() {
        return this.displayCartItems.filter(item => item.selected)
      },
      selectedCount() {
        return this.selectedItems.length
      },
      totalPrice() {
        return this.selectedItems.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      }
    },
    methods: {
      goToHome() {
        this.$router.push('/')
      },
      updateSelection() {
        // 更新本地数据，实际项目中可能需要同步到服务器
      },
      selectAll(value) {
        this.localCartItems.forEach(item => {
          item.selected = value
        })
      },
      updateQuantity(id, quantity) {
        this.$store.dispatch('cart/updateProductQuantity', { id, quantity })
      },
      removeItem(id) {
        this.$confirm('确定要移除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('cart/removeProduct', id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          // 取消删除
        })
      },
      checkout() {
        if (this.selectedCount === 0) {
          this.$message.warning('请选择要结算的商品')
          return
        }
        
        // 这里应该跳转到结算页面，暂时简化处理
        this.$message.success('结算功能正在开发中...')
      }
    },
    watch: {
      cartItems: {
        immediate: true,
        handler(newItems) {
          // 将store中的购物车数据复制到本地状态，以便添加selected属性
          this.localCartItems = newItems.map(item => ({
            ...item,
            selected: true
          }))
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .cart-content {
    background-color: #f5f5f5;
    padding-bottom: 50px;
  }
  .empty-cart {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
  }
  .empty-cart i {
    font-size: 50px;
    margin-bottom: 10px;
  }
  .empty-cart p {
    margin-bottom: 20px;
  }
  .cart-list {
    padding: 10px;
  }
  .cart-item {
    display: flex;
    align-items: center;
    background: white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
  .item-select {
    padding: 0 10px;
  }
  .item-image {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .item-name {
    font-size: 14px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .item-price {
    color: #f56c6c;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .item-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item-actions i {
    font-size: 20px;
    color: #999;
    padding: 5px;
  }
  .cart-footer {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    height: 50px;
    background: white;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-top: 1px solid #eee;
  }
  .footer-select {
    flex: 1;
  }
  .footer-total {
    flex: 2;
    text-align: right;
    padding-right: 10px;
  }
  .total-price {
    color: #f56c6c;
    font-size: 18px;
    font-weight: bold;
  }
  .total-desc {
    font-size: 12px;
    color: #999;
  }
  .footer-checkout {
    width: 120px;
  }
  .footer-checkout .el-button {
    padding: 7px 15px;
  }
  </style>
  