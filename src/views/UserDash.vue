<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h1>User dash!</h1>
        <space-search></space-search>
        <!-- <h1>Spaces you belong to</h1>
        <my-groups></my-groups>-->
      </div>
    </div>
    <b-tabs size="is-medium" class="block">
      <b-tab-item label="My Groups" icon="user-friends">
        <my-groups></my-groups>
      </b-tab-item>
      <b-tab-item label="My Krates" icon="boxes" style="width: 100%;">
      </b-tab-item>
    </b-tabs>

    <div class="card">
      <div class="card-header">
        <p class="card-header-title">My Spaces</p>
      </div>
      <div class="card-content">
        <krate-store></krate-store>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import SpaceSearch from '@/components/user/SpaceSearch.vue';
import MyGroups from '@/components/user/MyGroups.vue';
import KrateStore from '@/components/user/KrateStore.vue';
export default {
  name: 'userdash',
  components: {
    SpaceSearch,
    MyGroups,
    KrateStore
  }
};
</script>
