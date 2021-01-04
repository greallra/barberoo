import { getToken } from '../../http/localStorage'
import axios from '../../axios'

export const setConversations = (data) => ({
  type: 'SET_CONVERSATIONS',
  data
})

export const getConversations = () => {
  return async (dispatch) => {
    try {
      let token = getToken()
      const res = await axios.get('/chat/conversations', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      if(res.status === 201) {
   
         dispatch(setConversations(res.data.conversations));
      }

    } catch (error) {
      console.log(error);
    }
  }
}

export const setActiveMessagesId = (data) => ({
  type: 'SET_ACTIVE_MESSAGES_ID',
  data
})

export const setActiveMessages = (data) => ({
  type: 'SET_ACTIVE_MESSAGES',
  data
})
export const setInConversationWith = (data) => ({
  type: 'SET_IN_CONVERSATION_WITH',
  data
})
export const toggleConversation = (conversation_id) => {
  return async (dispatch, getState) => {
    try {
      const config = {
        method: 'post',
        url: '/chat/messages',
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        },
        data: {
          conversation_id
        }
      };
      const res = await axios(config)
      if(res.status === 200) {
        const me = getState().user
        const activeConversation = getState().chat.conversations.find( (conversation) => conversation._id === conversation_id );

        const inConversationWith = activeConversation.users.find( (user) => user._id !==  me._id)
        dispatch(setActiveMessages(res.data));
        dispatch(setActiveMessagesId(conversation_id));
        dispatch(setInConversationWith(inConversationWith));
        } 
    } catch (e) {
      console.log(e);
    }
  }
}

export const startConversation = (client_id, barber_id) => {
  return async (dispatch) => {
    try {
      const config = {
        method: 'post',
        url: '/chat/create',
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        },
        data: {
          client_id,
          barber_id
        }
      };
      const res = await axios(config)
      dispatch(setActiveMessages(res.data));
    } catch (e) {
      console.log(e);
    }
  }
}

export const deleteConversation = (conversation_id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        }
      }
        await axios.delete(`/chat/conversations/${conversation_id}`, config)
        dispatch(getConversations())
    } catch (e) {
        console.log(e);
    }
  }
}

export const addMessage = (data) => ({
  type: 'ADD_MESSAGE',
  data
})

export const sendMessage = (conversation_id, text) => {
  return async () => {
    try {
      const config = {
        method: 'post',
        url: '/chat/message',
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        },
        data: {
          conversation_id,
          text,
        }
      };
      const res = await axios(config)
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    
  }
}
