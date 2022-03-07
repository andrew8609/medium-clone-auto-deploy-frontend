import { SearchService } from "@/common/api.service";
import { SEARCH_USERS, RESET_USERS_STATE } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  UPDATE_ARTICLE_IN_LIST,
  INITIALSTATE_USERS_STATE,
  
} from "./mutations.type";

const state = {
  users: [],
  userListIsLoading: false,
  usersCount: 0,
  currentAutor: {},
  
};

const getters = {
  usersCount(state) {
    return state.usersCount;
  },
  users(state) {
    return state.users;
  },
  userListIsLoading(state) {
    return state.userListIsLoading;
  },
  currentAutor(state) {
    return state.currentAutor;
  },
 
};

const actions = {
  [SEARCH_USERS]({ commit }, params) {
    commit(FETCH_START);
    return SearchService.query({...params.filters, ...{type: params.type}})
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [RESET_USERS_STATE]({ commit }) {
    commit(INITIALSTATE_USERS_STATE);
  },
 
  
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [INITIALSTATE_USERS_STATE](state) {
    state.users = [];
    state.userListIsLoading = false;
    state.usersCount = 0;
  },
  [FETCH_START](state) {
    state.userListIsLoading = true;
  },
  [FETCH_END](state, { users, usersCount }) {
    state.users = users;
    state.usersCount = usersCount;
    state.userListIsLoading = false;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
    state.users = state.users.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  },
  

};

export default {
  state,
  getters,
  actions,
  mutations
};
