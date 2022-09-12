<style>
  @import './assets/main.css';
  
</style>

<template>
  <v-app id="inspire">
    <v-main>
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
Vue.use(VueReCaptcha, { siteKey: '6LdWAwgfAAAAAN89nESjC4NIZCXK_cFxVO0Ac5gw' })
// here site key should be replaced by yours.

export default {
  name: "App",
};
</script>

