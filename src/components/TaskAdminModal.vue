<template>
  <div>
    <h1 class="title">{{task.description}}</h1>
    <ul class="list" v-if="usertasks.length > 0">
      <li
        v-for="(usertask,index) in usertasks"
        :key="usertask.id"
        :class="['list-item', {'disabled' : approving === index}]"
      >
        <!-- {{usertask}} -->
        <b-tooltip label="Click to zoom">
          <figure class="image is-64x64 tile" v-for="media in usertask.media" :key="media.id">
            <img :src="'http://api.kratelyfe.com/' + media.link" @click="zoomImage(media.link)" />
          </figure>
        </b-tooltip>
        <br />Submitted by -
        <span class="has-text-weight-bold">{{usertask.user.name}}</span>
        <br />
        <span>Submitted On - {{usertask.created_at}}</span>
        <div class="buttons is-pulled-right">
          <b-button
            type="is-primary"
            size="is-small"
            @click="approve(index, usertask.id, usertask.user.name, task.description)"
          >Approve</b-button>
          <b-button type="is-danger" size="is-small" @click="deny(usertask.id)">Deny</b-button>
        </div>
      </li>
    </ul>
    <div class="box" v-else>
      <article class="media">
        <div class="media-left"></div>
        <div class="media-content">
          <h1 class="title">Nothing to approve</h1>
        </div>
      </article>
    </div>
    <b-modal :active.sync="zoomPhotoModal">
      <img :src="'http://thirtydays.test/' + zoomLink" />
    </b-modal>
  </div>
</template>
<style>
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TaskAdminModal extends Vue {
  @Prop({}) public taskId!: number;
  public approving: number | null = null;
  public zoomPhotoModal: boolean = false;
  public zoomLink: string = '';

  get task() {
    return this.$store.state.providers.tasks[this.taskId];
  }

  get usertasks() {
    return this.$store.getters['providers/pendingUsertasks'](this.taskId);
  }

  public zoomImage(link: string) {
    this.zoomPhotoModal = true;
    this.zoomLink = link;
  }

  public toast(message: string) {
    this.$buefy.toast.open({
      message,
      type: 'is-success'
    });
  }

  public approve(
    index: number,
    usertaskId: number,
    username: string,
    description: string
  ) {
    this.approving = index;
    this.$store
      .dispatch('providers/approveUsertask', usertaskId)
      .then(response => {
        this.toast('You approved ' + description + ' for ' + username);
      });
  }

  public deny(usertaskId: number) {}
}
</script>