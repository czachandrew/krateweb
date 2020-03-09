<template>
  <div>
    <b-input type="is-large"></b-input>
    <div class="columns">
      <div
        class="box column is-4"
        v-for="result in results"
        :key="result.id"
        @click="goToZone(result.id)"
      >
        <p class="title">{{ result.name }}</p>
        <p class="subtitle">{{ result.description }}</p>
        <b-button icon-left="lock-open" type="is-success" v-if="result.joinable === 1">Joinable!</b-button>
        <div class="buttons" v-else>
          <b-button icon-left="lock" type="is-danger">Private Group</b-button>
          <b-button type="is-default">Request to join</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import KrateApi from '@/krateapi';

const krateapi = new KrateApi();
@Component({})
export default class SpaceSearch extends Vue {
  public results: any = [];

  public goToZone(zoneId: string) {
    console.log(zoneId);
    this.$router.push({ name: 'spacepreview', params: { id: zoneId } });
  }

  get group() {
    return {};
  }

  get tasks() {
    return {};
  }

  public mounted() {
    console.log('searching');
    krateapi.searchSpaces().then(response => {
      console.log(response);
      this.results = response.data;
    });
  }
}
</script>
