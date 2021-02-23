const state = {
  loading: true,
  errors: [],
  activeComponent: false,
  selectedLink: '',
  selectedMenu: ''
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  loadingState: state => state.loading,
  getActiveComponent: state => state.activeComponent,
  getSelectedLink: state => state.selectedLink,
  getSelectedMenu: state => state.selectedMenu,
  getErrors: state => state.errors
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  changeLoadingState(state, loading) {
    state.loading = loading;
  },

  changeActiveComponent(state, activeComponent) {
    state.activeComponent = activeComponent;
  },

  changeSelectedLink(state, selectedLink) {
    state.selectedLink = selectedLink;
  },

  changeSelectedMenu(state, selectedMenu) {
    state.selectedMenu = selectedMenu;
  },

  setErrors(state, errors) {
    state.errors = errors;
  }
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  setLoadingState({ commit }, loading) {
    commit('changeLoadingState', loading);
  },

  setActiveComponent({ commit }, activeComponent) {
    commit('changeActiveComponent', activeComponent);
  },

  setSelectedLink({ commit }, selectedLink) {
    commit('changeSelectedLink', selectedLink);
  },

  setSelectedMenu({ commit }, selectedMenu) {
    commit('changeSelectedMenu', selectedMenu);
  },

  clearErrors({ commit }) {
    commit('setErrors', []);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};