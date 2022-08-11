import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core";
import { useUtil } from "store/hook";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { NETWORKS } from "config";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { selectNetwork } from 'store/slices/utilSlice';

export default function NetworkSelector({cls}) {
    const { account, library } = useWeb3React();
    const [ isDropDown, openDropDown] = useState(false);
    const { selectedNetwork }  = useUtil();
    const dispatch = useDispatch();

    const onSelectNetwork = (network) => {
        console.log(network);
        if(network.chainId != selectedNetwork.chainId) {
            dispatch(selectNetwork({network}));
        }
        openDropDown(false);
    }

    useEffect(() => {
        if(account) {
            switchNetwork();
        }
    }, [selectedNetwork])

    // example of switching or adding network with Harmony Mainnet
    const switchNetwork = async () => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: '0x' + Number(selectedNetwork.chainId).toString(16) }],
            });
        } catch (switchError) {
            // 4902 error code indicates the chain is missing on the wallet
            if (switchError.code === 4902) {
                try {
                await library.provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                    {
                        chainId: '0x' + Number(selectedNetwork.chainId).toString(16),
                        rpcUrls: [selectedNetwork.rpcurl],
                        chainName: selectedNetwork.name,
                        nativeCurrency: selectedNetwork.nativeCurrency,
                        blockExplorerUrls: selectedNetwork.blockExplorerUrls,
                        // iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
                    }
                    ],
                });
                } catch (error) {
                console.error(error)
                }
            }
        }
    };

    return (
        <div className={cls + " relative"}>
            <button 
                className='relative bg-[#5cea69] hover:bg-[#40A349] rounded-[6px] h-[40px] px-[20px] flex items-center justify-center mr-[10px] text-[1.1rem]'
                    onClick={() => openDropDown(true)}
                >
                <div className='mr-[10px]'>
                    <div className="w-[24px] h-[24px] bg-[white] rounded-[50%] flex justify-center items-center">
                        <Image src='/images/binance.svg' alt='' width={20} height={20}/>
                    </div>
                </div>
                <p>
                    { selectedNetwork.symbol }
                </p>
                <div className='ml-[10px]'>
                    <FontAwesomeSvgIcon icon={isDropDown ? faSortUp : faSortDown} className={"w-[16px] h-[16px]" + (isDropDown ? " mt-[8px]" : " -mt-[8px]")}/>
                </div>
            </button>
            { isDropDown &&
                <>
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-40" 
                        onClick={() => openDropDown(false)}>
                    </div>
                    <div className="absolute w-full h-auto bg-[#1E2735] rounded-[8px] mt-[5px] mr-[10px] shadow border border-[#ffffff70] z-40 top-[45px]">
                        { NETWORKS.map((item, key) => 
                            <div className="w-full p-[10px] flex items-center hover:bg-[#ffffff70] text-[#ffffffb2] hover:text-[#000000b2]" key={key}
                                onClick = {() => onSelectNetwork(item)}>
                                <Image alt="" width={24} height={24}
                                    src={item.icon}/>
                                <p className="ml-[10px]">{ item.symbol }</p>
                            </div>
                        )}
                    </div>
                </> 
            }   
        </div>
    )
}