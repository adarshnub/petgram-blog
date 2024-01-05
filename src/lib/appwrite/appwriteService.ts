import { getCurrentUser } from './api';
import {appwriteConfig, client,databases} from './config';
import { ID,Query } from "appwrite";

export const subscribeToGroupChat = (callback: (response: any)=> void) => {
    client.subscribe(`messages.${appwriteConfig.messagesCollectionId}`,callback);
}

export const sendMessageToGroupChat = async (content:string) => {
    try {
        const newMessage = await databases.createDocument(

            appwriteConfig.databseId,
            appwriteConfig.messagesCollectionId,
            ID.unique(),
            {
                content,
                user:getCurrentUser(),
                timestamp:new Date().toISOString(),
            }
        )
        return newMessage;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getGroupChatMessages = () => {
    return databases.listDocuments(
        appwriteConfig.databseId,
        appwriteConfig.messagesCollectionId,
        [Query.orderDesc('timestamp'),Query.limit(50)]
    )
}
