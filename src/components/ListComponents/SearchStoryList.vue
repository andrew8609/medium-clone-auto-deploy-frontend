<template>
  <div> 
    <div v-if="isLoading" class="article-preview">Loading stories...</div>
    <div v-else>
      <div v-if="stories.length === 0" class="article-preview">
        No stories are here.
      </div>
      <StoryListItem
        v-for="(story, index) in stories"
        :story="story"
        :key="story.title + index"
        :type="type"
      />
      <Pagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryListItem from "./StoryListItem";
import Pagination from "@/components/Pagination";
import {  SEARCH_STORIES} from "@/store/actions.type";

export default {
  name: "StoryList",
  components: {
    StoryListItem,
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
      if (this.isLoading || this.storiesCount <= this.itemsPerPage) {
        return [];
      }

      return [
        ...Array(Math.ceil(this.storiesCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["storiesCount", "isLoading", "stories", "searchTerm"]),
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.searchStories();
    },
    searchTerm: {
        handler: function() {
            this.searchStories();
        },
        immediate: true,
    },
    searchType: {
        handler: function() {
            this.searchStories();
        },
        immediate: true,
    }
  },
  mounted() {
    this.searchStories();
  },
  methods: {
    searchStories() {
      this.$store.dispatch(SEARCH_STORIES, this.listConfig);
      
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
