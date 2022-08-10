import Image from "next/image";

export default function TokenListItem({icon, name, symbol, address, isNativeToken, onClickHandler}) {
    const onClick = () => {
        onClickHandler({name, symbol, addr: address, isNativeToken});
    }
    return (
        <div className="w-full py-[1px] px-[20px] h-[80px] flex items-center"
            onClick={() => onClick()}>
            <div className="w-[60px] h-[60px] mr-[10px] flex justify-center items-center">
                { icon && icon.length > 0 ?
                    <Image alt="" width={40} height={40}
                        src={icon}/> :
                    <div className="flex justify-center items-center w-[50px] h-[50px] rounded-[50%] bg-[gray] text-[white]">
                        <p className="text-[24px]"> {String(symbol).substring(0,1)}</p>
                    </div>
                }
            </div>
            <div className="flex flex-col">
                <p className="text-[16px] text-[#ffffffb2]"> { name } </p>
                <p className="text-[12px] text-[#ffffff70]"> { symbol + ' : ' + address} </p>
            </div>
        </div>
    )
}