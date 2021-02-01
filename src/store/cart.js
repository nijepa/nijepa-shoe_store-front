import * as ls from './local_storage';

const  state = {
  cart: [],
  checkout: false
};

/* -------------------------------------- GETTERS --------------------------------------- */
const getters = {
  getCart: state => state.cart,
  getCheckout: state => state.checkout
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  setCart(state, cart) {
    state.cart = cart;
  },

  clearCart(state) {
    state.cart = [];
  },

  checkoutEnable(state) {
    state.checkout = true;
  },

  checkoutDisable(state) {
    state.checkout = false;
  },
};

/* ---------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  initialState({ commit }) {
    const cartNotEmpty = ls.getToken();
    if (cartNotEmpty) { commit('setCart', cartNotEmpty); }
  },

  async fetchCart ({ commit }, cartData) {
    ls.saveToken(cartData);
    await commit('setCart', cartData);
  },

  cartClear({ commit }) {
    ls.removeToken();
    commit('clearCart');
  },

  async enableCheckout ({ commit }) {
    await commit('checkoutEnable');
  },

  disableCheckout({ commit }) {
    commit('checkoutDisable');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};