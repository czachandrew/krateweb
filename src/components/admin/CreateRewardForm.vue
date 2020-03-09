<template>
  <div>
    <h1 class="title">Create a new Reward</h1>
    <h2 class="subtitle">Rewards are randomly assigned based on the opening of a krate</h2>
    <b-field label="Reward Name">
      <b-input type="text" v-model="newReward.title"></b-input>
    </b-field>
    <b-field label="Description">
      <b-input type="text" v-model="newReward.description"></b-input>
    </b-field>
    <b-field label="Type">
      <b-select placeholder="Select a type" v-model="newReward.type">
        <option value="gift" selected>Gift of Physical Item</option>
        <option value="app">Additional Experience or Krate</option>
        <option value="experience">An Experience or Privelage</option>
      </b-select>
    </b-field>
    <label class="label">Upload an Image</label>
    <b-field class="file">
      <br />
      <b-upload v-model="file">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>Click to Upload</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="file">{{file.name}}</span>
    </b-field>
    <b-field label="Stock" message="How many of these reward are available to be given">
      <b-input type="text" style="width: 100px;" v-model="newReward.stock"></b-input>
    </b-field>

    <b-field
      label="Reward Paradigm"
      message="Normal rewards are randomly assigned, but you can establish limitations for specific rewards that will be enforced as long as possible"
    >
      <div class="columns">
        <b-select v-model="paradigm" class="column is-one-third">
          <option v-for="paradigm in paradigmValues" :key="paradigm" :value="paradigm">{{paradigm}}</option>
        </b-select>
        <p class="column is-two-thirds">{{paradigmDescription}}</p>
      </div>
    </b-field>

    <div class="buttons">
      <b-button type="is-default">Reset</b-button>
      <b-button type="is-primary" @click="save">Create Reward</b-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

enum KrateTypes {
  gift,
  app,
  experience
}

enum Paradigms {
  weekly = 'weekly',
  daily = 'daily',
  cycle = 'cycle',
  normal = 'normal',
  consolation = 'consolation'
}

interface NewReward {
  title: string;
  description: string;
  redeemable: boolean;
  image: string;
  type: KrateTypes;
  stock: number;
  rank: number;
  status?: string;
  provider_id?: number;
}

@Component({})
export default class CreateRewardForm extends Vue {
  public newReward: NewReward = {
    title: '',
    description: '',
    redeemable: true,
    image: '',
    type: KrateTypes.gift,
    stock: 0,
    rank: 1,
    status: 'active',
    provider_id: this.$store.getters['providers/kratespace_id']
  };

  public descriptions: any = {
    normal: 'All rewards will be randomly rewarded on krate opens',
    weekly: 'Only one of this reward will be released per week',
    daily: 'Only one of this reward will be release per day',
    cycle: 'Random as long as there is not an unredeemed reward in play',
    consolation: 'Always available to be rewarded'
  };
  public file: any = {};
  public paradigm: Paradigms = Paradigms.normal;
  public paradigmValues: any = Object.values(Paradigms);
  get paradigmDescription() {
    console.log('This is the current Paradigm');
    const current = this.paradigm;
    console.log(this.paradigm);

    return this.descriptions[current];
  }

  public save() {
    // save the image first and then attac?
    console.log('Here is the media object');
    console.log(this.file);
    const payload: any = {
      media: this.file,
      reward: this.newReward
    };
    this.$store
      .dispatch('providers/createReward', payload)
      .then(response => {
        console.log('Back in the component');
        console.log(response);
        //dismiss the modal
        this.$emit('done');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>