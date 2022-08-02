import { useState } from "react"
import { useWeb3React } from "@web3-react/core";
import { useUtil } from "store/hook";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

export default function NetworkSelector() {
    const [ isDropDown, openDropDown] = useState(false);
    const { selectedNetwork }  = useUtil();

    const onSelectNetwork = (network) => {

    }
    return (
        <div className="relative">
            <button 
                className='relative bg-[#5cea69] hover:bg-[#40A349] border-2 border-[#afc4d3] border-b-[#7ea0b8] rounded-[6px] h-[40px] px-[20px] flex items-center justify-center mr-[10px] text-[1.1rem]'
                    onClick={() => openDropDown(true)}
                >
                <div className='mr-[10px]'>
                    <div className="w-[24px] h-[24px] bg-[white] rounded-[50%] flex justify-center items-center">
                        <Image src='/images/binance.svg' alt='' width={20} height={20}/>
                    </div>
                </div>
                <p>
                    BSC
                </p>
                <div className='ml-[10px]'>
                    <FontAwesomeSvgIcon icon={isDropDown ? faSortUp : faSortDown} className={"w-[16px] h-[16px]" + (isDropDown ? " mt-[8px]" : " -mt-[8px]")}/>
                </div>
            </button>
            { isDropDown &&
                <>
                    <div className="absolute w-full h-[200px] bg-[#1E2735] rounded-[8px] mt-[5px] mr-[10px]">

                    </div>
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" 
                        onClick={() => openDropDown(false)}>
                    </div>
                </> 
            }   
        </div>
    )
}