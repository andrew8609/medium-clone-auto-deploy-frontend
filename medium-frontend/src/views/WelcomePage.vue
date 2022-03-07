<template>
    
    <div class="home-tag">
        <div>Welcome to Medium</div>
        <v-container>
        <div>
            <router-link class="btn btn-lg btn-primary center" :to="{ name: 'dashboard' }" tag="button"><button class="btn btn-lg btn-primary center">Login</button></router-link>
        </div>
        </v-container>
    </div>
</template>

<script>
import JwtService from "@/common/jwt.service";

export default {
    name: "welcomePage",
    beforeRouteEnter(to, from, next) {
        JwtService.saveAccessToken(to.query.accessToken);
        JwtService.saveRefreshToken(to.query.refreshToken);
        next();
    },
    methods: {
        onSubmit() {
            this.$router.push({name: "dashboard" });
        }
    }
};
</script>