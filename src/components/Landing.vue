<template>
  <div class="landing" v-if="userNotChosen">
      <div class="q-container">
        <div class="question">
            <h1>Who are you?</h1>
        </div>
        <div class="choose-p">
            <UserChoice v-for="(user, index) in users"
                :user="user" :key="index"/>
        </div>
      </div>
  </div>
</template>

<script>
import UserChoice from './common/UserChoice.vue';

export default {
  name: 'Landing',
  components: {
      UserChoice,
  },
  computed: {
    users() {
      return (this.$store.state.users);
    },
    userNotChosen(){
      return !(this.$store.state.userChosen);
    }
  }
}
</script>

<style scoped>

.q-container{
    margin: auto;
    padding-top: 10%;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
}

.landing{
  width: 100%;
  height: 100%;
}

.choose-p {
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: auto;
}

.question {
    font-size: 40px;
    color: grey;
}

</style>
