import Vue from "vue";
import Vuex from "vuex";
import shoes from './shoes';
import categories from './categories';
import brands from './brands';
import colors from './colors';
import sizes from './sizes';
import cart from './cart';
import utils from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shoes,
    categories,
    brands,
    colors,
    sizes,
    cart,
    utils
  }
})
