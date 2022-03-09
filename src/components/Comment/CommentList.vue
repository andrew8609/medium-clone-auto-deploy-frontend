<style scoped>
  .nested-comment {
    float:left;  
    overflow-y: auto;
    height: 700px;
    margin-top: 20px
  }
  .nowrap-overflow {
    flex-wrap: nowrap;
    overflow-x: auto;
}
</style>
<template>
    <div >
      <p>
        <v-col
            cols="12"
            sm="12"
        >
          <v-textarea
            v-model="root_comment"
            class="mx-2"
            label="Your Thought"
            rows="1"
            prepend-icon="mdi-comment"
          ></v-textarea>
          <v-btn outline dark style="text-align: center;" @click.prevent="onClickSaveRootCommentButton">Save
          </v-btn>
        </v-col>   
      </p>
      <v-divider></v-divider>
      <v-treeview class="nested-comment"
        :items="this.comments"
      >
        <template v-slot:label="{ item }">
          <CommentListItem :comment ="item"/>
        </template>
      </v-treeview>
    </div>
</template>

<script>

import CommentListItem from "@/components/Comment/CommentItem"
import { CREATE_COMMENT } from "@/store/actions.type";
import store from "@/store";

export default ({
  name:"component",
  components: {
    CommentListItem
  },
  data() {
    return {
      root_comment: ""
      }
  },
  props: {
    comments: { type: Array, required: true }
  },
  methods: {
    onClickSaveRootCommentButton() {
      store.dispatch(CREATE_COMMENT, {content:this.root_comment, depth: 0, parent_id: 0});
      this.root_comment = "";
    }
  }
})
</script>

  