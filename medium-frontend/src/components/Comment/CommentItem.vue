<style scoped>
  .story-meta .info {
    margin: 0 1.5rem 0 .3rem;
    display: inline-block;
    vertical-align: middle;
    line-height: 1rem;
  }
</style>
<template>
    <div>
        <CommentUserMeta :comment="comment"/>
        <p style="margin-left:20px">      
          <v-btn v-if="!comment.depth"
            fab
            dark
            color="cyan"
            max-width="20"
            max-height="20"
            @click="onClickEditButton"
            right
          >
            <v-icon size="17">
              mdi-pencil
            </v-icon>
          </v-btn>
          {{comment.content}}  
        </p>
        <v-row no-gutters v-if="isClickedEditButton">
          <v-col cols="11">
            <v-text-field
                v-model="new_content"   
                placeholder="Please add comment."
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn
              fab
              dark
              color="cyan"
              max-width="20"
              max-height="20"
              @click="onClickSaveButton"
              right
              style="margin-top:10px"
            >
              <v-icon size="17" >
                mdi-content-save
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
    </div>
</template>

<script>
import CommentUserMeta from "@/components/UserMeta/CommentUserMeta";
import { CREATE_COMMENT } from "@/store/actions.type";
import store from "@/store";

export default {
  name: "commentMeta",
  data() {
    return {
      isClickedEditButton: false,
      new_content: ""
      }
  },
  props: {
    comment: { type: Object, required: true },
  },
  components: {
    CommentUserMeta
  },
  methods: {
    onClickEditButton() {
      this.isClickedEditButton = !this.isClickedEditButton;
    },
    onClickSaveButton() {
       store.dispatch(CREATE_COMMENT, {content:this.new_content, depth: 1, parent_id: this.comment.id});
       this.isClickedEditButton = false;
       this.new_content = "";
    }
  }
};
</script>
