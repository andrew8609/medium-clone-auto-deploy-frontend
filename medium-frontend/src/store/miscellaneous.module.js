import {SET_SEARCH_TERM } from "./mutations.type";
import { SET_SEARCHTERM } from "./actions.type";
const state = {
  searchTerm: "",
};

const getters = {
    searchTerm(state) {
      return state.searchTerm;
    }
  };
  
  const actions = {
    [SET_SEARCHTERM](context, searchTerm) {
        context.commit(SET_SEARCH_TERM, searchTerm);
    }
  };
  const mutations = {
    [SET_SEARCH_TERM](state, searchTerm) {
        state.searchTerm = searchTerm;
    }
  };
  
  export default {
    state,
    actions,
    mutations,
    getters
  };
  