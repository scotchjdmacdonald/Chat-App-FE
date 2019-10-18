<template>
  <div id="app">
    <Landing/>
    <UserBar/>
    <ChatBox/>
  </div>
</template>

<script>
import ChatBox from './components/ChatBox.vue';
import UserBar from './components/UserBar.vue';
import Landing from './components/Landing.vue';

export default {
  name: 'app',
  components: {
    ChatBox,
    UserBar,
    Landing
  },
  beforeMount() {
    this.$store.dispatch('getUsers');
  },
}
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  background: snow;
  display: flex;
}
</style>
