<template>
  <div class="card">
    <div class="card-content">
      <section class="section">
        <h1 class="title is-left">{{kratespace.name}}</h1>
        <h1 class="subtitle is-left">{{kratespace.description}}</h1>
        <xp-bank></xp-bank>
        <!-- need something to show pending rewards -->
      </section>
      <b-tabs v-model="activeTab">
        <b-tab-item label="Groups/Tasks">
          <krate-space></krate-space>
        </b-tab-item>
        <b-tab-item label="Users">
          <user-management-component></user-management-component>
        </b-tab-item>
        <b-tab-item label="Rewards">
          <rewards-admin></rewards-admin>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import UserManagementComponent from '@/components/admin/UserManagementComponent.vue';
import KrateSpace from '@/components/admin/KrateSpace.vue';
import RewardsAdmin from '@/components/admin/RewardsAdmin.vue';
import XpBank from '@/components/admin/XpBank.vue';
@Component({
  components: {
    KrateSpace,
    UserManagementComponent,
    RewardsAdmin,
    XpBank
  }
})
export default class Admindash extends Vue {
  public activeTab: number = 0;

  get kratespace() {
    return this.$store.getters['providers/kratespace'];
  }
}
</script>
