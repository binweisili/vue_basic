export default {
    namespaced: true,
    state: {
      cartItems: []
    },
    getters: {
      totalPrice: state => {
        return state.cartItems.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      },
      totalItems: state => {
        return state.cartItems.length
      }
    },
    mutations: {
      addToCart(state, product) {
        const found = state.cartItems.find(item => item.id === product.id)
        if (found) {
          found.quantity += product.quantity
        } else {
          state.cartItems.push({
            ...product,
            quantity: product.quantity || 1
          })
        }
      },
      updateQuantity(state, { id, quantity }) {
        const item = state.cartItems.find(item => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      },
      removeFromCart(state, id) {
        const index = state.cartItems.findIndex(item => item.id === id)
        if (index !== -1) {
          state.cartItems.splice(index, 1)
        }
      },
      clearCart(state) {
        state.cartItems = []
      }
    },
    actions: {
      addProduct({ commit }, product) {
        commit('addToCart', product)
      },
      updateProductQuantity({ commit }, payload) {
        commit('updateQuantity', payload)
      },
      removeProduct({ commit }, id) {
        commit('removeFromCart', id)
      },
      clearAllItems({ commit }) {
        commit('clearCart')
      }
    }
  }
  