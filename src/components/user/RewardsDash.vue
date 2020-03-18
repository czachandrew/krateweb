<template>
  <section class="section">
    <div class="container">
      <table class="table">
        <thead>
          <th>Reward</th>
          <th>Status</th>
          <th>&nbsp;</th>
        </thead>
        <tbody v-if="rewards">
          <tr v-for="reward in rewards" :key="reward.id">
            <td>
              {{reward.title}}
              {{reward.description}}
            </td>
            <td>{{reward.status}}</td>
            <td>
              <b-button type="primary" @click="examineReward(reward.id)" size="is-small">Action</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <reward-modal
      :is-open="showRewardModal"
      :reward-id="examinedRewardId"
      @close="showRewardModal = false"
    ></reward-modal>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RewardModal from '@/components/RewardModal.vue';
@Component({
  components: {
    RewardModal
  }
})
export default class RewardsDash extends Vue {
  public showRewardModal: boolean = false;
  public examinedRewardId: number = 0;
  get rewards() {
    return this.$store.getters['rewards/myRewards'];
  }

  public examineReward(rewardId: number) {
    this.examinedRewardId = rewardId;
    this.showRewardModal = true;
  }
}
</script>