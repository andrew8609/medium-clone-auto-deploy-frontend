<style scoped>
  .v-application .blue {
    background-color: #DFCBB6 !important
  }
</style>

<template>
<div>
  <Header/>     
    <v-container>
      <v-app>
        <v-card>
        <v-toolbar
            color="blue"
            flat
        >
            <v-toolbar-title>
              <v-col>
                <h1>Your Stories</h1>
            </v-col></v-toolbar-title>
    
            <v-spacer></v-spacer>
    
            <template v-slot:extension>
            <v-tabs
                v-model="tab"
                align-with-title
            >
                <v-tabs-slider color="yellow"></v-tabs-slider>
    
                <v-tab href="#tab-1">
                    Published
                </v-tab>
                <v-tab href="#tab-2">
                    Responses
                </v-tab>
            </v-tabs>
            </template>
        </v-toolbar>
    
        <v-tabs-items v-model="tab">
          <v-tab-item           
            :key="1"
            :value="'tab-' + 1"
          >
            <v-card flat>
              <div class="container page">
              <div class="row">
                <div class="col-md-9">
                  <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                        <StoryList type="mine" />
                    </ul>
                  </div>
                  <router-view></router-view>
                </div>
              </div>
            </div>
            </v-card>
          </v-tab-item>
          <v-tab-item
            :key="2"
            :value="'tab-' + 2"
          >
            <v-card flat>
              <div class="container page">
                <div class="row">
                  <div class="col-md-9">
                    <div class="feed-toggle">
                      <ul class="nav nav-pills outline-active">
                        <StoryList type="mine" />
                      </ul>
                   </div>
                   <router-view></router-view>
                  </div>
                </div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <v-container >
          <div class="text-xs-center">
            <v-btn
              rounded
              style="background-color: green"
              text
              @click.stop="backToPreviousPage"
            >
              Back
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </v-app>
  </v-container>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryList from "@/components/ListComponents/StoryList";
import Header from "@/components/Header";

export default {
  name: "MyStories",
  data() {
    return {
      tab: 0
    }
  },
  components: {
    StoryList,
    Header
  },

  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"]),
    
  },
  methods: {
    backToPreviousPage() {
            this.$router.back();
        },
  }
};
</script>
