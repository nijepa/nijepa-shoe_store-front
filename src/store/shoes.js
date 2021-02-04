import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;

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
const mutations = {

  setShoes: (state, shoes) => (state.shoes = shoes),

  setNextShoes: (state, nextPage) => (state.shoes = nextPage),

  setShoe: (state, shoe) => (state.shoe = shoe),

  clearShoe(state) {
    state.shoe = {};
  },

  addShoe(state, newShoe) {
    state.shoes = [newShoe, ...state.shoes]
  },

  updateShoe(state, updatedShoe) {
    state.shoes = [
      ...state.shoes.map(item => 
          item.id !== updatedShoe.id ? item : {...item, ...updatedShoe}
      )
    ] 
  },

  deleteShoe (state, id) {
    state.shoes = [
      ...state.shoes.filter((item) => item.id !== id)
    ];
  }, 
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {

  async fetchShoes ({ commit }) {
    const response = await axios.get(URL + "shoes");
    commit('setShoes', response.data);
  },

  async fetchNextShoes ({ commit }, nextPage) {
    const response = await axios.get(nextPage);
    commit('setShoes', response.data);
  },

  async fetchShoe ({ commit }, shoeData) {
    const response = await axios.get(URL + "shoes/" + shoeData.id, shoeData);
    await commit('setShoe', response);
  },

  async shoeAdd({ commit }, shoeData) {
    await axios.post(URL + '/shoes/', shoeData)
      .then((response) => {
        commit('addShoe', response.data.shoe);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async shoeUpdate({ commit }, shoeData) {
    await axios.put(URL + '/shoes/' + shoeData.id, shoeData)
      .then((response) => {
        commit('updateShoe', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async shoeDelete({ commit }, shoeData) {
    await axios.delete(URL + '/shoes/' + shoeData.id, shoeData)
      .then((response) => {
        commit('deleteShoe', response.data.id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

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
