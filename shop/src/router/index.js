import Vue from 'vue'
import VueRouter from 'vue-router'

// 页面
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Gallery from '../views/Gallery.vue'
import ProductList from '../views/Product/ProductList.vue'
import ProductDetail from '../views/Product/ProductDetail.vue'
import Category from '../views/Category.vue'
import Cart from '../views/Cart.vue'
import MyCenter from '../views/User/MyCenter.vue'
import Address from '../views/User/Address.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'MyCenter',
    component: MyCenter
  },
  {
    path: '/address',
    name: 'Address',
    component: Address
  }
]

const router = new VueRouter({
  routes
})

export default router
