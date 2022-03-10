<template>
<div>
        <v-navigation-drawer 
          v-model="drawer"
          permanent
          app
        >
            <br><br><br><br><br><br>
            <main>
                <v-list>
                <v-list-item
                    v-for="[icon, text, href] in links"
                    :key="icon"
                    link
                    :href="href"
                    color="primary darken-1" 
                >
                    <v-list-item-icon color="primary darken-1" >
                        <v-icon color="primary darken-1" >{{icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content color="primary darken-1" >
                        <v-list-item-title color="primary darken-1" >{{text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            </main>
            <template v-slot:append>
                <v-divider></v-divider>
                <v-sheet 
                    align="center"
                    justify="center"
                >
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-avatar>
                                <img v-if="currentUser.photo_url!=undefined" v-on="on" :src="currentUser.photo_url" />
                                <img v-else v-on="on" src="https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png" />
                            </v-avatar>
                        </template>
                        <v-list>
                        <v-list-item @click.prevent="onClickProfile">
                            <v-list-item-title>Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click.prevent="logout">
                            <v-list-item-title>Log out</v-list-item-title>
                        </v-list-item>
                        </v-list>
                        
                    </v-menu>
                </v-sheet>
            </template>
        </v-navigation-drawer>
      
        <v-container style="margin-left:40px">
            <router-view> </router-view>
        </v-container>
        <v-navigation-drawer
          app
          clipped
          right
        >
        <v-sheet 
                class="pa-4" 
                align="center"
                justify="center"
            >             
                <h1>MEDIUM</h1>
            </v-sheet>
            <v-sheet v-if="isCurrentRoutePublicProfile==true">
                <div style="margin:20px">
                    <v-text-field
                        v-model="searchTerm"
                        dense
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        @keydown.enter="onSearchTermEntered"
                    ></v-text-field>
                </div>
                <v-container align="center" justify="center">
                    <h3>Topics:</h3>
                    <v-chip-group
                        active-class="primary--text"
                        column
                    >
                        <v-chip
                            v-for="hashtag in rightSideHashtags"
                            :key="hashtag.id"
                            @click="onClickHashtag(hashtag.id)"
                        >
                            {{ hashtag.hashtag_name }}
                        </v-chip>
                    </v-chip-group>
                </v-container>
            </v-sheet>
            <v-sheet 
                v-else
                class="pa-4" 
                align="center"
                justify="center"
            >
                <div style="margin:20px">
                    <v-text-field
                        v-model="searchTerm"
                        dense
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        @keydown.enter="onSearchTermEntered"
                    ></v-text-field>
                </div>

                <v-avatar 
                    class="mb-4"
                    color="primary"
                    size="64" 
                >
                    <img v-if="publicProfile.photo_url != null" :src="publicProfile.photo_url"/>
                    <img v-else src="https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"/>
                </v-avatar>                
                <h3>{{publicProfile.username}}</h3>
                <h6>{{publicProfile.bio_note}}</h6>
            </v-sheet>
        </v-navigation-drawer>
</div>
</template>

<script>
import {
    mdiAccountTie,
    mdiHomeAnalytics, 
    mdiPencilBoxOutline,
    mdiMessageBadge,
    mdiFormatListGroup 
} from '@mdi/js';
import { mapGetters } from 'vuex';
import { SET_SEARCHTERM, LOGOUT } from "@/store/actions.type";
export default {
    name: "DashboardLayout",
    data: () => ({
        userLink: mdiAccountTie,
        mini: true,
        drawer: false,
        searchTerm: "",
        links: [
           [mdiHomeAnalytics, 'Home', '/dashboard'],
            [mdiFormatListGroup, 'List', '/myStories'],
            [mdiPencilBoxOutline, 'Write', '/editStory'],
            [mdiMessageBadge, 'Nofitication', '/editStory'],
        ],
        siteLogo: '../../asssets/logo.png',
        googlehref: '/profile'
    }),
    computed: {
         ...mapGetters(['rightSideHashtags', "currentUser", "publicProfile"]),
         isCurrentRoutePublicProfile() {
            if(this.$route.name == "user") {
                return false;
            } else {
                return true;
            }
        }

    },
    methods: {
        onClickProfile() {
            this.$router.push({ name: "profile" });
        },
        onSearchTermEntered (event) { 
            event.preventDefault();
            Promise.all([
                this.$store.dispatch(SET_SEARCHTERM, this.searchTerm)
            ]).then(() => {
                 this.$router.push({ name: "search"}).catch(()=>{});
            });
        },
         logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "landing" });
            });
        },
        onClickHashtag(hashtagId) {
            this.$router.replace({ name: "hashtag" , params: { hashtagId: hashtagId }}).catch(()=>{});

        },
    }
}
</script>
