<template>
  <div>
    <h1 class="title">Requests to Join</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="request in pendingRequests" :key="request.id">
        {{request.user.name}}
        <p class="is-italic">{{request.user.email}}</p>
        <b-button type="is-primary" size="is-small" @click="approve(request.id)">Approve</b-button>
        <b-button type="is-danger" size="is-small" @click="deny(request.id)">Deny</b-button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class JoinRequests extends Vue {
  get pendingRequests() {
    return this.$store.getters['providers/joinRequests'];
  }

  public approve(requestId: number) {
    this.$store
      .dispatch('providers/approveJoinRequest', requestId)
      .then(response => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'You approved this request'
        });
      })
      .catch(error => {
        console.log(error);
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'There was an error'
        });
      });
  }

  public deny(requestId: number) {}
}
</script>