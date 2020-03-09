<template>
  <b-modal :active.sync="isOpen" has-modal-card>
    <div class="card" v-if="reward">
      <div class="card-header">
        <div class="card-header-title">
          <h1>Reward Modal</h1>
        </div>
      </div>
      <div class="modal-card-body">
        <div class="content has-text-centered">
          <h1 class="title">{{ reward.title }}</h1>
          <h2 class="subtitle">{{ reward.description }}</h2>
          <img v-if="reward.image" :src="reward.image" class="is-3by2" />
          <div class="buttons">
            <b-button type="is-primary" size="large" @click="redeem"
              >Redeem</b-button
            >
            <b-button type="is-warning" size="large" @click="dismiss"
              >Redeem Later</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
@Component({})
export default class RewardModal extends Vue {
  @Prop({}) rewardId!: any;
  @Prop({}) isOpen: boolean = false;
  //   public isOpen: Boolean = false;

  get reward() {
    return this.$store.state.rewards.rewards[this.rewardId];
  }

  public dismiss() {
    // this.isOpen = false;
    this.$emit('close');
  }

  public redeem() {
    this.$store.dispatch('rewards/redeem', this.rewardId);
    this.$emit('redeemReward', this.rewardId);
  }
}
</script>
