<style scoped>
    img {
        width: 100px;
        height: 100px;
    };
    .brief-content {
        font-weight: 300;
        font-size: 24px;
        color: rgb(175, 93, 93) !important;
        margin-bottom: 15px;
        font-size: 1rem;
        line-height: 1.3rem;
    };
</style>
<template>
    <v-container>
        <div style="margin:40px">            
        <h2><b>#</b>{{hashtagStories.hashtag_name}}</h2>
        </div>
        <v-divider horizontal />
        <div v-for="(story, index) of hashtagStories.stories" :key=index>
            <router-link :to="viewStoryLink(story.Story.id)" class="preview-link">
                <v-row >
                    <v-col cols="9">
                        <h6>{{story.Story.created_at}}</h6>
                        <h4><b>{{story.Story.title}}</b></h4>
                        <div class="brief-content" v-if="story.Story.content_pure">{{briefStory(story.Story.content_pure)}}</div>
                    </v-col>
                    <v-col cols="3" align="center"
                        justify="center">
                        <div v-if="getImage(story.Story.content)" v-html="getImage(story.Story.content)">
                        </div>
                        <img v-else src="https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"/>       
                    </v-col>
                </v-row>
            </router-link>      
            <v-divider horizontal />
        </div>
    </v-container>
</template>
<script>

 import { mapGetters } from "vuex";
 import { FETCH_HASHTAG_STORIES, RESET_HASHTAGSTORIES } from "@/store/actions.type";
 import store from "@/store";

export default {
    name: "PublicProfile",
    async beforeRouteEnter(to, from, next) {
    
        store.dispatch(FETCH_HASHTAG_STORIES, to.params.hashtagId); 
        next();
    },
    computed: {
        ...mapGetters(["hashtagStories"]),
    },
    async beforeRouteUpdate(to, from, next) {
        
        await store.dispatch(RESET_HASHTAGSTORIES);
        await store.dispatch(FETCH_HASHTAG_STORIES, to.params.hashtagId); 
        return next();
    },
    methods: {
        briefStory(content_pure) {
            if(content_pure){
                return String.fromCharCode(...content_pure.data.slice(0, 60));
            }
            return null; 
        },
        getImage(content) {
            var div = document.createElement('div');          // removes html tags and make another field
            div.innerHTML = String.fromCharCode(...content.data);
            var elements = div.getElementsByTagName('img');
            elements[0].style.cssText +='width:100px;height:100px';
            return elements[0].outerHTML;
        },
        viewStoryLink(storyId) {
            return {
                name: "story",
                params: {
                storyId: storyId
                }
            };
        },
    }

}
</script>
