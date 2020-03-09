<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <p>Routers has sentme here</p>-->
    <HelloWorld msg="mounted" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  }
};
</script>
