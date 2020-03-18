<template>
  <div>
    <div v-if="!kratespace.name">
      <button
        class="button is-danger"
        @click="showCreateSpaceModal"
        size="is-large"
      >Create your space +</button>
    </div>
    <div v-else>
      <div class="container">
        <!-- <h3 class="title">{{ kratespace.name }}</h3>
        <p class="subtitle">{{ kratespace.description }}</p>-->
        <!-- here make some card panels for various events (global across every space, then a groups section); -->
        <!-- <global-tasks></global-tasks> -->
        <kratespace-groups :space="kratespace.id"></kratespace-groups>
      </div>
    </div>
    <b-modal :active.sync="isSpaceModalActive">
      <div class="card">
        <div class="card-content">
          <krate-space-form @success="isSpaceModalActive = false"></krate-space-form>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import KrateSpaceForm from './KrateSpaceForm.vue';
import KratespaceGroups from './KratespaceGroups.vue';
@Component({
  components: {
    KrateSpaceForm,
    KratespaceGroups
  }
})
export default class KrateSpace extends Vue {
  public isSpaceModalActive: boolean = false;

  get kratespace() {
    return this.$store.getters['providers/kratespace'];
  }

  get zoneName() {
    return this.$store.getters.zoneName;
  }

  get zoneDescription() {
    return this.$store.getters.zoneDescription;
  }

  get zoneGroups() {
    return this.$store.getters.zoneGroups;
  }

  public showCreateSpaceModal() {
    this.isSpaceModalActive = true;
  }

  public mounted() {
    this.$store.dispatch('providers/init');
  }
}
</script>
