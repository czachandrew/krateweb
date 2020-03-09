<template>
  <div>
    <!-- Looks like you just task.description -->
    <h1 class="subtitle">Looks like you're going to "{{ this.taskDetails.description }}".</h1>
    <div v-if="formRequired" class="form">
      <b-field class="file">
        <b-upload v-model="media">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>Click to add media</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="media">{{ media.name }}</span>
      </b-field>
      <b-field class="control">
        <b-button type="is-primary" :disabled="!media && formRequired" @click="submit()">Submit</b-button>
      </b-field>
    </div>
    <div v-else>
      <b-field class="control">
        <b-button type="is-primary" @click="submit()">Submit</b-button>
      </b-field>
    </div>

    <!-- If media is required we need the form -->

    <!-- If partial then we need the form -->

    <!-- If location is required this should happen on mobile -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Krateapi from '@/krateapi';

const krateapi = new Krateapi();

interface Usertask {
  id?: number;
  task_id: number;
  user_id: number;
  zonegroup_id: number;
  status: string;
  location: string;
  media_type: string;
  media_link: string | null;
  type: string;
  partial_amount: number | null;
}
@Component({})
export default class UsertaskForm extends Vue {
  @Prop() public taskId!: number;
  public media: any = null;

  get taskDetails() {
    return this.$store.state.spaces.tasks[this.taskId];
  }

  get formRequired() {
    if (this.taskDetails) {
      if (
        this.taskDetails.media_required ||
        this.taskDetails.type === 'partial' ||
        this.taskDetails.location_required
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isMediaCorrect() {}

  public submit() {
    //if there is media upload that first
    var mediaObj = null;
    if (this.media) {
      //upload the media
      //verify the filetype
      console.log('I am uploading some media');
      //verify that the media matches

      // const mediaObj = await krateapi.submitMedia(this.media, {
      //   type: 'photo'
      // });

      krateapi
        .submitMedia(this.media, {
          type: 'photo'
        })
        .then(response => {
          mediaObj = response;
          console.log('I have just set the mediaObj');
          console.log(mediaObj);
          this.usertask.media_link = response.link;
          console.log('Getting ready to create the usertask');
          console.log(mediaObj);
          const payload = { usertask: this.usertask, media: mediaObj };

          this.$store
            .dispatch('spaces/createUsertask', payload)
            .then(response => {
              console.log(response);
              const message = 'Your submission is waiting for approval!';
              this.$buefy.toast.open({
                message,
                type: 'is-primary'
              });
              this.$emit('success');
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const payload = { usertask: this.usertask };

      this.$store
        .dispatch('spaces/createUsertask', payload)
        .then(response => {
          console.log(response);
          const message = 'Your submission is waiting for approval!';
          this.$buefy.toast.open({
            message,
            type: 'is-primary'
          });
          this.$emit('success');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  public usertask: Usertask = {
    task_id: this.taskId,
    user_id: this.$store.getters.userId,
    zonegroup_id: this.$store.state.spaces.tasks[this.taskId].zonegroup_id,
    status: 'new',
    location: 'na',
    media_type: 'photo',
    media_link: null,
    type: 'single',
    partial_amount: 0
  };

  mounted() {
    console.log('Here is the task ID');
    console.log(this.taskId);
  }
}
</script>
