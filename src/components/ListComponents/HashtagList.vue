<template>
    <div class="pa-4">
            <v-chip-group
              active-class="primary--text"
              column
            >
              <v-chip
                v-for="hashtag in hashtags"
                :key="hashtag.id"
                @click="onClickHashtag(hashtag.id)"
              >
                {{ hashtag.hashtag_name }}
              </v-chip>
            </v-chip-group>
          </div>
</template>
<script>

import { mapGetters } from "vuex";
import { SEARCH_HASHTAGS } from "@/store/actions.type";

export default {
    name: "HashtagList",
    props: {
        searchType: {
            type: String,
            required: false,
        },
    },
    computed: {
        listConfig() {
            const filters = {
                searchType: this.searchType,
                searchTerm: this.searchTerm
            };
            return filters;
        },
        ...mapGetters(["hashtags", "searchTerm"]),
    },
    methods: {
        onClickHashtag(hashtagId) {
            this.$router.push({ name: "hashtag" , params: { hashtagId: hashtagId }});

        },
        searchHashtags() {
            this.$store.dispatch(SEARCH_HASHTAGS, this.listConfig);
        },
    },
    watch: {
        searchTerm: {
            handler: function() {
                this.searchHashtags();
            },
            immediate: true,
        },
        searchType: {
            handler: function() {
                this.searchHashtags();
            },
            immediate: true,
        }
    }
}
</script>
