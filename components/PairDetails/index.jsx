import Image from "next/image";

export default function PairDetails() {
    return (
        <div className="w-full mt-[20px] h-[80px] flex justify-start">
            <div className="w-fit h-[80px] p-[16px] flex justify-between items-center bg-[#1E2735] rounded-[5px]">
                <Image alt="" width={32} height={20}
                    src="/icon.png"/>
                <div className="flex flex-col justify-center ml-[10px] text-[white]">
                    <p>GC</p>
                    <p>$0.345</p>
                </div>
                <div className="flex flex-col justify-center ml-[10px] items-end text-[white]">
                    <p>Babyswap</p>
                    <p>3.8%</p>
                </div>
            </div>

        </div>
    )
}