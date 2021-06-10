import axios from "axios";
import {ADD_CONVERSATION_URL, ADD_MESSAGE_URL, GET_CONVERSATIONS_URL, GET_MESSAGES_URL} from "../Urls";

export const getConversations = async () => {
    return (await axios.get(GET_CONVERSATIONS_URL)).data;
}

export const addConversation = async (userId) => {
    const data = new FormData();
    data.append("userId", userId);
    return (await axios.post(ADD_CONVERSATION_URL, data)).data;
}

export const getMessages = async (conversationId) => {
    return (await axios.get(GET_MESSAGES_URL + "/" + conversationId)).data;
}

export const addMessage = async (conversationId, text) => {
    const data = new FormData();
    data.append("text", text);
    return (await axios.post(ADD_MESSAGE_URL + "/" + conversationId, data)).data;
}
