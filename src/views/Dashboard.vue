<template>
    <div>
        <v-container fluid>
            <v-row class="pa-md-4 mx-lg-auto" style="margin-top:30px">
                    <h3>People you follow</h3>
            </v-row>
            <v-card v-if="followers.length!=0">
                <span v-for="follower in followers" :key="follower.id">
                <router-link
                        :to="{ name: 'user', params: { userId: follower.id } }"
                    >
                    <v-avatar 
                        color="orange"
                        size="70"
                        style="margin:7px" 
                    >                 
                        <v-img  :src="follower.photo_url"/>    
                    </v-avatar>
                </router-link>
                </span>
            </v-card>
            <v-container v-else>
                &nbsp;&nbsp; No following people yet
            </v-container>
            <StoryList />
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryList from "@/components/ListComponents/StoryList"
import {FETCH_FOLLOWERS, FETCH_HASHTAGS} from "@/store/actions.type";
export default {
    components: {
        StoryList
    },
    mounted() {
        this.$store.dispatch(FETCH_FOLLOWERS);
        this.$store.dispatch(FETCH_HASHTAGS);
    },
    computed: {
        ...mapGetters(["followers"])
    }
}
</script>
