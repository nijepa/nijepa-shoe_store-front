import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;

const state = {
  specific: {},
  specifics: [],
  specificsList: {}
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllSpecifics: state => state.specifics,
  getOneSpecific: state => state.specific,
  getSpecificsList: state => state.specificsList
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {

  setSpecifics: (state, specifics) => (state.specifics = specifics),

  setSpecificsList: (state, specificsList) => (state.specificsList = specificsList),

  setSpecific: (state, specific) => (state.specific = specific),

  clearSpecific(state) {
    state.specific = {};
  },

  addSpecific(state, newSpecific) {
    state.specifics.data = [newSpecific, ...state.specifics.data]
  },

  updateSpecific(state, updatedSpecific) {
    state.specifics.data = [
      ...state.specifics.data.map(item => 
          item.id !== updatedSpecific.id ? item : {...item, ...updatedSpecific}
      )
    ] 
  },

  deleteSpecific (state, id) {
    state.specifics.data = [
      ...state.specifics.data.filter((item) => item.id !== id)
    ];
  }, 
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchSpecifics ({ commit }) {
    const response = await axios.get(URL + "/specifics");
    commit('setSpecifics', response.data);
  },

  async fetchSpecificsList ({ commit }, queryStr) {
    const response = await axios.post(URL + "/list?page=" + queryStr.pageNr, queryStr);
    commit('setSpecificsList', response.data);
  },

  async fetchSpecificsPage ({ commit }, nextPage) {
    const response = await axios.post(URL + "/list?page=" + nextPage.pageNr, nextPage);
    commit('setSpecificsList', response.data);
  },

  async fetchShoeSpecifics ({ commit }, shoeData) {
    const response = await axios.get(URL + "/shoespecs/" + shoeData);
    commit('setSpecifics', response.data);
  },

  async fetchSpecific ({ commit }, specificData) {
    const response = await axios.get(URL + "/specifics/" + specificData.id, specificData);
    await commit('setSpecific', response);
  },

  async specificAdd({ commit }, specificData) {
    await axios.post(URL + '/specifics/', specificData)
      .then((response) => {
        commit('addSpecific', response.data[0]);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async specificUpdate({ commit }, specificData) {
    await axios.put(URL + '/specifics/' + specificData.id, specificData)
      .then((response) => {
        commit('updateSpecific', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async specificDelete({ commit }, specificData) {
    await axios.delete(URL + '/specifics/' + specificData.id, specificData)
      .then((response) => {
        commit('deleteSpecific', response.data.id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async specificClear({commit}) {
    commit('clearSpecific');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
