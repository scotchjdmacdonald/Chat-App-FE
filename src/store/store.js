import Vuex from 'vuex';
import Vue from 'vue';
import { error } from 'util';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    userChosen: false,
    currentRecipient: { username: null, user_id: null},
    currentUser: { username: null, user_id: null},
    messages: null,
    newMessage: null,
  },

  getters: {
    getNewMessage: state => () => {
        return state.newMessage;
    },
    numberOfMessages: state => () => {
        return (state.messages ? (state.messages).length  : 0); 
    },
    currentRecipientId: state => () => {
        return state.currentRecipient.user_id;
    },
    currentSenderId: state => () => {
        return state.currentUser.user_id;
    },
    getRecipientUser : (state) => (id) => {
        return state.users.find(u => u.user_id !== id);
    }
  },

  mutations: {
    updateRecipient(state, recipient){
        Vue.set(state, 'currentRecipient', recipient);
    },
    updateUsers(state, users){
        Vue.set(state, 'users', [...users]);
    },
    selectUser(state, user){
        Vue.set(state, 'currentUser', user);
    },
    showChat(state){
        state.userChosen = !(state.userChosen);
    },
    updateMessages(state, messages){
        Vue.set(state, 'messages', [...messages]);
    },
    updateNewMessage(state, message){
        state.newMessage = message;
    }
  },

  actions: {

    resetUser({commit}){
        commit('showChat');
        commit('selectUser', null);
    },
    chooseUser({commit, dispatch, getters}, user) {
        commit('showChat');
        commit('selectUser', user);
        const recipient = getters.getRecipientUser(user.user_id);
        commit('updateRecipient', recipient);
        dispatch('getMessages');
    },

    sendMessage({getters, dispatch}){
        const recipient_id = getters.currentRecipientId();
        const sender_id = getters.currentSenderId();
        const message_text = getters.getNewMessage();

        if(message_text !== null){
            axios
            .post(`${process.env.VUE_APP_CHATAPP_BE_API}/message/send`, {
                recipient_id: recipient_id,
                sender_id: sender_id,
                message_text: message_text
            })
            .then((response)=> {
                console.log(response);
                if(response.status == 201){
                  dispatch('getMessages');
                }
                else{
                    throw error;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },

    getMessages({commit, getters}) {
      const sender_id = getters.currentSenderId();
      const recipient_id = getters.currentRecipientId();
      axios
        .get(`${process.env.VUE_APP_CHATAPP_BE_API}/messages/${sender_id}/${recipient_id}`)
        .then((response)=>{
            console.log(response);
            if(response.status == 200){
                if(response.data){
                    const messages = response.data;
                    const curNumMs = getters.numberOfMessages();
                    if(messages.length > curNumMs){
                        commit('updateMessages', messages)                        
                    }
                }
            }
            else{
                throw error;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getUsers({commit}) {
      axios
        .get(`${process.env.VUE_APP_CHATAPP_BE_API}/users`)
        .then((response) => {
            console.log(response);
            if(response.status == 200){
                const users = response.data;
                commit('updateUsers', users);
            }
            else{
                throw error;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
  },
});
