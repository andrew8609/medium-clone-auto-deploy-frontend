<template>
    <v-app>
        <v-card color="grey lighten-4" flat tile>
            <v-toolbar >                 
                <v-toolbar-title><div class="font-weight-medium">Medium</div></v-toolbar-title>     
                <v-spacer></v-spacer>
                <router-link :to="{path: 'signin'}" tag="div">
                    <v-btn class="ma-2" outlined color="#009688" rounded>
                        Log In
                    </v-btn>
                </router-link>
                <router-link :to="{path: 'signup'}" tag="div">
                    <v-btn class="ma-2" outlined color="#2979FF" rounded>
                        Sign Up
                    </v-btn>
                </router-link>
            </v-toolbar>
        </v-card>
        <v-container fluid>
            <v-row class="yellow" style="border-bottom: 1px solid black !important">
                <v-col cols="12" md="2">           
                </v-col>
                <v-col cols="12" md="8">
                    <v-col cols="12" md="6">               
                        <v-row  align="center" style="font-size:3.5em; line-height: 1em;" class="pa-md-4">
                            Medium is a place to write, read, and connect
                        </v-row>
                        <v-row class="pa-md-4 mx-lg-auto" align="center" >
                            It's easy and free to post your thinking on any topic and connect with millions of readers.
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                    </v-col>
                </v-col>
                <v-col cols="12" md="2"></v-col>
            </v-row>
        </v-container>
        <v-container align="center">
            <v-row class="pa-md-4 mx-lg-auto">
                <h3>Trending Blogs On Medium</h3>
            </v-row>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col
                            v-for="(story, i) in this.stories" 
                            :key="i"
                            cols="4"
                        >
                            <v-card height="200">
                                <v-col cols="12" md="10">
                                    <v-row dense align="center">
                                        <v-col cols="12" md="3">
                                            <v-avatar>
                                                <img v-bind:src="story.User.photo_url">
                                            </v-avatar>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <div>{{story.User.username}}</div>
                                            <div>{{story.created_at}}</div>
                                        </v-col>
                                        
                                    </v-row>
                                    <router-link :to="viewStoryLink(story.id)" class="preview-link">
                                        <v-row class="pa-md-4 mx-lg-auto">
                                            <h5><b>{{story.title}}</b></h5>
                                        </v-row>
                                        <v-row class="pa-md-4 mx-lg-auto">
                                            <h6>{{briefStory(story.content_pure)}}...</h6>
                                        </v-row>
                                    </router-link>
                                </v-col>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>            
            <v-row></v-row>
        </v-container>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import {FETCH_STORIES} from "@/store/actions.type";
export default {
    name: 'landing-page',
    computed: {
        listConfig() {
          const type = "all";
          const filters = {
            page: 0,
            size: 6
          };
          return {
            type,
            filters
          };
        },
         ...mapGetters(["stories"])
    },
    mounted() {
      this.$store.dispatch(FETCH_STORIES, this.listConfig);
    },
    methods: {
        viewStoryLink(storyId) {
            return {
                name: "story",
                params: {
                storyId: storyId
                }
            };
        },
        briefStory(content_pure) {
            if(content_pure){
                return String.fromCharCode(...content_pure.data.slice(0, 60));
            }
            return null; 
        },
    }
}
</script>

