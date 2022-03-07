<template>
<v-container>
        <v-row>
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >       
                <v-row>
                    <v-col cols="12">
                        <h1>Search Results For: {{searchTerm}}</h1>
                
                        <v-btn-toggle dense
                        v-model="selectedSearchCategory"
                        v-on:change="onClickTab()"
                        tile
                        color="deep-purple accent-3"
                        group
                        >
                        <v-btn v-for="(searchCategory, index) in searchTypes" :key="index">
                            {{searchCategory}}
                        </v-btn>
                        </v-btn-toggle>
                    <v-divider></v-divider>
                    <v-card>
                    <div class="container page">
                    <div class="row">
                        <div class="col-md-9">
                        <div class="feed-toggle">
                            <ul class="nav nav-pills outline-active">
                                
                                <SearchStoryList v-if="searchType=='title' || searchType=='content'" type="all" :searchType="searchType" />
                                <UserList v-else-if="searchType=='people'" type="all" :searchType="searchType" />
                                <HashtagList v-else-if="searchType=='hashtags'" type="all" :searchType="searchType" />
                            </ul>
                        </div>
                        <router-view></router-view>
                        </div>
                    </div>
                    </div>
                    </v-card>
                    </v-col>
                    </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import SearchStoryList from "@/components/ListComponents/SearchStoryList";
import UserList from "@/components/ListComponents/UserList";
import HashtagList from "@/components/ListComponents/HashtagList";

import { mapGetters } from "vuex";
export default {
    data() {
        return {
            searchType: "title",
            searchTypes: ["title", "content", "people", "hashtags"],
            selectedSearchCategory: 0
        }
    },
    components: {
        SearchStoryList,
        UserList,
        HashtagList
    },
    methods: {
        onClickTab() {
            this.searchType = this.searchTypes[this.selectedSearchCategory];
        },
        
    },
    computed: {
         ...mapGetters(["searchTerm"]),
    },
 
};
</script>

