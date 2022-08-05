export default function StreamChat() {
    return (
        <div className="w-full flex flex-col bg-[#1E2735] min-h-[500px]">
            <div className="w-full h-[45px] items center p-[10px] bg-[#111822]">
                <p className="text-[#ffffffb2]"> Stream chat </p>
            </div>
            <div className="w-full min-h-[200px]">

            </div>
            <div className="p-[10px]">
                <div className="w-full p-[10px] border border-[black] text-[gray] mb-[10px] rounded-[5px]">
                    <p>Slow mode</p>
                    <p>Users may send message every 3 seconds</p>
                </div>
                <input
                    className="w-full rounded-[5px] text-white h-[40px] mb-[10px] px-[10px] bg-[#303B4D]"
                    type="text"
                    placeholder="Type a message"
                ></input>
                <div className="flex justify-end">
                <button  className='relative bg-[#5cea69] hover:bg-[#40A349] rounded-[6px] h-[32px] px-[20px] flex items-center justify-center text-[1.1rem]'
                    onClick={() => {dispatch(showWalletConnector())}}> Send 
                </button>
                </div>
            </div>
        </div>
    );
};