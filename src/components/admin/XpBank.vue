<template>
  <div>
    <nav class="level">
      <div class="level-item">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-2 is-child notification is-warning">
              <p class="title has-text-centered">
                <b-icon icon="university"></b-icon>&nbsp;Bank
              </p>
              <br />
              <p class="subtitle has-text-centered">{{xp}}</p>
            </article>
            <article class="tile is-child box">
              <b-button @click="addToBank" type="is-primary" size="is-large">Add to Bank</b-button>
            </article>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class XpBank extends Vue {
  public amount: number = 200;

  get available() {
    return this.$store.getters['providers/bankAvailable'];
  }

  get xp() {
    return this.$store.state.providers.space_xp;
  }
  public addToBank() {
    console.log('adding');
    this.$store
      .dispatch('providers/addToBank', this.amount)
      .then(response => {
        console.log(response);
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'You added ' + this.amount + ' xp to your bank'
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>