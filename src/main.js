import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import store from "./store";

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";

import '@morioh/v-quill-editor/dist/editor.css';
import Editor from '@morioh/v-quill-editor'

Vue.config.productionTip = false
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

Vue.use(Editor);
ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.name != "signin" ) {
        Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
    }
  } 
    next();
}
  
);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");