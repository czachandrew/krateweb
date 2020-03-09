<template>
  <div>
    <h1 class="title">Active Rewards</h1>
    <b-button type="is-primary" @click="isRewardFormShowing = true">+ Reward</b-button>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Type</th>
        <th>Stock</th>
        <th>Status</th>
        <th>Redeemed</th>
        <th>&nbsp;</th>
      </thead>
      <tbody>
        <tr v-for="reward in rewards" :key="reward.id">
          <td style="width: 20%; text-wrap:true;">
            <span class="has-text-weight-bold">{{reward.title}}</span>
            <br />
            <span class="has-text-grey is-italic">{{reward.description}}</span>
          </td>
          <td>{{reward.type}}</td>
          <td>{{reward.stock}}</td>
          <td>{{reward.status}}</td>
          <td>{{reward.total_redeemed}}</td>
          <td>
            <div class="buttons">
              <b-button type="is-primary" size="is-small">Zoom</b-button>
              <b-button type="is-warning" size="is-small">Freeze</b-button>
              <b-button type="is-danger" size="is-small">Archive</b-button>
              <b-button type="is-success" size="is-small">Restock</b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="columns">
      <div class="column">
        <div class="columns" v-for="reward in rewards" :key="reward.id">
          <div class="column">
            {{reward.title}} -
            {{reward.description}}
          </div>
          <div class="column">{{reward.type}}</div>
          <div class="column">{{reward.stock}}</div>
          <div class="column">{{reward.status}}</div>
          <div class="column">{{reward.total_redeemed}}</div>
        </div>
      </div>
    </div>-->
    <b-modal :active.sync="isRewardFormShowing">
      <div class="card">
        <div class="card-content">
          <create-reward-form @done="isRewardFormShowing = false"></create-reward-form>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateRewardForm from './CreateRewardForm.vue';

@Component({
  components: {
    CreateRewardForm
  }
})
export default class RewardsAdmin extends Vue {
  public isRewardFormShowing: boolean = false;
  get rewards() {
    return this.$store.getters['providers/rewards'];
  }
}
</script>