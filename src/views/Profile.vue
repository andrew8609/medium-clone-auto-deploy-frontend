<template>
  <v-app>
    <Header/>
    <v-container  :class="{
          'container pa-4 my-12': $vuetify.breakpoint.smAndDown,
          'container pa-10 my-12': $vuetify.breakpoint.mdAndUp,
        }">

          <v-row justify="center">
              <div id="preview">
                  <v-avatar size="100" justify="center">
                      <img v-if="url" :src="url" />
                      <img v-else-if="currentUser.photo_url!=null" :src="currentUser.photo_url" />
                      <img v-else-if="currentUser.photo_url==null" src= "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png" />
                    
                  </v-avatar>
              </div>
              <div style="margin-top:20px; margin-left: 30px">
                <v-btn
                  color="green"
                  class="text-none"
                  rounded
                  :loading="isSelecting"
                  @click="onButtonClick"
                >
                  <v-icon left>
                    mdi-cloud-upload
                  </v-icon>
                  {{ buttonText }}
                </v-btn>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                >
              </div>
          </v-row>
          <v-row class="d-flex justify-center align-center">
              <v-text-field
                  label="Username"
                  outlined
                  shaped
                  prepend-inner-icon="mdi-account"
                  v-model="currentUser.username"
              ></v-text-field>
          </v-row>
          <v-row class="d-flex justify-center align-center">
              <v-text-field
                  label="Email"
                  outlined
                  shaped
                  prepend-inner-icon="mdi-email"
                  v-model="currentUser.email"
              ></v-text-field>
          </v-row>
          <v-row class="d-flex justify-center align-center">
              <v-text-field
                  label="Bionote"
                  outlined
                  shaped
                  prepend-inner-icon="mdi-pencil"
                  v-model="currentUser.bio_note"
              ></v-text-field>
          </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-btn
            color="secondary"
            text
            block
            tile
            elevation="0"
            @click="backToPreviousPage()"
            class="pa-6 font-weight-bold"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            
            class="pa-6 font-weight-bold"
            block
            tile
            elevation="0"
            @click="updateProfile()"
          >
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import { mapGetters } from "vuex";
import { UPDATE_PROFILE } from "@/store/actions.type";
import Header from "@/components/Header";

export default {

    data() {
        return {
            avatar: undefined,
            url: null,
            defaultButtonText: 'upload avatar',
            selectedFile: null,
            isSelecting: false
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "currentUser"]),
        buttonText() {
          return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
        }
    },
    components: {
      Header
    },
    methods: {
        backToPreviousPage() {
            this.$router.back();
        },
        onFileChanged(e) {
            this.selectedFile = e.target.files[0]
            this.url = URL.createObjectURL(this.selectedFile);
            this.avatar = this.selectedFile;
        },
        updateProfile() {
            this.$store.dispatch(UPDATE_PROFILE,  {avatar:this.avatar, user: this.currentUser}).then(() => {
                this.$router.push({ name: "dashboard" });
            });
        },
        onButtonClick() {
          this.isSelecting = true
          window.addEventListener('focus', () => {
            this.isSelecting = false
          }, { once: true })

          this.$refs.uploader.click()
        },
   },
};
</script>

