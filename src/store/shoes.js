import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;
// import apiClient from './api_client';
//import router from '../router';


const  state = {
  shoe: {},
  shoes: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllShoes: state => state.shoes,
  getOneShoe: state => state.shoe
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const  mutations = {

  setShoes: (state, shoes) => (state.shoes = shoes),

  setNextShoes: (state, nextPage) => (state.shoes = nextPage),

  setShoe: (state, shoe) => (state.shoe = shoe),

  clearShoe(state) {
    state.shoe = {};
  },

/*   addLanguage(state, text) {
    state.languages = [text, ...state.expenses]
  },

  updateLanguage(state, language) {
    state.languages = [
      ...state.languages.map(item => 
          item._id !== language._id ? item : {...item, ...language}
      )
    ] 
  },

  deleteLanguage (state, id) {
    state.languages = [
      ...state.languages.filter((item) => item._id !== id)
    ];
  }, */
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchShoes ({ commit }) {
    const response = await axios.get(URL + "/shoes");
    commit('setShoes', response.data);
  },

  async fetchNextShoes ({ commit }, nextPage) {
    const response = await axios.get(nextPage);
    commit('setShoes', response.data);
  },

  async fetchShoe ({ commit }, shoeData) {
    const response = await axios.get(URL + "shoes/" + shoeData._id, shoeData);
    await commit('setShoe', response);
  },

  /* async languageAdd({commit},languageData) {
    await axios.post(URL + 'expenses', expenseData)
      .then((response) => {
        commit('addExpense', response.data.expense);
        //router.push("/dashboard")
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async expenseUpdate({commit}, expenseData) {
    await axios.put(URL + 'expenses/' + expenseData._id, expenseData)
      .then((response) => {
        commit('updateExpense', response.data);
        //router.push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async expenseDelete({commit}, expenseData) {
    await axios.delete(URL + 'expenses/' + expenseData._id, expenseData)
      .then((response) => {
        commit('deleteExpense', response.data._id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  }, */

  async shoeClear({commit}) {
    commit('clearShoe');
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};