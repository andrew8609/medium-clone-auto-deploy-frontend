<style scoped>
  .divider{
    width:20px;
    height:auto;
    display:inline-block;
}
</style>
<template>
  <div class="story-preview">
    <div v-if="this.type=='all'">
      <GlobalStoryMeta :story="story"/>
      <router-link :to="viewStoryLink" class="preview-link">
        <h1 v-text="story.title" />       
        <p v-text="briefStory" />
        
      </router-link>
    </div>
    <div v-else-if="this.type=='mine'">
      <PrivateStoryMeta :story="story"/>
      <router-link :to="viewStoryLink" class="preview-link">
        <h1 v-text="story.title" />       
        <p v-text="briefStory" />
      </router-link>
      <div style="margin-left:200px">
        <router-link :to="editStoryLink" class="preview-link">
          <v-btn
            color="green lighten-2"
            elevation="2"
          >Edit</v-btn>
        </router-link>
        
        <div class="divider"/>
      
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Delete
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Are you sure to delete this article?
          </v-card-title>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click.stop="deleteStoryLink"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalStoryMeta from "@/components/UserMeta/GlobalStoryMeta";
import PrivateStoryMeta from '../UserMeta/PrivateStoryMeta.vue';
import { DELETE_STORY } from "@/store/actions.type";

export default {
  name: "StoryListItem",
  components: {
    GlobalStoryMeta,
    PrivateStoryMeta
  },
  data: () => (
    {
      dialog: false,
    }
  ),
  props: {
    story: { type: Object, required: true },
    type: { type: String, required: false, default: "all" },
  },
  computed: {
    editStoryLink() {
      return {
        name: "editStory",
        params: {
          storyId: this.story.id
        }
      };
    },
    viewStoryLink() {
      return {
        name: "story",
        params: {
          storyId: this.story.id
        }
      };
    },
    briefStory() {
      if(this.story.content_pure){
        return String.fromCharCode(...this.story.content_pure.data.slice(0, 100));
      }
      return null;
    }
  },
  methods: {
    deleteStoryLink() {
      this.$store.dispatch(DELETE_STORY, this.story.id).then(() => {
          this.$router.push({ name: "dashboard" });
      });
    }
  }
};
</script>
