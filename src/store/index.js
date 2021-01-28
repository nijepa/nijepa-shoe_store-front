import Vue from "vue";
import Vuex from "vuex";
import shoes from './shoes';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shoes
  }
})
