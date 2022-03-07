<style scoped>
.slidein {
    max-width: 800px;
    padding: 2em 3em;
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    background: rgb(250, 250, 250);
    height: 100%;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease-in-out;
}

/* before the element is shown, start off the screen to the right */
.slide-enter, .slide-leave-active {
  right: -100%;
}

.hashtag{
    background: rgb(196, 191, 192);
    margin-left: 50px;
    width:fit-content;
    height:fit-content;
    left: 0;
    top: 50%;
}

body{
    margin-top:20px;
    background:#ebeef0;
}

.img-sm {
    width: 46px;
    height: 46px;
}

.panel {
    box-shadow: 0 2px 0 rgba(0,0,0,0.075);
    border-radius: 0;
    border: 0;
    margin-bottom: 15px;
}

.panel .panel-footer, .panel>:last-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.panel .panel-heading, .panel>:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.panel-body {
    padding: 25px 20px;
}


.media-block .media-left {
    display: block;
    float: left
}

.media-block .media-right {
    float: right
}

.media-block .media-body {
    display: block;
    overflow: hidden;
    width: auto
}

.middle .media-left,
.middle .media-right,
.middle .media-body {
    vertical-align: middle
}

.thumbnail {
    border-radius: 0;
    border-color: #e9e9e9
}

.tag.tag-sm, .btn-group-sm>.tag {
    padding: 5px 10px;
}

.tag:not(.label) {
    background-color: #fff;
    padding: 6px 12px;
    border-radius: 2px;
    border: 1px solid #cdd6e1;
    font-size: 12px;
    line-height: 1.42857;
    vertical-align: middle;
    -webkit-transition: all .15s;
    transition: all .15s;
}
.text-muted, a.text-muted:hover, a.text-muted:focus {
    color: #acacac;
}
.text-sm {
    font-size: 0.9em;
}
.text-5x, .text-4x, .text-5x, .text-2x, .text-lg, .text-sm, .text-xs {
    line-height: 1.25;
}

.btn-trans {
    background-color: transparent;
    border-color: transparent;
    color: #929292;
}

.btn-icon {
    padding-left: 9px;
    padding-right: 9px;
}

.btn-sm, .btn-group-sm>.btn, .btn-icon.btn-sm {
    padding: 5px 10px !important;
}

.mar-top {
    margin-top: 15px;
}
</style>

<template>
        <v-main class="grey lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                        <v-list align="center" color="transparent">
                            
                            <div v-if="currentUser.id!=story.User.id">
                            <v-btn v-if="isFollowing"
                                rounded
                                color="green"
                                @click.prevent="onClickUnFollow(story.User.id)"
                            >
                               Following
                            </v-btn>
                            <v-btn v-else
                                rounded
                                color="green"
                                @click.prevent="onClickFollow(story.User.id)"
                            >
                               Follow
                            </v-btn>
                            </div>

                            <v-divider class="my-2"></v-divider>
                                Author Follows 
                            <v-divider class="my-2"></v-divider>
                                
                            <div align="center">
                                <span v-if="currentUser.id!=story.User.id">
                                <v-btn icon @click.prevent="onClickClap(story.id)">
                                    <v-icon>mdi-thumb-up</v-icon>
                                </v-btn>
                                {{story.clap_number}}
                                </span>
                                <v-btn style="margin-left:20px" icon @click.prevent="toggle">
                                    <v-icon >mdi-message-text</v-icon>
                                </v-btn>
                            </div>
                        </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet
                        min-height="70vh"
                        rounded="lg"
                        >
                        <div elevation="0" style="margin:50px">
                                <StoryMeta :story="story" type="all"/>
                        </div>
                            <v-divider
                                horizontal
                                inset
                            ></v-divider>
                            
                            <h1 align="center">
                                {{story.title}}
                            </h1>
                            <div style="margin:50px" v-html="story.content"></div>
                            <div class="hashtag">
                               Hashtag: {{story.hashtag}}
                            </div>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>

            <transition name="slide" style="overflow-y: scroll;">
                <div class="slidein" v-if="open">
                    <h1>Comments</h1>                        
                    <CommentList :comments="comments"/>
                    
                </div>
            </transition>
        </v-main>
</template>

<script>
    import { mapGetters } from "vuex";
    import StoryMeta from "@/components/UserMeta/GlobalStoryMeta";
    import { FETCH_STORY, FETCH_COMMENTS, FOLLOW_USER, UNFOLLOW_USER, STORY_RESET_STATE, CLAP_STORY } from "@/store/actions.type";
    import store from "@/store";
    import CommentList from "@/components/Comment/CommentList";

    export default {
        name: 'Home',
        data() {
            return {type:"all",  open: false}
        },
        components: {
            StoryMeta,
            CommentList
        },
        beforeRouteEnter(to, from, next) {

            store.dispatch(STORY_RESET_STATE);
            Promise.all([
                store.dispatch(FETCH_STORY, to.params.storyId),
                store.dispatch(FETCH_COMMENTS, to.params.storyId),
            ]).then(() => {
               next();
            });
        },
        computed: {
            ...mapGetters(["story", "comments", "isFollowing", "currentUser"])
        },
        methods: {
            toggle() {
                this.open = !this.open;
            },
            onClickUnFollow(storyId) {
                store.dispatch(UNFOLLOW_USER, storyId);
            },
            onClickFollow(storyId) {
                store.dispatch(FOLLOW_USER, storyId);
            },
            onClickClap(storyId) {
                store.dispatch(CLAP_STORY, storyId);
            }

        }
    }
</script>