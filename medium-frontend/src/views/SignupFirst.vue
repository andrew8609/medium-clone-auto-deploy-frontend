<style scoped>
    div a {
        float: left;
    }
    div .col-md-12 {
        margin-top: 30px;
        margin-bottom: 70px;
        padding-left:120px;
    }
</style>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="column">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">You have to signup first.</h1>
              <div class="col-md-12">
                  <a class="btn btn-outline-dark" href="/users/googleauth" role="button" style="text-transform:none">
                  <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                  Sign up with Google
                  </a>
              </div>
            <p class="text-xs-center">
                <router-link :to="{ name: 'login' }">
                No account? Create one.
                </router-link>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions.type";

export default {
  name: "SignupFirst",
  data() {
    return {
      username: "",
      email: "",
      password: ""
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
        .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>