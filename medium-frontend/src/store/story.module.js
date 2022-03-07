//import Vue from "vue";
import {
  StoryService,
  CommentsService,
  FavoriteService,
  HashtagService,
} from "@/common/api.service";
import { ClapService, UserService } from "../common/api.service";
import {
  FETCH_STORY,
  FETCH_COMMENTS,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_DELETE,
  STORY_RESET_STATE,
  CREATE_COMMENT,
  FETCH_STORY_HASHTAGS,
  FETCH_AUTHOR_FOLLOWERS,

  PUBLISH_STORY,
  FETCH_MY_STORIES,
  UPDATE_STORY,
  DELETE_STORY,
  CLAP_STORY,
  
} from "./actions.type";
import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST,
  SET_FOLLOW,
  SET_UNFOLLOW,
  SET_STORY,
  SET_CLAP,
  SET_STORY_HASHTAGS,
  SET_AUTHOR_FOLLOWERS
} from "./mutations.type";

const initialState = {
  story: {
    id: "",
    title: "",
    content: "",
    content_pure: "",
    hashtag: [],
    hashtag_struct: [],
    clap_number: 0,
  },
  isFollowing: false,
  followeds: [],
  comments: []
};

export const state = { ...initialState };
const getters = {
  story(state) {
    return state.story;
  },
  isFollowing(state) {
    return state.isFollowing;
  },
  comments(state) {
    return state.comments;
  },
  followeds(state) {
    return state.followeds;
  }
};

export const actions = {

  [PUBLISH_STORY]({ state }) {
        var div = document.createElement('div');          // removes html tags and make another field
        div.innerHTML = state.story.content;
        var elements = div.getElementsByTagName('img');
        while(elements[0])
            elements[0].parentNode.removeChild(elements[0])
        var content_without_img = div.innerHTML;
        var regex = /(<([^>]+)>)/ig;
        var content_pure = content_without_img.replace(regex, "");
        state.story.content_pure = content_pure;

    return StoryService.create(state.story);
  },
  [UPDATE_STORY]({ state }) {
        var div = document.createElement('div');          // removes html tags and make another field
        div.innerHTML = state.story.content;
        var elements = div.getElementsByTagName('img');
        while(elements[0])
            elements[0].parentNode.removeChild(elements[0])
        var content_without_img = div.innerHTML;
        var regex = /(<([^>]+)>)/ig;
        var content_pure = content_without_img.replace(regex, "");
        state.story.content_pure = content_pure;

    return StoryService.update(state.story.id, state.story);
  },

  async [FETCH_STORY](context, storyId) {

    const { data } = await StoryService.get(storyId);
    context.commit(SET_STORY, data);
    return data;
  },
  
  [STORY_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  },

  async [FETCH_MY_STORIES](context ) {

    const { data } = await StoryService.getMyStories();
    context.commit(SET_ARTICLE, data.story);
    return data;
  },
  async [DELETE_STORY]( context, storyId ) {

    await StoryService.destroy(storyId);
    
    //context.commit(SET_ARTICLE, data.story);
  },
  async [CREATE_COMMENT](context, payload) {
  
    payload.story_id = state.story.id;
    await CommentsService.post(state.story.id, payload);
    
    context.dispatch(FETCH_COMMENTS, state.story.id);
  },

  async [CLAP_STORY](context, storyId) {

    const { data } = await ClapService.clap(storyId);
    context.commit(SET_CLAP, data);
  },
  async [FETCH_STORY_HASHTAGS](context, storyId) {

    const {data} = await HashtagService.fetch(storyId);
    const hashtagArray = [];
    data.forEach(hashtag => {
      hashtagArray.push(hashtag.Hashtag);
    });
    context.commit(SET_STORY_HASHTAGS, hashtagArray);
  },
  async [FETCH_AUTHOR_FOLLOWERS](context, authorId) {

    const {data} = await UserService.getAuthorFollowers(authorId);
    context.commit(SET_AUTHOR_FOLLOWERS, data);
  },

  
  async [FETCH_COMMENTS](context, storyId) {
    const { data } = await CommentsService.get(storyId);
    context.commit(SET_COMMENTS, data.comments);
    return data.comments;
  },
  async [COMMENT_DESTROY](context, payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [FAVORITE_ADD](context, slug) {
    const { data } = await FavoriteService.add(slug);
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  async [FAVORITE_REMOVE](context, slug) {
    const { data } = await FavoriteService.remove(slug);
    // Update list as well. This allows us to favorite an article in the Home view.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  [ARTICLE_PUBLISH]({ state }) {
    return StoryService.create(state.article);
  },
  [ARTICLE_DELETE](context, slug) {
    return StoryService.destroy(slug);
  },
  [ARTICLE_EDIT]({ state }) {
    return StoryService.update(state.article.slug, state.article);
  },
  [ARTICLE_EDIT_ADD_TAG](context, tag) {
    context.commit(TAG_ADD, tag);
  },
  [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
    context.commit(TAG_REMOVE, tag);
  },

  

};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_STORY](state, data) {
    state.story.content = String.fromCharCode(...data.story.content.data);
    state.story.id = data.story.id;
    state.story.title = data.story.title;
    state.story.created_at = data.story.created_at;
    state.story.User = data.story.User;
    state.isFollowing = data.isFollowing;
    if (data.story.Claps.length) {
      state.story.clap_number = data.story.Claps[0].clap_number;
    }
    
    // state.story.id = story.id;

  },
  [SET_FOLLOW](state) {
    state.isFollowing = true;
  },
  [SET_UNFOLLOW](state) {
    state.isFollowing = false;
  },
  [SET_CLAP](state, data) {
    state.story.clap_number = data.clap_number;
  },


  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [TAG_ADD](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag]);
  },
  [TAG_REMOVE](state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag);
  },
  [SET_STORY_HASHTAGS](state, hashtags) {
    let hashtagArray =[];
    hashtags.forEach(element => {
      hashtagArray.push(element.hashtag_name);
    });
    state.story.hashtag = hashtagArray;
    state.story.hashtag_struct = hashtags;
  },
  [SET_AUTHOR_FOLLOWERS](state, followeds) {
    state.followeds = followeds;
  },
  
  [RESET_STATE]() {

    state.story.title = "";
    state.story.content = "";
    state.story.hashtag = [];
    state.story.hashtag_struct = [];
    state.story.id = "";
    state.story.comments = [];
    state.isFollowing = false;
    state.story.clap_number = 0;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
