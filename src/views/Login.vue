<template>
  <section class="section">
    <div class="content">
      <div class="columns is-centered">
        <!-- transition the form in  -->
        <div class="column is-half">
          <login-form></login-form>
        </div>
        <!-- tranisition out on login success? -->
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import LoginForm from '@/components/LoginForm.vue';
export default {
  name: 'login',
  components: { LoginForm }
};
</script>
