<template>
  <b-modal :active.sync="syncedModalOpen" has-modal-card :can-cancel="false">
    <header class="modal-card-head">
      <p class="modal-card-head">POP THAT KRATE!</p>
    </header>
    <section class="modal-card-body">
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false">
        <b-icon pack="fas" icon="gift" size="large" custom-class="fa-spin"></b-icon>
      </b-loading>
    </section>
  </b-modal>
</template>
<script lang="ts">
import { Vue, PropSync, Component, Watch } from 'vue-property-decorator';
@Component({})
export default class KrateOpenModal extends Vue {
  @PropSync('modalOpen', { type: Boolean }) syncedModalOpen!: boolean;
  public isLoading: boolean = true;
  public showKrateOpenModal: boolean = false;
  public isDone: boolean = true;

  @Watch('syncedModalOpen')
  onPropChange(val: boolean, oldVal: boolean) {
    console.log('changed');
    this.isLoading = val;
    if (val === true) {
      //this.isLoading = true;
      //access the krateBeingOpened and open it
      // setTimeout(() => {
      //   this.isLoading = false;
      //   this.$emit('krateOpened', { result: 'this would be the result' });
      // }, 4000);
    }
  }

  get krateBeingOpened() {
    return this.$store.getters['krateBeingOpened'];
  }

  mounted() {
    console.log('Mounted');
  }
}
</script>
