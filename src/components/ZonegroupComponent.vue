<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title">{{ group.name }}</h1>
      <p class="subtitle">{{ group.description }}</p>
      <div class="card">
        <div class="card-content">
          <h3 class="title">Tasks</h3>
          <div class="buttons">
            <b-button type="is-primary" @click="addTask">Add Task</b-button>
          </div>

          <div v-if="groupTasks.length > 0">
            <div v-for="task in groupTasks" :key="task.id" class="box">
              <article class="media is-pulled-left">
                <table style="width: 100%;">
                  <tbody>
                    <tr>
                      <td>
                        <h4 class="subtitle has-text-weight-bold">{{ task.description }}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table class="table">
                          <thead>
                            <th></th>
                            <th>Requests</th>
                            <th>Users</th>
                            <th v-if="task.limited">Remaining Count</th>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Current Stats:</th>
                              <td class="has-text-centered">
                                {{
                                $store.getters['providers/pendingUsertasks'](
                                task.id
                                ).length
                                }}
                              </td>
                              <td class="has-text-centered">0</td>
                              <td
                                v-if="task.limited"
                                class="has-text-centered"
                              >{{ task.limit - task.count}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <div class="buttons is-pulled-right">
                <b-button type="is-primary" @click="zoom(task.id)">Zoom</b-button>
                <b-button type="is-danger" @click="deleteTask(task.id)">Delete</b-button>
              </div>

              <div class="is-clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :active.sync="isTaskAdminModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card">
        <div class="modal-card-body">
          <task-admin-modal :task-id="taskForAdmin"></task-admin-modal>
        </div>
      </div>
    </b-modal>
    <b-modal
      :active.sync="isTaskFormModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card">
        <div class="modal-card-body">
          <experience-task-form :group="groupId" v-on:done="doneMakingTask"></experience-task-form>
        </div>
      </div>
    </b-modal>

    <!-- {{ groupId }}
    {{ group }}-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ExperienceTaskForm from './ExperienceTaskForm.vue';
import TaskAdminModal from './TaskAdminModal.vue';
import UserManagementComponent from './admin/UserManagementComponent.vue';

import { mapState, mapGetters } from 'vuex';

@Component({
  components: {
    ExperienceTaskForm,
    TaskAdminModal,
    UserManagementComponent
  },
  computed: {
    ...mapGetters('providers', {
      groups: 'groups',
      groupTasks: 'taskDetails'
    })
  }
})
export default class ZonegroupComponent extends Vue {
  @Prop() public groupId!: number;

  public groups!: any[];
  public groupTasks!: any[];
  public isTaskFormModalActive: boolean = false;
  public taskForAdmin: number = 0;
  public isTaskAdminModalActive: boolean = false;

  get tasks() {
    return this.$store.getters['providers/taskDetails'](this.groupId);
  }

  get group() {
    if (this.groupId) {
      console.log(this.groupId);
      return this.$store.getters['providers/groupDetails'](
        Number(this.groupId)
      );
    }
    // return this.$store.getters['providers/groupDetails'];
  }

  public doneMakingTask() {
    console.log('Caught the done event');
    // this.taskForAdmin = null;
    this.isTaskFormModalActive = false;
  }

  public zoom(taskId: number) {
    this.taskForAdmin = taskId;
    this.isTaskAdminModalActive = true;
  }

  public addTask() {
    this.isTaskFormModalActive = true;
  }

  public deleteTask(task: any) {
    this.$store.dispatch('providers/deleteTask', task);
  }

  public mounted() {
    this.$store.dispatch('providers/setActiveGroup', this.groupId);
    console.log('tasks');
    console.log(this.groupTasks);
  }
}
</script>
