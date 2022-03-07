import { StoryService, SearchService } from "@/common/api.service";
import { FETCH_STORIES, SEARCH_STORIES, RESET_STORIES_STATE } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  UPDATE_ARTICLE_IN_LIST,
  INITIALSTATE_STORIES_STATE
} from "./mutations.type";

const state = {
  stories: [],
  isLoading: false,
  storiesCount: 0
};

const getters = {
  storiesCount(state) {
    return state.storiesCount;
  },
  stories(state) {
    return state.stories;
  },
  isLoading(state) {
    return state.isLoading;
  },
};

const actions = {
  [SEARCH_STORIES]({ commit }, params) {
    commit(FETCH_START);
    return SearchService.query({...params.filters, ...{type: params.type}})
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_STORIES]({ commit }, params) {
    commit(FETCH_START);
    return StoryService.query({...params.filters, ...{type: params.type}})
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [RESET_STORIES_STATE]({ commit }) {
    commit(INITIALSTATE_STORIES_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [INITIALSTATE_STORIES_STATE](state) {
    state.stories = [];
    state.isLoading = false;
    state.storiesCount = 0;
  },
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, { stories, storiesCount }) {
    state.stories = stories;
    state.storiesCount = storiesCount;
    state.isLoading = false;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
    state.stories = state.stories.map(article => {
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
