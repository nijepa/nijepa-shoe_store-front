import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;

const  state = {
  size: {},
  sizes: [],
  sizesList: {}
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllSizes: state => state.sizes,
  getOneSize: state => state.size,
  getSizesList: state => state.sizesList
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {

  setSizes: (state, sizes) => (state.sizes = sizes),

  setSizesList: (state, sizesList) => (state.sizesList = sizesList),

  setSize: (state, size) => (state.size = size),

  clearSize(state) {
    state.size = {};
  },

  addSize(state, newSize) {
    state.sizes = [newSize, ...state.sizes]
  },

  updateSize(state, updatedSize) {
    state.sizes = [
      ...state.sizes.map(item => 
          item.id !== updatedSize.id ? item : {...item, ...updatedSize}
      )
    ] 
  },

  deleteSize (state, id) {
    state.sizes = [
      ...state.sizes.filter((item) => item.id !== id)
    ];
  }, 
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchSizes ({ commit }) {
    const response = await axios.get(URL + "/sizes");
    commit('setSizes', response.data);
  },

  async fetchSizesList ({ commit }, queryStr) {
    const response = await axios.post(URL + "/sizeslist?page=" + queryStr.pageNr, queryStr);
    commit('setSizesList', response.data);
  },

  async fetchSizesPage ({ commit }, nextPage) {
    const response = await axios.post(URL + "/sizeslist?page=" + nextPage.pageNr, nextPage);
    commit('setSizesList', response.data);
  },

  async fetchSize ({ commit }, sizeData) {
    const response = await axios.get(URL + "/sizes/" + sizeData.id, sizeData);
    await commit('setSize', response);
  },

  async sizeAdd({ commit }, sizeData) {
    await axios.post(URL + '/sizes/', sizeData)
      .then((response) => {
        commit('addSize', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async sizeUpdate({ commit }, sizeData) {
    await axios.put(URL + '/sizes/' + sizeData.id, sizeData)
      .then((response) => {
        commit('updateSize', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async sizeDelete({ commit }, sizeData) {
    await axios.delete(URL + '/sizes/' + sizeData.id, sizeData)
      .then((response) => {
        commit('deleteSize', response.data.id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async sizeClear({commit}) {
    commit('clearSize');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
