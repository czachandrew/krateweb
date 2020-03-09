<template>
  <div class="card">
    <div class="card-content">
      <b-field label="Username/Email">
        <b-input v-model="email" type="email"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input v-model="password" type="password"></b-input>
      </b-field>
      <p class="has-text-danger" v-if="error !== ''">{{ this.error }}</p>

      <b-button type="primary" @click="login">Login</b-button>
      <b-button class="is-primary" @click="testNamespaceModule">Test</b-button>
      <b-loading :is-full-page="true" :active.sync="isBusy" :can-cancel="false">
        <!-- <font-awesome-icon icon="sync"></font-awesome-icon> -->
        <b-icon pack="fas" icon="sync" size="is-large" custom-class="fa-spin"></b-icon>
        {{ loadingMessage }}
      </b-loading>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class LoginForm extends Vue {
  public email: string = '';
  public password: string = '';
  public error: string = '';
  public isBusy: boolean = false;
  public loadingMessage: string = 'Logging in...';

  public login() {
    // submit to api
    // submit result to store
    console.log('I would be loggign in now');
    this.isBusy = true;
    this.error = '';
    this.$store
      .dispatch('login', {
        username: this.email,
        password: this.password
      })
      .then(response => {
        // console.log(response);
        if (response.error) {
          this.error = response.message;
          this.isBusy = false;
        } else {
          // store the creds and go to dash set token and user name
          this.loadingMessage = 'Fetching Data...';
          const creds = {
            username: this.email,
            token: response.data.access_token
          };
          this.$store
            .dispatch('storeCredentials', creds)
            .then(storeResponse => {
              if (this.$store.getters.accountType === 'organizer') {
                console.log('Sending to the organizer dash');
                this.loadingMessage = 'Fetching your zone data...';
                this.$store
                  .dispatch('providers/init')
                  .then(providerResponse => {
                    console.log('Success');
                    this.isBusy = false;
                    this.$router.push({ name: 'admindash', params: {} });
                  })
                  .catch(error => {
                    console.log('error getting the provider data');
                    console.log(error);
                  });
              } else {
                this.isBusy = false;
                // initialize a user
                this.$router.push({ name: 'userdash', params: {} });
              }
            })
            .catch(error => {
              console.log(error);
              this.isBusy = false;
            });
        }
      });
  }

  public testNamespaceModule() {
    this.$store.dispatch('providers/addToBank', 25);
  }
}
</script>
