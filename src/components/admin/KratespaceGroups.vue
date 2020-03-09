<template>
  <div>
    <div v-if="hasGroups">
      <!-- <h1 class="title">Task Groups</h1>
      <p class="subtitle">Create task groups</p>-->
      <button @click="makeGroup" class="button is-primary">Create Group +</button>
      <br />
      <br />

      <div class="tile is-ancestor" style="flex-wrap: wrap;">
        <div class="tile is-child is-4" v-for="(group, index) in groups" :key="group.id">
          <div class="box">
            <b-dropdown aria-role="list" class="is-pulled-right">
              <b-button class="button is-light" icon-left="ellipsis-h" slot="trigger"></b-button>
              <b-dropdown-item @click="zoomGroup(index)" aria-role="listitem">Zoom</b-dropdown-item>
              <b-dropdown-item @click="deleteGroup(index)" aria-role="listitem">Delete</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Suspend activity</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Process Approvals</b-dropdown-item>
            </b-dropdown>
            <!-- add a three dot options button dropdown here for delete, suspend, process approvals -->
            <p class="title">{{ group.name }}</p>
            <p class="subtitle">{{ group.description }}</p>
            <!-- show users count -->
            <div class="columns">
              <div class="column is-one-third" style="text-align: center;">
                <b-icon icon="users" size="is-large"></b-icon>
                <p class="title">0</p>

                <!-- <p class="subtitle">Users</p> -->
              </div>
              <div class="column is-one-third" style="text-align:center;">
                <b-icon icon="tasks" size="is-large"></b-icon>
                <p class="title">{{ group.tasks.length }}</p>
              </div>
              <div class="column is-one-third" style="text-align:center;">
                <b-icon icon="coins" size="is-large"></b-icon>
                <p class="title">0</p>
              </div>
            </div>
            <button
              class="button is-danger is-pulled-right"
              @click="addTaskToGroup(index)"
            >+ XP Task</button>
            <div class="is-clearfix"></div>
            <!-- <b-button size="is-medium" type="is-primary" icon-left="exclamation-circle"></b-button> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button @click="makeGroup" class="button is-primary">Create Group +</button>
    </div>
    <b-modal :active.sync="isTaskModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <experience-task-form :group="taskForGroup" @done="isTaskModaActive = false"></experience-task-form>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="isCreateModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <b-field :label="'Name'">
            <b-input type="text" v-model="newGroup.name"></b-input>
          </b-field>
          <b-field :label="'Description'">
            <b-input type="text" v-model="newGroup.description"></b-input>
          </b-field>
          <b-field :label="'Type'">
            <b-input type="text" v-model="newGroup.type"></b-input>
          </b-field>
          <button class="button is-primary" @click="createGroup">Create</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { NewKratespaceGroup, JoinMethod, Status } from '@/store/interfaces';
import ExperienceTaskForm from '@/components/ExperienceTaskForm.vue';
@Component({
  components: {
    ExperienceTaskForm
  }
})
export default class KratespaceGroups extends Vue {
  @Prop(Number) public space!: number;
  public isCreateModalActive: boolean = false;
  public isTaskModalActive: boolean = false;
  public newGroup: NewKratespaceGroup = {
    name: '',
    description: '',
    type: '',
    join_method: JoinMethod.invite,
    status: Status.active,
    kratespace_id: this.space
  };
  public taskForGroup: number = 0;

  public resetForm() {
    this.newGroup.name = '';
    this.newGroup.description = '';
    this.newGroup.type = '';
    this.newGroup.join_method = JoinMethod.invite;
    this.newGroup.status = Status.active;
  }

  public deleteGroup(key: number) {
    // check and see if there are users if there are no users delete but display confirm
    this.$store.dispatch('providers/deleteGroup', key);
    // if their are users check the contract, if any rewards are promised they
    // must be fulfilled before the removal of the group

    // otherwise they can suspsend
  }

  public addTaskToGroup(groupId: number) {
    this.taskForGroup = groupId;
    this.isTaskModalActive = true;
  }

  public makeGroup() {
    this.isCreateModalActive = true;
  }

  public zoomGroup(groupId: string) {
    // this.$store.dispatch('providers/setActiveGroup', groupId);
    this.$router.push({ name: 'zonegroup', params: { id: groupId } });
  }

  public createGroup() {
    this.newGroup.kratespace_id = this.space;
    this.$store
      .dispatch('providers/createGroup', this.newGroup)
      .then(response => {
        console.log(response);
        this.resetForm();
        this.$buefy.toast.open({ message: 'Success', type: 'is-success' });
        this.isCreateModalActive = false;
      })
      .catch(error => {
        console.log(error);
      });
  }

  get groups() {
    return this.$store.getters['providers/groups'];
  }

  get kratespaceId() {
    return this.$store.getters['providers/kratespace_id'];
  }

  get hasGroups() {
    const groups = this.$store.getters['providers/groups'];
    console.log(groups);
    if (!groups || Object.entries(groups).length === 0) {
      return false;
    } else {
      return true;
    }
  }

  // mounted() {}
}
</script>
