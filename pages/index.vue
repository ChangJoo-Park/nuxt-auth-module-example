<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/login">로그인</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="danger" flat @click="requestLogout">로그아웃</v-btn>
        </v-card-actions>

        <div>
          User status:
          <b-badge>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</b-badge>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware: 'auth',
  auth: false,
  components: {
    Logo,
    VuetifyLogo
  },
  methods: {
    requestLogout () {
      this.$auth.logout()
    }
  },
}
</script>
