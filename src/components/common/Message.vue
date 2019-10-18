<template>
  <div class="message">
    <div class="message-box" :class="pos">
        {{message.message_text}}
        <div class="timestamp"><span>{{(message.created_at).split(' ')[1]}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object,
    senderId: String,
    userId: String
  },
  data: function() {
    return {
        pos: (this.senderId === this.userId ? 'left' : 'right'),
    }
  }
}
</script>

<style scoped>

.message{
    width: 100%;
    display: block;
}

.left {
    float: left;
    background-color: grey;
}

.right {
    float: right;
    background-color: darkblue;
}

.timestamp {
    font-size: 7px;
    padding-top: 3px;
}

.message-box{
    color: white;
    padding: 10px 10px 10px 10px;
    width: fit-content;
    font-size: 15px;
    font-family: 'Montserrat', sans-serif !important;
    border-radius: 5px;
    margin-bottom: 20px;
}

</style>
