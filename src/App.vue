<template>
  <div id="app">
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">KRATE</b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item @click="goToDash">Home</b-navbar-item>
          <b-navbar-item href="/">Get Krates</b-navbar-item>
          <b-navbar-item href="/">More</b-navbar-item>
        </template>
        <template slot="end">
          <!-- Here we can put the profile info -->
          <b-navbar-item v-if="$store.getters.isLoggedIn">
            <user-tile></user-tile>
          </b-navbar-item>
          <b-navbar-item tag="div">
            <div class="buttons">
              <b-button
                type="is-primary"
                @click="goToRegistration"
                v-if="!$store.getters.isLoggedIn"
              >Sign up</b-button>
              <b-button type="is-default" @click="goToLogin" v-if="!$store.getters.isLoggedIn">Login</b-button>
              <b-button type="is-primary" v-if="$store.getters.isLoggedIn" @click="logout">Logout</b-button>
              <b-button type="is-danger" @click="refreshData" icon-right="spinner">Refresh</b-button>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
      <router-view></router-view>
    </div>
    <!--  -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import LoginForm from '@/components/LoginForm.vue';
import UserTile from '@/components/navbar/UserTile.vue';
const Pusher = require('pusher-js');
Pusher.logToConsole = true;

@Component({
  components: {
    HelloWorld,
    LoginForm,
    UserTile
  }
})
export default class App extends Vue {
  subscribe() {
    let pusher = new Pusher('cde50782002bdadd67b6', { cluster: 'us2' });
  }

  refreshData() {
    this.$store.dispatch('initFromServer');
    this.$store.dispatch('providers/init');
  }
  logout() {
    this.$store.dispatch('logout').then(response => {
      this.$router.push('/login');
    });
  }

  goToLogin() {
    this.$router.push({ name: 'login' });
  }

  goToRegistration() {
    this.$router.push({ name: 'register' });
  }

  goToDash() {
    if (
      this.$store.getters.isLoggedIn === true &&
      this.$store.getters.accountType === 'organizer'
    ) {
      //goto the admin dash
      this.$router.push({ name: 'admindash' });
    } else if (this.$store.getters.isLoggedIn === true) {
      //goto the user dash
      this.$router.push({ name: 'userdash' });
    } else {
      this.$router.push({ name: 'login' });
    }
  }

  mounted() {
    let self = this;
    const pusher = new Pusher('cde50782002bdadd67b6', {
      cluster: 'us2',
      forceTLS: true
    });

    const channel = pusher.subscribe(
      'user-channel-' + this.$store.getters.userId
    );

    const providerChannel = pusher.subscribe(
      'provider-channel-' + this.$store.getters.kratespace_id
    );

    channel.bind('usertask-approved', function(data: any) {
      console.log('messaged received');
      console.log(data);
      //alert(data);
      self.$buefy.toast.open({ message: data });
      self.$store.dispatch('spaces/approveUsertask', data.usertaskId);
      self.$store.dispatch('addXp', data.xp);
    });

    channel.bind('given-experience', function(data: any) {
      self.$buefy.toast.open({ message: data });
      self.$store.dispatch('addXp', data.xp);
    });

    providerChannel.bind('usertask-added', function(data: any) {
      console.log('new usertask message received');
      self.$buefy.toast.open({ message: data });
      console.log(data);
      //alert(data);
      self.$store.dispatch('providers/addUsertask', data);
    });
  }
}
</script>

<style>
#app {
}
</style>
