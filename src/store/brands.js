import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;

const  state = {
  brand: {},
  brands: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllBrands: state => state.brands,
  getOneBrand: state => state.brand
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {

  setBrands: (state, brands) => (state.brands = brands),

  setBrand: (state, brand) => (state.brand = brand),

  clearBrand(state) {
    state.brand = {};
  },

  addBrand(state, newBrand) {
    state.brands = [newBrand, ...state.brands]
  },

  updateBrand(state, updatedBrand) {
    state.brands = [
      ...state.brands.map(item => 
          item.id !== updatedBrand.id ? item : {...item, ...updatedBrand}
      )
    ] 
  },

  deleteBrand (state, id) {
    state.brands = [
      ...state.brands.filter((item) => item.id !== id)
    ];
  }, 
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchBrands ({ commit }) {
    const response = await axios.get(URL + "/brands");
    commit('setBrands', response.data);
  },

  async fetchBrand ({ commit }, brandData) {
    const response = await axios.get(URL + "/brands/" + brandData.id, brandData);
    await commit('setBrand', response);
  },

  async brandAdd({ commit }, brandData) {
    await axios.post(URL + '/brands/', brandData)
      .then((response) => {
        commit('addBrand', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async brandUpdate({ commit }, brandData) {
    await axios.put(URL + '/brands/' + brandData.id, brandData)
      .then((response) => {
        commit('updateBrand', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async brandDelete({ commit }, brandData) {
    await axios.delete(URL + '/brands/' + brandData.id, brandData)
      .then((response) => {
        commit('deleteBrand', response.data.id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async brandClear({commit}) {
    commit('clearBrand');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
