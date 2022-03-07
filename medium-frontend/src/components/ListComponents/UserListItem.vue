<template>
<v-row>
    <v-col cols="12" dense>
        
        <v-list two-line >
            <v-list-item  >
                <v-list-item-avatar>
                    <v-img :src="user.photo_url"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="user.username"></v-list-item-title>
                    <v-list-item-subtitle v-html="user.bio_note"></v-list-item-subtitle>
                </v-list-item-content>               
                <v-btn v-if="!isFollowedByMe"
                    rounded
                    color="green"
                    @click="onClickFollow(user.id)"
                >
                    Follow
                </v-btn>     
                 <v-btn v-else
                    rounded
                    color="green"
                    @click="onClickFollow(user.id)"
                >
                    Following
                </v-btn>     
            </v-list-item>
        </v-list>
    </v-col>
</v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "UserListItem",
    props: {
            user: {
                type: Object,
                required: false,
            },
    },
    methods: {
        onClickFollow(userId) {
            console.log(userId);
        }
    },
    computed: {
        ...mapGetters(["currentUser", "followers"]),
        isFollowedByMe(){
            return true;
        }
    }
};
</script>