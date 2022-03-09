<style scoped>
    .v-application .info {
        background-color: #c1e9e3 !important;
        border-color: #c1e9e3 !important;
    }
</style>
<template>
  <div>
    <div class="story-meta">
      <div class="info">
        <span class="date">{{story.created_at}}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "storyMeta",
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
