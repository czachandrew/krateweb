<template>
  <div>
    <table style="width: 100%;">
      <thead>
        <th>
          <!-- Check box -->
        </th>
        <th>User</th>
        <th>
          XP
          <!-- Buttons -->
        </th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="user in myUsers" :key="user.id">
          <td>
            <b-checkbox></b-checkbox>
          </td>
          <td>{{user.name}} lvl {{user.progression.level}}</td>
          <td>{{user.progression.current_xp}}</td>
          <td>
            <div class="buttons">
              <b-button size="is-small" type="is-warning" @click="suspend(user.id)">Suspend</b-button>
              <b-button size="is-small" type="is-danger" @click="kick(user.id)">Kick</b-button>
              <b-button size="is-small" type="is-success" @click="reward(user.id)">Reward</b-button>
              <b-button size="is-small" type="is-default" @click="zoom(user.id)">Stats</b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal
      :active.sync="showXpRewardModal"
      has-modal-card
      aria-modal
      trap-focus
      aria-role="dialog"
    >
      <div class="modal-card">
        <div class="modal-card-body">
          <b-field label="How much xp would you like to give them?">
            <b-numberinput v-model="xpReward.amount" type="text"></b-numberinput>
          </b-field>
          <b-field label="Attach a message or a reason">
            <b-input type="textarea" v-model="xpReward.description" maxlength="225"></b-input>
          </b-field>
          <div class="buttons">
            <b-button type="is-primary" @click="submitXpReward">Reward!</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class UserManagement extends Vue {
  // users and what space, last_activity
  get myUsers() {
    // this will return a filtered list of users from the store
    console.log('here are the users');
    console.log(this.$store.getters['providers/myusers']);
    return this.$store.getters['providers/myusers'];
  }

  public rewardAmout: number = 25;
  public showXpRewardModal: boolean = false;
  public xpReward: any = {
    amount: 0 as number,
    description: '' as string,
    user_id: 0 as number,
    space_id: 0 as number
  };
  public rewardUser: number = 0;

  //functions: Suspend user, kick user, reward user, message user, zoom

  public suspend(userId: number) {}

  public kick(userId: number) {}

  public resetForm() {
    this.xpReward.amount = 0;
    this.xpReward.description = '';
  }

  public reward(userId: number) {
    //show modal
    this.xpReward.user_id = userId;
    this.xpReward.space_id = this.$store.getters['providers/kratespace_id'];
    this.showXpRewardModal = true;
  }

  public async submitXpReward() {
    try {
      const result = await this.$store.dispatch(
        'providers/rewardUser',
        this.xpReward
      );
      console.log(result);
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'You have successfully given a reward'
      });
      this.resetForm();
      this.showXpRewardModal = false;
    } catch (error) {
      console.log(error);
      this.$buefy.toast.open({
        type: 'is-danger',
        message: 'Insufficient XP to award that amount'
      });
    }

    // this.$store.dispatch('providers/rewardUser', this.xpReward)then().catch(error => {
    //   console.log('component');
    //   console.log(error);
    // });
  }

  public zoom(userId: number) {}
}
</script>