<template>
  <div>
    hey
    {{ userType }}
    <zonegroup
      v-if="userType === 'organizer'"
      :groupId="Number(id)"
    ></zonegroup>
    <zoneuser v-if="userType === 'user'" :groupId="Number(id)"></zoneuser>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ZonegroupComponent from '@/components/ZonegroupComponent.vue';
import ZonegroupUserComponent from '@/components/user/ZonegroupUserComponent.vue';
@Component({
  components: {
    zonegroup: ZonegroupComponent,
    zoneuser: ZonegroupUserComponent
  }
})
export default class Zonegroup extends Vue {
  @Prop({}) public id!: number | string;
  get userType() {
    console.log(this.$store.getters.accountType);
    return this.$store.getters.accountType;
  }
}
</script>
