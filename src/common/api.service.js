import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { BACKEND_DOMAIN } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = BACKEND_DOMAIN + '/api';
  },
  setHeader() {
    Vue.axios.defaults.headers.common[
      "x-access-token"
    ] = `${JwtService.getAccessToken()}`;
  },

  query(resource, params) {
    
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);

    });
  },

  getReturnPromise(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
};

export default ApiService;

export const HashtagService = {
  get() {
    return ApiService.get("hashtag");
  },
  fetch(storyId) {
    return ApiService.get(`story/${storyId}/hashtag`)
  },
  getHashtagStories(hashtagId) {
    return ApiService.get(`hashtag/${hashtagId}/story`)
  }
};


export const StoryService = {
  query(params) {
    
    return ApiService.query("stories", {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("story", slug);
  },
  getMyStories() {
    return ApiService.get("story");
  },
  create(params) {
    return ApiService.post(`story`, { story: params });
  },
  update(slug, params) {
    return ApiService.update("story", slug, { story: params });
  },
  destroy(slug) {
    return ApiService.delete(`story/${slug}`);
  }
};

export const SearchService = {
  query(params) {
    return ApiService.query("search", {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("search", slug);
  },
  getMyStories() {
    return ApiService.get("story");
  },
  create(params) {
    return ApiService.post(`story`, { story: params });
  },
  update(slug, params) {
    return ApiService.update("story", slug, { story: params });
  },
  destroy(slug) {
    return ApiService.delete(`story/${slug}`);
  }
};
export const CommentsService = {
  get(slug) {
    if (typeof slug !== "string") {
      throw new Error(
        "[RWV] CommentsService.get() article slug required to fetch comments"
      );
    }
    return ApiService.get("story", `${slug}/comment`);
  },

  post(slug, payload) {
    return ApiService.post(`story/${slug}/comment`, payload);
  },

  destroy(slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`);
  }
};

export const FollowService = {
  follow(slug) {
    return ApiService.post(`follow`, { followed_id: slug });
  },
  unfollow(slug) {
    return ApiService.delete(`follow/?followed_id=${slug}`);
  },
  getFollowers() {
    return ApiService.get(`follow`);
  },

};

export const UserService = {
  getAuthorFollowers(userId) {
    return ApiService.get(`user/${userId}/follow`);
  }


};
export const ClapService = {
  clap(storyId) {
    return ApiService.post(`clap`, {storyId: storyId});
  }
};


export const FavoriteService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/favorite`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/favorite`);
  }
};


