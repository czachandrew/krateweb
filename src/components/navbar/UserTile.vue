<template>
  <div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-32x32">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          {{ username }}
          lvl {{ currentLevel }}
          {{ currentXp }}
        </div>
      </div>
    </article>
    <!-- <img class="image is-rounded is-32x32" :src="userimage" />
    {{ username }} -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({})
export default class UserTile extends Vue {
  get userimage() {
    return this.$store.state.user.image;
  }

  get username() {
    return this.$store.state.user.name;
  }

  get currentXp() {
    return this.$store.state.progression.current_xp;
  }

  get currentLevel() {
    return this.$store.state.progression.level;
  }
}
</script>
