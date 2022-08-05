import Image from "next/image";

export default function TokenButton({label, onClickHandler, id}) {

    const onClick = () => {
        onClickHandler(id);
    }
    
    return (
        <button className="flex items-center h-[40px] rounded-[20px] border border-[#5cea69] bg-[#1f2b13] px-[10px] flex-none"
            onClick={() => onClick()}>
            <div className="mr-[5px] w-[24px] h-[24px]">
                <Image alt="" width={24} height={24}
                    src="/images/binance.svg"/>
            </div>
            <p className="px-[5px] text-[white]">{ label }</p>
        </button>
    )
};