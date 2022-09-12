import Image from "next/image";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faGear} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";
import { SOCKET_SERVER_URL } from "config";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat";

export default function StreamChat() {
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId: 1 },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            // console.log(message);
            addChat(message.username, message.color, message.text, false);
            // setMessages((messages) => [...messages, incomingMessage]);
        });
    }, []);


    const addChat = (user, color, text, m) => {
        const chat = {
            username: user,
            color: color,
            text: text,
            mine: m
        }
        console.log("add Chat", chat);
        chatList.push(chat);
        setChatList(chatList);
    };

    const onSendMsg = (text) => {
        console.log(text);
        if(text == "")
            return ;
        // addChat("user1", "red", text, true);

        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            text: text, 
            color: "red",
            username: "user1",
            min: true,
        });
        
        setMessage("");
        
    }


    return (
        <div className="w-full flex flex-col bg-[#1E2735] lg:h-[calc(100vh-80px)] h-[calc(100vh-140px)]">
            <div className="w-full h-[60px] items center p-[10px] bg-[#111822] flex flex-col justify-center">
                <p className="text-[#ffffffb2] text-[1.25rem]"> Stream chat </p>
                <div className="flex text-[#ffffffb2] text-[.75rem] items-center">
                    <div className="w-[12px] h-[12px] items-center mr-[5px] mb-[3px]">
                        <Image alt='' width={12} height={12}
                            src="/images/cryptogram-chat.png"/>
                    </div>
                    <p> Powered by Cryptogram </p>
                </div>
            </div>
            <p className="p-[10px] text-[gray] text-[.75rem]"> Welcome to the chat room!</p>
            <div className="w-full px-[10px] grow overflow-y-auto">
                {
                    chatList.map((data, index)=>{
                        return(
                            <div key={index} className={"w-full " + (data.mine ? "flex justify-end" : "flex justify-start")}>
                                <div className="min-w-[120px] max-w-[80%] mb-[10px] flex flex-col bg-[gray] rounded-[5px] p-[10px]">
                                    { !data.mine && 
                                        <p className={"text-[" + data.color + "] ml-[10px]"}> {data.username}</p>
                                    }
                                    <p className="text-[black]"> { data.text } </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-[10px]">
                <div className="w-full p-[10px] border border-[black] text-[gray] mb-[10px] rounded-[5px]">
                    <p>Slow mode</p>
                    <p>Users may send message every 3 seconds</p>
                </div>
                <input
                    className="w-full rounded-[5px] text-white h-[40px] mb-[10px] px-[10px] bg-[#303B4D]"
                    type="text"
                    value={message}
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                ></input>
                <div className="flex justify-end items-center">
                    <button>
                        <FontAwesomeSvgIcon icon={ faGear } className="w-[24px] h-[24px] mr-[10px] w-[24px] text-[gray]"/>
                    </button>
                    <button  className='relative bg-[#5cea69] hover:bg-[#40A349] rounded-[6px] h-[32px] px-[20px] flex items-center justify-center text-[1.1rem]'
                        onClick={(e) => onSendMsg(message)}> Send 
                    </button>
                </div>
            </div>
        </div>
    );
};