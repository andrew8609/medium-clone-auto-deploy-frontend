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
import {FETCH_STORIES} from "@/store/actions.type";

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
        size: this.itemsPerPage
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
    ...mapGetters(["storiesCount", "isLoading", "stories"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchStories();
    }
  },
  mounted() {
    this.fetchStories();
  },
  methods: {
    fetchStories() {
      this.$store.dispatch(FETCH_STORIES, this.listConfig);
      
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
