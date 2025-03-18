import products from '../../mock/products'

export default {
  namespaced: true,
  state: {
    products: products,
    categories: []
  },
  getters: {
    allProducts: state => state.products,
    getProductById: state => id => {
      return state.products.find(product => product.id === id)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // 这里模拟从API获取数据
      // 实际项目中这里会是异步API调用
      commit('setProducts', products)
    },
    fetchCategories({ commit }) {
      // 模拟获取分类数据
      const categories = [
        { id: 1, name: '家用电器' },
        { id: 2, name: '手机数码' },
        { id: 3, name: '电脑办公' },
        { id: 4, name: '个人清洁' },
        { id: 5, name: '汽车生活' },
        { id: 6, name: '男装' },
        { id: 7, name: '女装' },
        { id: 8, name: '男鞋' },
        { id: 9, name: '母婴童装' },
        { id: 10, name: '个人清洁' }
      ]
      commit('setCategories', categories)
    }
  }
}
