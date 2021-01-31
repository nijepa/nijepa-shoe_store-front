import Vue from "vue";
import Vuex from "vuex";
import shoes from './shoes';
import cart from './cart';
import utils from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shoes,
    cart,
    utils
  }
})
