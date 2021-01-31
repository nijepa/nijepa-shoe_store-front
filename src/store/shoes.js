import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL;
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
    // const response = [
    //   {id: 1, name: 'HTML', logo: 'HTML5', tech_id: 1},
    //   {id: 2, name: 'CSS', logo: 'CSS3', tech_id: 1},
    //   {id: 3, name: 'Sass', logo: 'Sass', tech_id: 1},
    //   {id: 4, name: 'JavaScript', logo: 'JavaScript', tech_id: 1},
    //   {id: 5, name: 'Vue.js', logo: 'Vue.js', tech_id: 1},
    //   {id: 6, name: 'Node.js', logo: 'Node.js', tech_id: 2},
    //   {id: 7, name: 'PHP', logo: 'PHP', tech_id: 2},
    //   {id: 8, name: 'Laravel', logo: 'Laravel', tech_id: 2},
    //   {id: 9, name: 'MongoDB', logo: 'Mongodb', tech_id: 3},
    //   {id: 10, name: 'Git', logo: 'Git', tech_id: 4},
    //   {id: 11, name: 'Npm', logo: 'Npm', tech_id: 4},
    //   {id: 12, name: 'Algorithms', logo: 'Algorithm', tech_id: 4},
    //   {id: 13, name: 'MySQL', logo: 'mysql', tech_id: 3},
    //   {id: 14, name: 'Firebase', logo: 'Firebase', tech_id: 3},
    //   {id: 15, name: 'Data Structures', logo: 'Tree-data-structure', tech_id: 4},
    // ]
    commit('setShoes', response.data);
    //commit('setExpenses', response.data);
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