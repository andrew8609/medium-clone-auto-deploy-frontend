<template>
    
    <div class="home-tag">
      <div>Please wait until confirmation is done.</div>
    </div>
</template>

<script>
import { CONFIRM_SIGNIN_BY_TOKEN } from "@/store/actions.type";

export default {
  name: "ConfirmSigninByToken",
  mounted() {
    this.$store.dispatch(CONFIRM_SIGNIN_BY_TOKEN, { token: this.$route.query.token})
    .then(()=>{
      this.$router.push({path: '/dashboard' });
    });
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
