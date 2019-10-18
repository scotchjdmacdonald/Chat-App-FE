<template>
  <div class="chatbox" v-if="userChosen">
    <div class="recipient-bar">
      with: <span class="recipient">{{recipient.username}}</span>
    </div>
    <div class="chat-window">
      <Message v-for="(message, index) in messages" :userId="currentUser.user_id" :senderId="message.sender_id" :message="message" :key="index"/>
    </div>
    <div class="input-bar">
      <input class="message-input" v-model="newMessage" v-on:keyup.enter="sendMessage()" placeholder="send a message">
    </div>
  </div>
</template>

<script>
import Message from './common/Message';

export default {
  name: 'ChatBox',
  components: {
    Message,
  },
  mounted(){
    setInterval(() => {
      if(this.$store.state.userChosen)
          this.$store.dispatch('getMessages');
    }, 3000);
  },
  methods: {
    sendMessage() {
      this.$store.dispatch('sendMessage');
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.currentUser;
    },
    userChosen(){
      return this.$store.state.userChosen;
    },
    recipient(){
      return this.$store.state.currentRecipient;
    },
    messages(){
      return this.$store.state.messages;
    },
    newMessage: {
      get(){
        this.$store.newMessage;
      },
      set(value){
        this.$store.commit('updateNewMessage', value);
      }
    }
  }
}
</script>

<style scoped>

select {
  width: 200px;
  height: 40px;
  border: none;
  font-size: 25px;
}

.input-bar {
  width: 60vw;
  position: absolute;
  bottom: 10px;
  right: 0;
  left: 0;
  margin: auto;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-top: 15px;
  background-color: grey;
  border-radius: 3px;
  padding-right: 50px;
}

.message-input{
  width: 98%;
  height: 25px;
  font-size: 15px;
  padding-left: 10px;
  border: none;
  border-radius: 3px;
}

.chatbox{
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Montserrat', sans-serif !important;
}

.chat-window {
  display: grid;
  padding-left: 50px;
  padding-right: 50px;
  height: 70vh;
  overflow: scroll;
}

.recipient {
  font-size: 25px;
}

span {
  font-size: 30px;
}

.recipient-bar {
  width: 100%;
  height: 60px;
  color: #04052E;
  font-weight: 600;
  text-align: center;
  padding-top: 20px;
}

</style>
