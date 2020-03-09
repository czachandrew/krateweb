<template>
  <div>
    <ul>
      <li class="box" v-for="task in tasks" :key="task.id">
        <article class="media">
          <div class="media-left"></div>
          <div class="media-content">
            {{ $store.state.spaces.tasks[task].description }}
            <p
              v-if="$store.state.spaces.tasks[task].details"
            >{{ $store.state.spaces.tasks[task].details}}</p>
            <p
              v-if="$store.state.spaces.tasks[task].limited"
            >This is a limited redemption task: {{$store.state.spaces.tasks[task].count}} of {{$store.state.spaces.tasks[task].limit}} redeemed</p>
            <b-icon
              v-if="$store.state.spaces.tasks[task].media_required"
              icon="camera-retro"
            >Media Required</b-icon>
            <b-icon
              v-if="$store.state.spaces.tasks[task].location_required"
              icon="street-view"
            >Location set</b-icon>
            <p v-if="$store.getters['spaces/usertasksForTask'](task)">Your submission is pending</p>
          </div>
          <div class="media-right">
            <b-button
              type="is-primary is-pulled-right"
              :disabled="$store.getters['spaces/usertasksForTask'](task)"
              @click="complete(task)"
            >Complete</b-button>
          </div>
        </article>

        <!-- {{ task }} -->
      </li>
    </ul>
    <b-modal :active.sync="isUsertaskModalActive">
      <div class="card">
        <div class="card-content">
          <usertask-form :task-id="currentTask" @success="isUsertaskModalActive = false"></usertask-form>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UsertaskForm from '@/components/user/UsertaskForm.vue';
@Component({
  components: {
    UsertaskForm
  }
})
export default class TaskList extends Vue {
  @Prop() public tasks!: any;
  public currentTask: number = 0;
  public isUsertaskModalActive = false;

  public complete(taskId: number) {
    this.currentTask = taskId;
    this.isUsertaskModalActive = true;
    // create a user task
    // then when we are looking at tasks we need to check and see if there is an associated user task
  }
}
</script>
