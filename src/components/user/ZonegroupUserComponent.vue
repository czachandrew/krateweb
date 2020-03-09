<template>
  <div>
    <h1 class="title">{{ zone.name }}</h1>
    <b-collapse
      class="card"
      v-for="(group, index) in zone.groups"
      :key="index"
      :open="isOpen === index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title">
          {{ $store.state.spaces.groups[group].name }} ({{
          $store.state.spaces.groups[group].tasks.length
          }})
        </p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'caret-down' : 'caret-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <task-list :tasks="$store.state.spaces.groups[group].tasks"></task-list>
      </div>
    </b-collapse>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TaskList from '@/components/user/TaskList.vue';
@Component({
  components: {
    TaskList
  }
})
export default class ZonegroupUserComponent extends Vue {
  @Prop() public zoneId!: number;
  public isOpen: number = 0;
  get zone() {
    console.log(this.zoneId);
    return this.$store.state.spaces.kratespaces[this.zoneId];
  }

  get groups() {
    return this.$store.getters.groupsForMySpace(this.zoneId);
  }

  get tasks() {
    return this.$store.getters.tasksForZone(this.zoneId);
  }
}
</script>
