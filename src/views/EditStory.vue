<template>
  <div>
    <Header/>
    <div style="margin:50px;text-align: center;">
        <v-card 
          class="pa-3 text-center"
        
        >
          <h3 style="margin-left:50px; font-weight: bold; margin-top:60px">
              Title:
          </h3>
          <v-col cols="6">
              <v-text-field
                          v-model="story.title"
                          placeholder="Please add title for your article."
              ></v-text-field>
          </v-col>
          <!-- <editor v-model="story.title" theme="bubble" style="margin-bottom:50px"></editor> -->
          <h3 style="margin-left:50px; font-weight: bold;">
              Content:
          </h3>
          <editor v-model="story.content" theme="snow"></editor>
          <h3 style="margin-left:50px; font-weight: bold; margin-top:60px">
              Hashtag:
          </h3>
          <v-combobox
            v-model="story.hashtag"
            chips
            clearable
            label="Input Tags"
            multiple
            prepend-icon="mdi-filter-variant"
            solo
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeChip(item)"
              >
                <strong>{{ item }}</strong>&nbsp;
              </v-chip>
            </template>
          </v-combobox>
          
          <v-col  align="center">
            <v-btn
              @click.stop="backToPreviousPage"
              style="margin-right: 50px"
            >
              Back
            </v-btn>
            <v-btn     
                @click="onClickPublish(story.id)"
            >
              Publish
            </v-btn>
            
          </v-col>
        
        </v-card>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import { UPDATE_STORY, PUBLISH_STORY, STORY_RESET_STATE, FETCH_STORY, FETCH_STORY_HASHTAGS } from "@/store/actions.type";
import Header from "@/components/Header";
import store from "@/store";

    export default {
        name: 'Home',
    beforeRouteUpdate(to, from, next) {
        store.dispatch(STORY_RESET_STATE);
        return next();
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch(STORY_RESET_STATE);
        if (to.params.storyId !== undefined) {
          await store.dispatch(FETCH_STORY, to.params.storyId);
          await store.dispatch(FETCH_STORY_HASHTAGS, to.params.storyId);
        }
        return next();
    },
    async beforeRouteLeave(to, from, next) {
        await store.dispatch(STORY_RESET_STATE);
        next();
    },
    components: {
      Header
    },
    methods: {
        onClickPublish(storyId) {
            let action = storyId ? UPDATE_STORY:PUBLISH_STORY;
            this.$store.dispatch(action).then(() => {
                this.$router.push({ name: "dashboard" });
            });
        },
        removeChip (item) {
            this.story.hashtag.splice(this.story.hashtag.indexOf(item), 1)
            this.story.hashtag = [...this.story.hashtag]
        },
        backToPreviousPage() {
            this.$router.back();
        },
    },
    computed: {
        ...mapGetters(["story"]),

    },
  }
</script>
