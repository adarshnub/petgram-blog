import { appwriteConfig, databases } from '@/lib/appwrite/config';
import  { useEffect,  useState } from 'react';
import {ID, Query} from 'appwrite';

import { BsFillSendFill } from "react-icons/bs";

export const formatTimestamp = (timestamp:string) => {
    const data = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(data)
}

const ChatRoom = () => {
    const [messages,setMessages] = useState<any[]>([]);
    const [messageBody,setMessageBody] = useState('');
    // const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getMessages()
    },[]);

    useEffect(() => {
        const scrollableDiv = document.getElementById('scrollableDiv');
        if (scrollableDiv) {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
          console.log(scrollableDiv,'scrolling')
        }
      }, [messages]);
    

    const getMessages = async() => {
        const response = await databases.listDocuments(
            appwriteConfig.databseId,
            appwriteConfig.messagesCollectionId,
            [
                // Query.orderAsc('$createdAt'),
                Query.limit(50)
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
    
//     const scrollableDiv: HTMLDivElement | null = document.getElementById('scrollableDiv')  as HTMLDivElement | null;

//   // Check if the element exists before manipulating it
//   if (scrollableDiv) {
//     // Automatically scroll to the bottom
//     scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
//   }
  
    
  return (
 
    <div className='flex container  w-full h-full'>
        <div className='flex flex-col gap-4 border rounded-lg p-2  w-full relative'>
          
            {/* //////////code seperation//////////// */}
            <div id="scrollableDiv"
            className='flex flex-col gap-4 overflow-y-auto h-[70vh] md:h-[70vw] '>
            {messages.map(message => (
                <div
                key={message.$id} 
                className="flex items-start justify-start gap-2.5">
                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                   <div className="inline-block    h-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700  overflow-x-hidden max-w-[400px] xl:max-w-[800px]">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse justify-between ">
                         <span className="text-sm font-semibold text-gray-900 dark:text-white ">Bonnie Green</span>
                         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formatTimestamp(message.$createdAt)}</span>
                      </div>
                      <p className=" text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words">{message.body}</p>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                   </div>
                   {/* <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                         <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                      </svg>
                   </button> */}
                  
                </div>
            ))}
            </div>
            {/* //////////code seperation//////////// */}
             <div className='flex   container  mb-8'>
                <form 
                onSubmit={handleSubmit}
                className='flex gap-2 w-full'>
                    <input
                     className='py-2 text-black text-center rounded-lg bg-gray-200 w-full'
                     required
                     placeholder='Type your message here'
                     value={messageBody}
                     onChange={(e) => {setMessageBody(e.target.value)}}   
                     />
                    <button 
                    className='bg-violet-400 hover:bg-red-500 hover:font-extrabold text-sm font-bold px-3 py-2 rounded-lg text-black hover:text-white ' 
                    type='submit'>
                        <BsFillSendFill />
                    </button>
                </form>
            </div>
        </div>
    </div>
   
  )
}

export default ChatRoom;


//h-[70vh] md:h-[70vw] 