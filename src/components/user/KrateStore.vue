<template>
  <b-carousel-list v-model="krate" :data="krates" :items-to-show="3">
    <template slot="item" slot-scope="props">
      <div class="card">
        <div class="card-image">
          <figure class="image is-2by1">
            <img :src="props.list.image" />
          </figure>
          <b-tag type="is-success" rounded size="is-large" style="position: absolute; top: 0;">
            <b>20% Chance at premium</b>
          </b-tag>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="title is-6">{{ props.list.title }}</p>

            <div class="field is-grouped">
              <p class="subtitle is-7">Cost: {{ props.list.cost }} xp</p>
              <p class="control" style="margin-left: auto;">
                <b-button type="is-primary" @click="buyMe(props.list)">Buy & Pop</b-button>
              </p>
            </div>
          </div>
        </div>
        <krate-open-modal :modal-open="popModal" @krateOpened="finishKrateOpen"></krate-open-modal>
        <reward-modal
          :is-open="showRewardModal"
          :reward-id="newReward"
          @close="showRewardModal = false"
        ></reward-modal>
      </div>
    </template>
  </b-carousel-list>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import KrateOpenModal from '@/components/KrateOpenModal.vue';
import RewardModal from '@/components/RewardModal.vue';
@Component({
  components: {
    KrateOpenModal,
    RewardModal
  }
})
export default class KrateStore extends Vue {
  public krate: number = 0;
  public popModal: boolean = false;
  public showRewardModal: boolean = false;
  public newReward: any = {};

  public buyMe(krate: any) {
    this.popModal = true;
    console.log(krate);
    this.$store
      .dispatch('krates/buyAndOpenKrate', krate)
      .then(reward => {
        console.log('here is the reward in the component from the store');
        console.log(reward);
        this.newReward = reward.id;
        this.showRewardModal = true;
        this.popModal = false;
      })
      .catch(error => {
        console.log('The error made it to the component');
        console.log(error);
        this.popModal = false;
        this.$buefy.notification.open({
          type: 'is-danger',
          message: error,
          position: 'is-bottom'
        });
      });
    // this will have already parsed and added the reward to the store
    // let's store this newReward locally for display in the modal

    //this.popModal = true;
  }

  public finishKrateOpen(evt: any) {
    console.log(evt);
    console.log('all done');
    this.popModal = false;
  }

  public showReward(reward: any) {
    this.showRewardModal = true;
  }

  public closeRewardModal(evt: any) {
    console.log(evt);
  }

  get krates() {
    return [
      {
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        title: 'Standard Krate',
        cost: 200,
        id: 3
      },
      {
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        title: 'Gold Krate',
        cost: 500,
        id: 2
      },
      {
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        title: 'Platinum Krate',
        cost: 1000,
        id: 1
      }
    ];
  }
}
</script>
