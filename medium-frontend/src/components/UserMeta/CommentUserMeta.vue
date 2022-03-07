<template>
  <div>
    <div class="story-meta">
      <router-link
        :to="{ name: 'profile', params: { username: comment.User.username } }"
      >
        <img :src="comment.User.photo_url" />
      </router-link>
      <div class="info">
        <router-link
          :to="{ name: 'profile', params: { username: comment.User.username } }"
          class="author"
        >
          {{ comment.User.username }}
        </router-link>
        <span class="date">{{ comment.created_at }}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "commentMeta",
  props: {
    comment: { type: Object, required: true }
  },
  components: {
  },

  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.comment.User.username) {
        return this.currentUser.username === this.comment.User.username;
      }
      return false;
    }
  }
};
</script>
