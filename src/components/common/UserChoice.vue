<template>
  <div class="person">
    <button v-on:click="choosePerson(user)">
        {{user.username}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserChoice',
  props: {
    user: Object,
  },
  computed: {
      getUser(){
          return this.$props.user;
      }
  },
  methods: {
    choosePerson(){
        const id = this.$props.user.user_id;
        const username = this.$props.user.username;
        const payload = {"user_id": id, "username": username}
        this.$store.dispatch('chooseUser', payload);
    }
  }
}
</script>

<style scoped>

.person{
    margin-right: 20px;
    margin-left: 20px;
}

button {
    font-size: 25px;
    color: snow;
    background-color: blue;
    border-radius: 5px;
    text-align: center;
    height: 100px;
    width: 200px;
    border: none;
    font-family: 'Montserrat', sans-serif !important;
    cursor: pointer;

}

</style>
