<template>
  <div class="container" v-if="kratespace.name">
    <div class="columns">
      <div class="column is-9">
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Welcome to, {{ kratespace.name }}.</h1>
              <h2 class="subtitle">{{ kratespace.description }}</h2>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{ kratespace.users.length }}</p>
                <p class="subtitle">Users</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">59k</p>
                <p class="subtitle">XP Tasks</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">3.4k</p>
                <p class="subtitle">Potential Rewards</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">19</p>
                <p class="subtitle">Krates</p>
              </article>
            </div>
          </div>
        </section>
        <div class="columns">
          <div class="column is-6">
            <div class="card events-card">
              <header class="card-header">
                <p class="card-header-title">Experience Tasks</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-table">
                <div class="content">
                  <table class="table is-fullwidth is-striped">
                    <tbody>
                      <tr v-for="group in kratespace.groups" :key="group.id">
                        <td width="5%">
                          <i class="fa fa-bell-o"></i>
                        </td>
                        <td>{{ group.name }} ({{ group.tasks.length }})</td>
                        <td class="level-right">
                          <a class="button is-small is-primary" href="#">Zoom</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">View All</a>
              </footer>
            </div>
          </div>
          <div class="column is-6">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <b-button type="is-primary" size="is-large" icon="faUser" @click="join">Join!</b-button>
                </div>
              </div>
            </div>
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Recent Activity</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-large" type="text" placeholder />
                    <span class="icon is-medium is-left">
                      <i class="fa fa-search"></i>
                    </span>
                    <span class="icon is-medium is-right">
                      <i class="fa fa-check"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Krateapi from '@/krateapi';
const api = new Krateapi();

@Component({})
export default class SpacePreview extends Vue {
  @Prop() public id!: string;

  public space: any = {};
  public ready: boolean = false;

  get kratespace() {
    return this.space;
  }

  public join() {
    api
      .joinSpace(this.id)
      .then(response => {
        console.log(response);
        // check the status in the response, some groups you can join freely others require that you be approved
        // pops a success message
        // update the data store locally
        // redirect to the joined user page view
      })
      .catch(error => {
        console.log(error);
      });
  }

  public mounted() {
    if (this.id) {
      api.spaceDetails(this.id).then(response => {
        this.ready = true;
        console.log(response);
        this.space = response;
      });
    }
  }
}
</script>
