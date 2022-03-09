<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'dashboard' }">
        MEDIUM
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item" v-if="this.$route.path != '/search'">
          <v-text-field
              v-model="searchTerm"
              dense
              label="Search"
              prepend-inner-icon="mdi-magnify"
              @keydown.enter="onSearchTermEntered"
            ></v-text-field>
        </li>
        <li class="nav-item" data-app>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <img v-if="currentUser.photo_url != null" v-on="on" :src="currentUser.photo_url" />
                <img v-else v-on="on" src="https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png" />
            </template>
            <v-list>
              <v-list-item @click.prevent="onClickProfile">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item @click.prevent="onClickWriteStory">
                <v-list-item-title>Write a story</v-list-item-title>
              </v-list-item>
              <v-list-item @click.prevent="onClickStories">
                <v-list-item-title>Stories</v-list-item-title>
              </v-list-item>
              <v-divider horizontal />
              <v-list-item @click.prevent="logout">
                <v-list-item-title>Loguot</v-list-item-title>
              </v-list-item>
            </v-list>       
          </v-menu>
        </li>
        <li class="nav-item" v-if="currentUser.username">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.username }
            }"
          >
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_SEARCHTERM, LOGOUT } from "@/store/actions.type";
export default {
  components: {  },
  data() {
    return {
      searchTerm: ""
    }
  },
  name: "RwvHeader",
  methods: {
    onClickProfile() {
      this.$router.push({ name: "profile" });
    },
    onClickWriteStory() {
      this.$router.push({ name: "editStory" });
    },
    onClickStories() {
      this.$router.push({ name: "myStories" });
    },
    onSearchTermEntered (event) { 
      event.preventDefault();
      this.$store.dispatch(SET_SEARCHTERM, this.searchTerm);
      this.$router.push({ name: "search"}).catch(()=>{});
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push({ name: "landing" });
      });
    },
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
};
</script>
