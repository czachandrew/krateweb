<template>
  <div class="container">
    <registration-form></registration-form>
  </div>
</template>
<script lang="ts">
import RegistrationForm from '../components/RegistrationForm.vue';
export default {
  name: 'register',
  components: { RegistrationForm }
};
</script>
