import ApiService from "@/common/api.service";
import {
    FETCH_PUBLICPROFILE
} from "./actions.type";
import { SET_PUBLIC_PROFILE } from "./mutations.type";

const state = {
  errors: {},
  publicProfile: {}
};

const getters = {
    publicProfile(state) {
    return state.publicProfile;
  }
};

const actions = {
    [FETCH_PUBLICPROFILE](context, userId) {
        return ApiService.get("user", userId)
          .then(({ data }) => {
            context.commit(SET_PUBLIC_PROFILE, data);
            return data;
          })
          .catch(() => {
            // #todo SET_ERROR cannot work in multiple states
            // context.commit(SET_ERROR, response.data.errors)
          });
      },
};

const mutations = {
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
  [SET_PUBLIC_PROFILE](state, publicProfile) {
    state.publicProfile = publicProfile;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
