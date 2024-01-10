import { createStore } from "vuex";

const store = createStore({
  state: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  getters: {
    getCartItems: (state) => state.cartItems,
  },
  mutations: {
    addToCart(state, item) {
      console.log("data recvied", item);
      state.cartItems.push(item);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, item) {
      const index = state.cartItems.indexOf(item);
      if (index > -1) {
        state.cartItems.splice(index, 1);
        localStorage.removeItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    updateCartItemQuantity(state, payload) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = payload.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
  actions: {},
});

export default store;
