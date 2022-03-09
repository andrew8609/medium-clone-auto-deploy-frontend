<style scoped>
  
button {
    margin:0 auto;
    display:block;
}
</style>
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up with email</h1>
          <div class="text-xs-center" style="margin-top:50px">
            Enter your email address to create an account.
          </div>
         
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <v-container>
            <v-row align="center" justify="center">
              <v-col
                cols="12"
                sm="6"
                md="6"
                align="center"
              >
              <v-form v-model="isEmailValid">
                <v-text-field
                  label="your email"
                  placeholder="your email"
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
              </v-form>
              <v-dialog
                v-model="dialog"
                width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="gray"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    rounded
                    @click.prevent="onSubmit"
                    :disabled="!isEmailValid"
                  >
                    Continue
                  </v-btn>
                </template>
          
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Check your inbox
                  </v-card-title>
          
                  <v-card-text>
                    Click the link we sent to your email to sign up.
                  </v-card-text>
          
                  <v-divider></v-divider>
          
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="onConfirmSentEmail"
                    >
                      OK
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              </v-col>
            </v-row>
          </v-container>
           <p class="text-xs-center">
            <router-link :to="{ path: 'signup' }">
              &lt; All sign up options
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SIGNUP_WITH_EMAIL } from "@/store/actions.type";

export default {
  name: "SigninEmail",
  data() {
    return {
      isEmailValid: false,
      email: "",
      dialog: false,
      emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        v => !!v || 'Email is required',
      ]
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(SIGNUP_WITH_EMAIL, {
          email: this.email
        })
        .then(() => {
          this.dialog = true;
          })
    },
    onConfirmSentEmail() {
      this.dialog = false;
      this.$router.push({name: "landing" });
    }
  }
};
</script>
