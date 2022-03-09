import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: "Auth",
      path: "/AuthLayout",
      component: () => import("@/layout/AuthLayout"),
      meta: { requiresAuth: false},
      children: [
        {
          name: "signin",
          path: '/signin',
          component: () => import("@/components/Auth/Signin"),
        },
        {
          path: '/signup',
          component: () => import("@/components/Auth/Signup"),
        },
        {
          path: "/signupEmail",
          component: () => import("@/components/Auth/SignupEmail"),
        },
        {
          path: "/signinEmail",
          component: () => import("@/components/Auth/SigninEmail"),
        },
      ],
    },
    
    {
      name: "landing",
      path: "/",
      component: () => import("@/views/Landing"),
    },
    {
      name: "layout1",
      path: "/layout1",
      component: () => import("@/layout/DashboardLayout"),
      meta: { requiresAuth: true},
      children: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: () => import("@/views/Dashboard"),
        },
        {
          name: "search",
          path: "/search",
          component: () => import("@/views/Search"),
          meta: { requiresAuth: true}
        },
        {
          name: "user",
          path: "/user/:userId",
          component: () => import("@/views/PublicProfile"),
          meta: { requiresAuth: true}
        },
        {
          name: "hashtag",
          path: "/hashtag/:hashtagId",
          component: () => import("@/views/Hashtag"),
          meta: { requiresAuth: true}
        },
      ],
    },
    {
      name: "confirmSignupByToken",
      path: "/auth/confirmSignupByToken",
      component: () => import("@/views/ConfirmSignupByToken")
    },
    {
      name: "confirmSigninByToken",
      path: "/auth/confirmSigninByToken",
      component: () => import("@/views/ConfirmSigninByToken"),
    },
    {
      name: "signupFirst",
      path: "/auth/signupFirst",
      component: () => import("@/views/SignupFirst"),
    },
    {
      name: "welcomePage",
      path: "/auth/welcomePage",
      component: () => import("@/views/WelcomePage"),
    },
    {
      name: "profile",
      path: "/profile",
      component: () => import("@/views/Profile"),
      meta: { requiresAuth: true}
    },
    {
      name: "editStory",
      path: "/editStory/:storyId?",
      component: () => import("@/views/EditStory"),
      meta: { requiresAuth: true}
    },
    {
      name: "myStories",
      path: "/myStories",
      component: () => import("@/views/MyStories"),
      meta: { requiresAuth: true}
    },
    {
      name: "story",
      path: "/story/:storyId",
      component: () => import("@/views/Story"),
      meta: { requiresAuth: true}
    },
    
  ]
});
