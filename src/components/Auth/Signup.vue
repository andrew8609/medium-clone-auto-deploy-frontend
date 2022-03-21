<template>
  <v-container>
  <v-row>
    <v-col align="center" justify="center">
          <h1 class="text-xs-center">Join medium.</h1>
              <div style="margin: 30px">
              <v-btn
                rounded
                outlined
                 :href = "oauth_url"
                 align="center"
                 justify="center"
                 style="width: 300px"
              >
              <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Sign up with Google
              </v-btn>
              </div>
              <div >
              <v-btn
                rounded
                outlined
                 align="center"
                 justify="center"
                 style="width: 300px"
              >
               <router-link :to="{ path: 'signupEmail' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
                    </svg>
                    &nbsp;&nbsp;Sign up with email
                </router-link>
              </v-btn>
              </div>

            <div align="center" style="margin-top: 100px">
                <router-link :to="{ path: '/signin' }">
                Already have an account? Sign in
                </router-link>
            </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions.type";
 import { BACKEND_DOMAIN } from "@/common/config";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      oauth_url: `${BACKEND_DOMAIN}/api/google?requestType=signup`
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => this.$router.push({ name: "dashboard" }));
    }
  }
};
</script>