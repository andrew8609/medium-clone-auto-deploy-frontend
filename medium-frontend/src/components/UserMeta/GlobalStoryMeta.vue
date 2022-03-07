<style scoped>
  .v-application .info {
    background-color: #ffffff !important;
  }
</style>
  
<template>
  <div>
    <div class="story-meta">
      <router-link
        :to="{ name: 'user', params: { userId: story.User.id } }"
      >
        <img :src="story.User.photo_url" />
      </router-link>
      <div class="info">
        <router-link
          :to="{ name: 'user', params: { userId: story.User.id } }"
          class="author"
        >
          {{ story.User.username }}
        </router-link>
        <span class="date">{{ story.created_at }}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GlobalStoryMeta",

  props: {
    story: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {type: String, required: false, default: "all"},
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.story.User.username) {
        return this.currentUser.username === this.story.User.username;
      }
      return false;
    },
  }
};
</script>
