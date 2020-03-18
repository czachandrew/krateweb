<template>
  <b-modal :active.sync="isOpen" has-modal-card>
    <div class="card" v-if="reward !== null">
      <div class="card-header">
        <div class="card-header-title">
          <h1>Reward Modal</h1>
        </div>
      </div>
      <div class="modal-card-body">
        <div class="content has-text-centered" v-if="reward !== null && !showRedemptionCode">
          <h1 class="title">{{ reward.title }}</h1>
          <h2 class="subtitle">{{ reward.description }}</h2>
          <img v-if="reward.image" :src="reward.image" class="is-3by2" />
          <div class="buttons">
            <b-button type="is-primary" size="large" @click="redeem">Redeem</b-button>
            <b-button type="is-warning" size="large" @click="dismiss">Redeem Later</b-button>
          </div>
        </div>
        <div class="content has-text-centered" v-if="showRedemptionCode && reward !== null">
          <qrcode-vue :value="reward" :size="size" level="H"></qrcode-vue>
          <b-button @click="showRedemptionCode = false" type="primary">Cancel</b-button>
          <b-button @click="print" type="danger">Print</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import QrcodeVue from 'qrcode.vue';
@Component({
  components: {
    QrcodeVue
  }
})
export default class RewardModal extends Vue {
  @Prop({}) rewardId!: any;
  @Prop({}) isOpen: boolean = false;

  public showRedemptionCode: boolean = false;
  public size: number = 100;

  //   public isOpen: Boolean = false;

  get reward() {
    if (this.rewardId) {
      return this.$store.state.rewards.rewards[this.rewardId];
    } else {
      return null;
    }
  }

  public dismiss() {
    // this.isOpen = false;
    this.$emit('close');
  }

  public redeem() {
    // we need to be listening for the event from the server here since someone could potentially open the redeem thing 5 or 10 min before it is actually redeemed
    // should also allow for the printing/emailing/texting of QR code
    this.showRedemptionCode = true;
    this.$store.dispatch('rewards/redeem', this.rewardId);
    this.$emit('redeemReward', this.rewardId);
  }
}
</script>
