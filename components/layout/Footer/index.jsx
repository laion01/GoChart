import Image from 'next/image';
import ChatButton from './ChartButton';
import SocialMedia from './SocialMedia';
export default function Footer() {
    return (
        <div className="w-full bg-[#3234ff] flex flex-col md:flex-row justify-center md:justify-between px-[120px] py-[30px] items-center">
            <div className='flex flex-col'>
                <div className='text-xs pt-2 text-[white] text-[1.2rem]'>
                    @ 2022 GoChart
                </div>
                
            </div>
            <div className='flex'>
                
            </div>
            {/* <div className='flex flex-col justify-end items-center'>
                    <div className='flex space-x-[5px]'>
                <ChatButton imagePath='/images/discord.png' bgColor='#6e52cd' text='Join Discord' />
                <ChatButton imagePath='/images/telegram.png' bgColor='#005dff' text='Join Telegram' />
                </div>
                <div className='text-[12px] pt-[9px] pl-[2px] w-[344px] text-center sm:text-left' style={{color: '#AAAAAA'}}>
                Chat with the community, ask questions, get involved in 
                competitions and more!
                </div>

            </div> */}
        </div>
    )
}