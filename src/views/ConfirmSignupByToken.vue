<template>
    
    <div class="home-tag">
      <v-dialog
        v-model="dialog"
        width="500"
      >

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Successfully Signed up
          </v-card-title>
  
          <v-card-text>
            Please sign in to continue.
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              dark
              @click="confirmedSentEmail"
              rounded
            >
              ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { CONFIRM_SIGNUP_BY_TOKEN } from "@/store/actions.type";

export default {
  name: "ConfirmSignupByToken",
  data() {
    return {
      dialog: false,
      confirmed: false,
    }
  },
  mounted() {
    console.log("confirm sign up by token");
    this.$store.dispatch(CONFIRM_SIGNUP_BY_TOKEN, { token: this.$route.query.token})
    .then(()=>{
      this.dialog = true;
      
    });
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  },
  watch: {
    confirmed(newValue) {
      if(newValue) {
        this.$router.push({name: "landing" });
      }   
    }
  },
  methods: {
    confirmedSentEmail() {
      this.dialog = false;
      this.confirmed = true;
    }
  }
};
</script>
