<template>
  <div class="user-bar" v-if="userChosen">
      <div>
          <div class="current-user">
              <span>chatting as: <br/> <h2>{{currentUser.username}}</h2></span>
          </div>
          <hr>
      </div>
      <div class="change-button"><button v-on:click="changeUser">change user</button></div>
  </div>
</template>

<script>
export default {
  name: 'UserBar',
  methods: {    
      changeUser(){
          this.$store.dispatch('resetUser');
      }
  },
  computed: {
    userChosen(){
        return this.$store.state.userChosen;
    },
    currentUser(){
        return this.$store.state.currentUser;
    }
  }
}
</script>

<style scoped>

hr {
    width: 80%;
}

.current-user {
    text-align: center;
    color: white;
    font-size: 10px;
    padding-top: 30px;

}

.user-bar{
    font-family: 'Montserrat', sans-serif;
    width: 30vw;
    height: 100%;
    background: darkblue;
    position: relative;
}

h2 {
    margin-top: 10px;
    font-size: 30px;
}

button {
    border: none;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 3px;
    background-color: #04052E;
    color: snow;
    font-weight: 500;
    font-size: 12px;
    cursor: pointer;
}

.change-button {
    right: 0px;
    left: 0px;
    margin: auto;
    width: fit-content;
    position: absolute;
    bottom: 30px;
}

</style>
