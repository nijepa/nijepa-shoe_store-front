import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;

const  state = {
  color: {},
  colors: [],
  colorsList: {}
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllColors: state => state.colors,
  getOneColor: state => state.color,
  getColorsList: state => state.colorsList
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {

  setColors: (state, colors) => (state.colors = colors),

  setColorsList: (state, colorsList) => (state.colorsList = colorsList),

  setColor: (state, color) => (state.color = color),

  clearColor(state) {
    state.color = {};
  },

  addColor(state, newColor) {
    state.colorsList.data = [newColor, ...state.colorsList.data]
  },

  updateColor(state, updatedColor) {
    state.colorsList.data = [
      ...state.colorsList.data.map(item => 
          item.id !== updatedColor.id ? item : {...item, ...updatedColor}
      )
    ] 
  },

  deleteColor (state, id) {
    state.colorsList.data = [
      ...state.colorsList.data.filter((item) => item.id !== id)
    ];
  }, 
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchColors ({ commit }) {
    const response = await axios.get(URL + "/colors");
    commit('setColors', response.data);
  },

  async fetchColorsList ({ commit }, queryStr) {
    const response = await axios.post(URL + "/colorslist?page=" + queryStr.pageNr, queryStr);
    commit('setColorsList', response.data);
  },

  async fetchColorsPage ({ commit }, nextPage) {
    const response = await axios.post(URL + "/colorslist?page=" + nextPage.pageNr, nextPage);
    commit('setColorsList', response.data);
  },

  async fetchColor ({ commit }, colorData) {
    const response = await axios.get(URL + "/colors/" + colorData.id, colorData);
    await commit('setColor', response);
  },

  async colorAdd({ commit }, colorData) {
    await axios.post(URL + '/colors/', colorData)
      .then((response) => {
        commit('addColor', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async colorUpdate({ commit }, colorData) {
    await axios.put(URL + '/colors/' + colorData.id, colorData)
      .then((response) => {
        commit('updateColor', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async colorDelete({ commit }, colorData) {
    await axios.delete(URL + '/colors/' + colorData.id, colorData)
      .then((response) => {
        commit('deleteColor', response.data.id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async colorClear({commit}) {
    commit('clearColor');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
