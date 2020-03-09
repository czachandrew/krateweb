<template>
  <div>
    <zonegroup-user-component :zone-id="id"></zonegroup-user-component>
  </div>
</template>
<script lang="ts">
import ZonegroupUserComponent from '@/components/user/ZonegroupUserComponent.vue';
export default {
  name: 'zonegroupuser',
  props: ['id'],
  components: {
    ZonegroupUserComponent
  }
};
</script>
