import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;

const  state = {
  category: {},
  categories: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllCategories: state => state.categories,
  getOneCategory: state => state.category
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {

  setCategories: (state, categories) => (state.categories = categories),

  setCategory: (state, category) => (state.category = category),

  clearCategory(state) {
    state.category = {};
  },

  addCategory(state, newCategory) {
    state.categories = [newCategory, ...state.categories]
  },

  updateCategory(state, updatedCategory) {
    state.categories = [
      ...state.categories.map(item => 
          item.id !== updatedCategory.id ? item : {...item, ...updatedCategory}
      )
    ] 
  },

  deleteCategory (state, id) {
    state.categories = [
      ...state.categories.filter((item) => item.id !== id)
    ];
  }, 
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchCategories ({ commit }) {
    const response = await axios.get(URL + "/categories");
    commit('setCategories', response.data);
  },

  async fetchCategory ({ commit }, categoryData) {
    const response = await axios.get(URL + "/categories/" + categoryData.id, categoryData);
    await commit('setCategory', response);
  },

  async categoryAdd({ commit }, categoryData) {
    await axios.post(URL + '/categories/', categoryData)
      .then((response) => {
        commit('addCategory', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async categoryUpdate({ commit }, categoryData) {
    await axios.put(URL + '/categories/' + categoryData.id, categoryData)
      .then((response) => {
        commit('updateCategory', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async categoryDelete({ commit }, categoryData) {
    await axios.delete(URL + '/categories/' + categoryData.id, categoryData)
      .then((response) => {
        commit('deleteCategory', response.data.id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async categoryClear({commit}) {
    commit('clearCategory');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
