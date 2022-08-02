import TokenButton from "./TokenButton";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function SwapPanel() {
    return (
        <div className="mt-[30px] w-full">
            <h1 className="text-[white] mb-[20px] text-[24px]"> Swap </h1>
            <div className="w-full flex flex-col mb-[20px]">
                <p className="text-[white] pl-[10px] mb-[5px]"> From </p>
                <div className="w-full flex">
                    <input className="h-[40px] bg-[transparent] border-b-[1px] border-[#1E2735] px-[10px] text-[white] mr-[10px] w-auto"
                    ></input>
                    <TokenButton label="BNB"/>
                </div>
            </div>
            <div className="w-full flex justify-center items-center h-[24px]">
                <FontAwesomeSvgIcon icon={faArrowDown} className="text-[#5cea69] h-[24px] w-[24px]"/>
            </div>
            <div className="w-full flex flex-col mb-[20px]">
                <p className="text-[white] pl-[10px] mb-[5px]"> To </p>
                <div className="w-full flex">
                    <input className="h-[40px] bg-[transparent] border-b-[1px] border-[#1E2735] px-[10px] text-[white] mr-[10px]"
                    ></input>
                    <TokenButton label="BNB"/>
                </div>
            </div>
            <div className="w-full flex justify-end mb-[20px]">
                <button className="flex items-center h-[40px] rounded-[5px] border bg-[#5cea69] px-[10px]">
                    <p className="px-[5px]"> Connect Wallet </p>
                </button>
            </div>
        </div>
    )
};