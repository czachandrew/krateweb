<template>
  <div class="columns">
    <div class="column is-one-third" v-for="kratespace in kratespaces" :key="kratespace.id">
      <div class="card large">
        <div class="card-header">
          <p class="card-header-title">{{kratespace.name}}</p>
        </div>
        <div class="card-image">
          <figure class="image">
            <img src="https://via.placeholder.com/150" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <p>{{kratespace.description}}</p>
            <b-button type="primary" @click="zoom(kratespace.id)">Experience Tasks</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({})
export default class MyGroups extends Vue {
  get kratespaces() {
    return this.$store.state.spaces.kratespaces;
  }

  public zoom(id: string) {
    this.$router.push({ name: 'zonegroupuser', params: { id } });
  }

  public mounted() {
    console.log(this.kratespaces);
  }
}
</script>