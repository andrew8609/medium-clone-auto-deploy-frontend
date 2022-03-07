import { SearchService, HashtagService } from "@/common/api.service";
import { SEARCH_HASHTAGS, FETCH_HASHTAGS,FETCH_HASHTAG_STORIES, RESET_HASHTAGSTORIES } from "./actions.type";
import {
  SET_HASHTAGS, SET_HASHTAGS_FOR_RIGHTSIDE, SET_HASHTAG_STORIES, RESET_HASHTAG_STORIES
} from "./mutations.type";

const state = {
  hashtags: [],
  rightSideHashtags: [],
  hashtagStories: [],
};

const getters = {
  hashtags(state) {
    return state.hashtags;
  },
  rightSideHashtags(state) {
    return state.rightSideHashtags;
  },
  hashtagStories(state) {
    return state.hashtagStories;
  }
};

const actions = {
  [SEARCH_HASHTAGS]({ commit }, params) {
  
    return SearchService.query(params)
      .then(({ data }) => {
        commit(SET_HASHTAGS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_HASHTAGS]({ commit }) {
    return HashtagService.get()
      .then(({ data }) => {
        commit(SET_HASHTAGS_FOR_RIGHTSIDE, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  async [FETCH_HASHTAG_STORIES](context, hashtagId) {

    const {data} = await HashtagService.getHashtagStories(hashtagId);
    context.commit(SET_HASHTAG_STORIES, data);
  },
  [RESET_HASHTAGSTORIES](context) {
    context.commit(RESET_HASHTAG_STORIES);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [SET_HASHTAGS](state, data) {
    state.hashtags = data;
  },
  [SET_HASHTAGS_FOR_RIGHTSIDE](state, data) {
    state.rightSideHashtags = data;
  },
  [SET_HASHTAG_STORIES](state, data) {
    state.hashtagStories = data;
  },
  [RESET_HASHTAG_STORIES](state) {
    state.hashtagStories = [];
  },
  
};

export default {
  state,
  getters,
  actions,
  mutations
};
