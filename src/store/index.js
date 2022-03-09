import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import story from "./story.module";
import home from "./home.module";
import profile from "./profile.module";
import publicProfile from "./publicProfile.module";
import users from "./users.module";
import hashtags from "./hashtags.module";
import miscellaneous from "./miscellaneous.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    story,
    home,
    profile,
    users,
    hashtags,
    miscellaneous,
    publicProfile
  }
});
