<template>
  <div>
    <h2 class="title">Create your space</h2>
    <h2 class="subtitle">
      You space is where you manage all the experience and rewards that you want
      to put up for grabs to your groups. Just enter the details below to get
      started.
    </h2>
    <b-field
      label="Space Name"
      message="This is the name for your space and can be public or private - you can name individual groups later"
    >
      <b-input type="text" v-model="newSpace.name"></b-input>
    </b-field>
    <b-field
      label="Description"
      message="Describe who you are and what type of behaviours you are incentivizing"
    >
      <b-input type="text" v-model="newSpace.description"></b-input>
    </b-field>
    <b-field
      label="Joinable?"
      message="Indicate whether or not you want your space to be joinable by other Krate users"
    >
      <b-checkbox v-model="newSpace.joinable">
        People can request to join my space they do not need to be
        invited
      </b-checkbox>
    </b-field>
    <b-button class="button is-primary" size="is-large" @click="createSpace">Create my space!</b-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { NewKrateSpace } from '@/store/interfaces';
@Component({})
export default class KrateSpaceForm extends Vue {
  public newSpace: NewKrateSpace = {
    name: '',
    description: '',
    user_id: this.$store.getters.userId,
    joinable: true
  };

  public createSpace() {
    this.$store
      .dispatch('providers/createSpace', this.newSpace)
      .then(response => {
        console.log(response);
        this.$buefy.toast.open({
          type: 'is-success',
          message:
            'Your space ' +
            this.newSpace.name +
            ' has been successfully created'
        });
        this.$emit('success');
      })
      .catch(error => {
        console.log('There was some kind of error creating the space');
      });
  }
}
</script>
