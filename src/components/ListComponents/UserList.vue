<template>
  <div>
    
    <div v-if="userListIsLoading" class="article-preview">Loading people...</div>
    <div v-else>
      <div v-if="users.length === 0" class="article-preview">
        No users are here.
      </div>
      <UserListItem
        v-for="(user, index) in users"
        :user="user"
        :key="index"
      />
      <Pagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserListItem from "./UserListItem";
import Pagination from "@/components/Pagination";
import {SEARCH_USERS} from "@/store/actions.type";
// import store from "@/store";

export default {
  name: "UserList",
  components: {
    UserListItem,
    Pagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    searchType: {
        type: String,
        required: false,
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 3
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const type = this.type;
      const filters = {
        page: this.currentPage - 1,
        size: this.itemsPerPage,
        searchType: this.searchType,
        searchTerm: this.searchTerm
      };
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.userListIsLoading || this.usersCount <= this.itemsPerPage) {
        return [];
      }

      return [
        ...Array(Math.ceil(this.usersCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["usersCount", "userListIsLoading", "users", "searchTerm"]),
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchUsers();
    },
    searchTerm: {
        handler: function() {
            this.fetchUsers();
        },
         immediate: true,
    },
    searchType: {
        handler: function() {
            this.fetchUsers();
        },
        immediate: true,
    }
    // type() {
    //   this.resetPagination();
    //   this.fetchusers();
    // },
    // author() {
    //   this.resetPagination();
    //   this.fetchusers();
    // },
    // tag() {
    //   this.resetPagination();
    //   this.fetchusers();
    // },
    // favorited() {
    //   this.resetPagination();
    //   this.fetchusers();
    // }
  },
  mounted() {
    //this.$store.dispatch(FETCH_FOLLOWERS);
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch(SEARCH_USERS, this.listConfig);
      
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
