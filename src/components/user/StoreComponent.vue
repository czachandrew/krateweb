<template></template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import krateapi from '@/krateapi';

@Component({})
export default class StoreComponent extends Vue {
  api = new krateapi();
  public krates: any = [];

  mounted() {
    //this.krates = await api.getKrates();
  }
}
</script>