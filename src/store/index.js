import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
});

export default createStore({
  state: {
    email: '',
    favourites: [],
  },
  mutations: {
    login(state, payload) {
      Object.assign(state, payload);
    },
    addToFavourites(state, payload) {
      const checkIfExists = state.favourites.find((movie) => movie.imdbID === payload.imdbID);
      if (!checkIfExists) {
        state.favourites.push(payload);
      }
    },
    removeFromFavourites(state, payload) {
      state.favourites = state.favourites.filter((movie)=> movie.imdbID !== payload.imdbID);
    },
  },
  getters: {
    getFavourites: state => {
      return state.favourites;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],
})
