<template>
  <section class="section">
    <div class="container">
      <registration-form></registration-form>
    </div>
  </section>
</template>
<script lang="ts">
import RegistrationForm from '../components/RegistrationForm.vue';
export default {
  name: 'register',
  components: { RegistrationForm }
};
</script>
