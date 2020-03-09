<template>
  <div class="card">
    <div class="card-content">
      <b-field label="Name" :type="{ 'is-danger': errors.name }">
        <b-input v-model="user.name"></b-input>
      </b-field>
      <b-field
        label="Email"
        :type="{ 'is-danger': errors.email }"
        :message="['']"
      >
        <b-input v-model="user.email"></b-input>
      </b-field>
      <b-field label="Account Type">
        <b-select v-model="user.type">
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </b-select>
      </b-field>
      <b-field
        label="Password"
        :type="{ 'is-danger': errors.password }"
        :message="{ 'Passwords are mismatched': errors.password }"
      >
        <b-input v-model="user.password"></b-input>
      </b-field>
      <b-field label="Password Again" :type="{ 'is-danger': errors.password }">
        <b-input v-model="passwordConfirm"></b-input>
      </b-field>
      <b-button class="is-primary" @click="createAccount">Register</b-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import api from '../krateapi';
enum AccountType {
  USER = 'user',
  ADMIN = 'admin'
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  type: AccountType;
}

@Component({})
export default class RegistrationForm extends Vue {
  public user: UserForm = {
    name: '',
    email: '',
    password: '',
    type: AccountType.USER
  };
  public passwordConfirm: string = '';
  public type: AccountType = AccountType.USER;
  public isBusy: boolean = false;
  public busyMessage: string = 'Creating your account...';
  public errors: any = {
    password: false,
    email: false,
    name: false
  };
  public errorMessages: any = {
    password: '',
    email: '',
    name: ''
  };

  get passwordError() {
    if (this.errors.password) {
      return 'The passwords are mismatched';
    }
    this.$store.dispatch('registerUser');
  }

  public createAccount() {
    this.isBusy = true;
    if (this.user.password !== this.passwordConfirm) {
      console.log('Passwords are mismatched');
      this.errors.password = true;
      this.errorMessages.password = 'Passwords are mismatched';
      this.isBusy = false;
    } else {
      this.$store
        .dispatch('registerUser', this.user)
        .then(response => {
          // response contains the complete user object with progression
          this.$store.dispatch('setProgression', response.data.progression);
          // login the user
          this.loginNewUser();
        })
        .catch(error => {
          console.log(error);
          this.isBusy = false;
        });
    }
  }

  public loginNewUser() {
    this.busyMessage = 'Logging you in...';
    this.$store
      .dispatch('login', {
        username: this.user.email,
        password: this.user.password
      })
      .then(response => {
        // now that the user is logged in we need to set the initial data
        const creds = {
          username: this.user.email,
          token: response.data.access_token
        };
        try {
          const result = this.$store.dispatch('storeCredentials', creds);
          //
          this.isBusy = false;
        } catch (error) {
          console.log(error);
          this.isBusy = false;
        }
        // this.$store.dispatch('storeCredentials', creds);
      });
  }
}
</script>
