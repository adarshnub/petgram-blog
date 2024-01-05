import { appwriteConfig, databases } from '@/lib/appwrite/config';
import React, { useEffect, useState } from 'react';
import {ID, Query} from 'appwrite';

import { BsFillSendFill } from "react-icons/bs";

const ChatRoom = () => {
    const [messages,setMessages] = useState<any[]>([]);
    const [messageBody,setMessageBody] = useState('');

    useEffect(() => {
        getMessages()
    },[])

    const getMessages = async() => {
        const response = await databases.listDocuments(
            appwriteConfig.databseId,
            appwriteConfig.messagesCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(20)
            ]
             );
        console.log(response,'ResponseData')
        setMessages(response.documents)
       
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        const payload = {
            body:messageBody
        }

        const response = await databases.createDocument(
            appwriteConfig.databseId,
            appwriteConfig.messagesCollectionId,
            ID.unique(),
            payload,
           
        )
        console.log(response,'New response Data')
        setMessages([...messages,response])

        setMessageBody('')
    }
    
  return (
 
    <div className='flex container mx-auto w-full'>
        <div className='flex flex-col gap-4 border rounded-lg p-2 container mx-auto w-full'>
           <span className='flex flex-col gap-4 h-[70vh] overflow-auto'>
            {
                messages.map(message => (
                    <div key={message.$id}
                    className='flex gap-2'>
                        <span className='rounded-full bg-gray-400 text-black px-1 py-1'>user</span>
                        <span className='bg-violet-300 rounded-md px-4 py-2 text-black w-fit'>{message.body}</span>
                    </div>
                ))
            }
            </span>
             <div className='flex w-full'>
                <form 
                onSubmit={handleSubmit}
                className='flex gap-2'>
                    <input
                     className='py-2 text-black text-center rounded-lg bg-gray-200 w-full'
                     required
                     placeholder='Type your message here'
                     value={messageBody}
                     onChange={(e) => {setMessageBody(e.target.value)}}   
                     />
                    <button 
                    className='bg-violet-400 hover:bg-red-500 hover:font-extrabold text-sm font-bold px-3 py-2 rounded-lg text-black hover:text-white' 
                    type='submit'>
                        <BsFillSendFill />
                    </button>
                </form>
            </div>
        </div>
    </div>
   
  )
}

export default ChatRoom