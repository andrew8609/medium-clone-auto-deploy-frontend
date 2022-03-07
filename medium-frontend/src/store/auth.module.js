import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
  SIGNUP_WITH_EMAIL,
  SIGNIN_WITH_EMAIL,
  CONFIRM_SIGNUP_BY_TOKEN,
  CONFIRM_SIGNIN_BY_TOKEN,
  REFRESH_TOKEN,
} from "./actions.type";
import { SET_AUTH, SET_PROFILE, PURGE_AUTH, SET_ERROR } from "./mutations.type";
import Router from '@/router'

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getAccessToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("users/login", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [SIGNUP_WITH_EMAIL](context, email) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/signUpByEmail", email)
        .then(({ data }) => {
          //context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  
  [SIGNIN_WITH_EMAIL](context, email) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/signinWithEmail", email)
        .then(({ data }) => {
          //context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [CONFIRM_SIGNUP_BY_TOKEN](context, token) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/confirmSignupByToken", token)
        .then(({ data }) => {
          //context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [CONFIRM_SIGNIN_BY_TOKEN](context, token) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/confirmSigninByToken", token)
        .then(( {data} ) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ data }) => {
          context.commit(SET_ERROR, data.errors);
          reject(data);
        });
    });
  },
  [REFRESH_TOKEN](context, token) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/refreshToken", {refreshToken: token})
        .then(({ data }) => {         
          JwtService.saveAccessToken(data.accessToken);
          resolve(data);
        })
        .catch(({ err }) => { 
          Router.push({ name: "signin" });
          context.commit(SET_ERROR, err);
          reject(err);
        });
    });
  },
  

  [CHECK_AUTH](context) {
    if (JwtService.getAccessToken()) {
      ApiService.setHeader();
      ApiService.get("user/me")
        .then(({ data }) => {
          context.commit(SET_PROFILE, data);
        })
        .catch((err) => {   
          context.dispatch(REFRESH_TOKEN, JwtService.getRefreshToken());
          context.commit(SET_ERROR, err.message);
        });
    } else {

      Router.push({ name: "signin" });
      context.commit(PURGE_AUTH);
      
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.user = data;
    state.errors = {};
    JwtService.saveAccessToken(data.accessToken);
    JwtService.saveRefreshToken(data.refreshToken);
  },
  [SET_PROFILE](state, data) {
    state.isAuthenticated = true;
    state.user = data;
    state.errors = {};
  },
  
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyAccessToken();
    JwtService.destroyRefreshToken();
  },

};


export default {
  state,
  actions,
  mutations,
  getters
};
