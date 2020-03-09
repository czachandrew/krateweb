<template>
  <section class="hero is-fullheight-with-navbar is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5 is-offset-1 landing-caption">
            <h1 class="title is-1 is-bold is-spaced">Incentivize Anything. Get Krate</h1>
            <h2
              class="subtitle is-5 is-muted"
            >Accomplishing goals requires the right incentive for the right person. Get stuff done, get rewarded.</h2>
            <div class="button-wrap">
              <a class="button cta is-rounded primary-btn raised">Get Started</a>
              <a class="button cta is-rounded">Discover</a>
            </div>
          </div>
          <div class="column is-5">
            <figure class="image">
              <img src="../assets/krate_iphone_mock.png" alt="Description" />
            </figure>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot mb-20">
      <div class="container">
        <div class="tabs is-centered">
          <ul>
            <li>
              <a>
                <img class="partner-logo" src="assets/img/logos/clients/systek.svg" />
              </a>
            </li>
            <li>
              <a>
                <img class="partner-logo" src="assets/img/logos/clients/tribe.svg" />
              </a>
            </li>
            <li>
              <a>
                <img class="partner-logo" src="assets/img/logos/clients/kromo.svg" />
              </a>
            </li>
            <li>
              <a>
                <img class="partner-logo" src="assets/img/logos/clients/infinite.svg" />
              </a>
            </li>
            <li>
              <a>
                <img class="partner-logo" src="assets/img/logos/clients/gutwork.svg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
