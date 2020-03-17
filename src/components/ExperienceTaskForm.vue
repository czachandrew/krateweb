<template>
  <div>
    <b-field label="Task" message="Describe the criteria to earn experience">
      <b-input type="text" v-model="newTask.description"></b-input>
    </b-field>
    <b-field label="Details" message="Add any extra clarification here">
      <b-input type="textarea" v-model="newTask.details"></b-input>
    </b-field>
    <b-field label="XP Value" message="How much experience is someone doing this worth">
      <b-input type="text" v-model="newTask.xp_value"></b-input>
    </b-field>
    <b-field
      label="Redemption Limit"
      message="Is there a limit to the number of times that this task can be redeemed?"
    >
      <b-switch v-model="newTask.limited">Limit the number of times this can be redeemed</b-switch>
    </b-field>
    <b-field label="Limit" message="Set the limit" v-if="newTask.limited">
      <b-input type="text" v-model="newTask.limit" />
    </b-field>
    <b-field
      label="Require Media?"
      message="Do you require photo or video evidence of the task completed?"
    >
      <b-switch v-model="newTask.media_required">Require media verification?</b-switch>
    </b-field>
    <b-field label="Describe the requirement" v-if="newTask.media_required">
      <b-input type="text" v-model="newRequirement.description" />
    </b-field>
    <b-field v-if="newTask.media_required" label="Media type required...">
      <b-select v-model="newRequirement.type">
        <option value="photo">Photo</option>
        <option value="video">Video</option>
        <option value="checkin">Check In</option>
      </b-select>
    </b-field>
    <b-button
      @click="addRequirement"
      v-if="newTask.media_required"
      type="primary"
      size="small"
    >+ Requirement</b-button>
    <div class="list is-hoverable" v-if="mediaRequirements">
      <div class="list-group">
        <div class="list-group-item-heading">Media Requirements:</div>
        <div
          class="list-group-item"
          v-for="(requirement, index) in mediaRequirements"
          :key="requirement.description"
        >
          {{requirement.description}} {{index}}
          <b-button @click="deleteRequirement(index)" type="primary" size="is-small">Delete</b-button>
        </div>
      </div>
    </div>
    <b-button type="is-danger" @click="save">Create</b-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NewExperienceTask } from '@/store/interfaces.ts';

enum Types {
  new = 'new',
  update = 'update'
}

@Component({})
export default class ExperienceTaskFrom extends Vue {
  // adding a media requirement

  // push a button to add a media requirement and tell me what type of media and describe it
  //
  @Prop() public group!: number | string;
  @Prop({ default: Types.new }) public type!: Types;
  @Prop() public taskId!: number;
  public newRequirement: any = {
    description: '',
    type: 'photo'
  };
  public newTask: NewExperienceTask = {
    xp_value: 100,
    description: '',
    details: '',
    zonegroup_id: this.group,
    user_id: this.$store.getters.userId,
    limited: false,
    limit: 0,
    media_required: false,
    media_type: 'photo',
    location: '',
    coordinates: ''
  };

  public mediaRequirements: any = {};

  public newRequirementIndex: number = 0;

  public resetForm() {
    this.newTask = {
      xp_value: 100,
      description: '',
      details: '',
      zonegroup_id: this.group,
      user_id: this.$store.getters.userId,
      limited: false,
      limit: 0,
      media_required: false,
      media_type: 'photo',
      location: '',
      coordinates: ''
    };
  }

  public toast(message: string) {
    this.$buefy.toast.open({
      message,
      type: 'is-success'
    });
  }
  public addRequirement() {
    Vue.set(
      this.mediaRequirements,
      this.newRequirementIndex,
      this.newRequirement
    );
    this.newRequirementIndex++;
    this.newRequirement = { description: '', type: 'photo' };
  }

  public deleteRequirement(index: number) {
    Vue.delete(this.mediaRequirements, index);
  }

  public save() {
    this.$store
      .dispatch('providers/createTask', {
        task: this.newTask,
        requirements: this.mediaRequirements
      })
      .then(response => {
        console.log(response);
        this.resetForm();
        this.$emit('done', 'created');
        // here we should pop an event
        this.toast(
          'You have successfully created an experience task: ' +
            response.description
        );
      })
      .catch(error => {
        console.log('There was some kidn of error');
        console.log(error);
      });
  }

  // public mounted() {}
}
</script>
