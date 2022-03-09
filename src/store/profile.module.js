import ApiService from "@/common/api.service";
import {FollowService} from "@/common/api.service";
import {
  FETCH_PROFILE,
  UPDATE_PROFILE,
  FETCH_FOLLOWERS,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "./actions.type";
import { SET_PROFILE, SET_FOLLOWERS, SET_FOLLOW, SET_UNFOLLOW } from "./mutations.type";

const state = {
  errors: {},
  profile: {},
  followers: [],
};

const getters = {
  profile(state) {
    return state.profile;
  },
  followers(state) {
    return state.followers;
  }
};

const actions = {
  [UPDATE_PROFILE](context, payload) {
    let formData = new FormData();
    formData.append("image", payload.avatar);
    formData.append('username', payload.user.username);
    formData.append('email', payload.user.email);
    formData.append('bio_note', payload.user.bio_note);

    return ApiService.put("/user/me", formData)
      .then(({ data }) => {
        context.commit(SET_PROFILE, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
  [FETCH_PROFILE](context, payload) {
    const { username } = payload;
    return ApiService.get("profiles", username)
      .then(({ data }) => {
        context.commit(SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
  [FETCH_FOLLOWERS]({ commit }) {
    return FollowService.getFollowers()
      .then(({ data }) => {
        commit(SET_FOLLOWERS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  async [FOLLOW_USER](context, authorId) {

    await FollowService.follow(authorId);
    await FollowService.getFollowers()
        .then(({ data }) => {
          context.commit(SET_FOLLOWERS, data);
          context.commit(SET_FOLLOW);
        })
        .catch(error => {
          throw new Error(error);
        });
        
  },
  async [UNFOLLOW_USER](context, authorId) {

    await FollowService.unfollow(authorId);
    await FollowService.getFollowers()
        .then(({ data }) => {
          context.commit(SET_FOLLOWERS, data);
          context.commit(SET_UNFOLLOW);
        })
        .catch(error => {
          throw new Error(error);
        });
    
  },
};

const mutations = {
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  },
  [SET_FOLLOWERS](state, data) {
    state.followers = data;
   },
};

export default {
  state,
  actions,
  mutations,
  getters
};
