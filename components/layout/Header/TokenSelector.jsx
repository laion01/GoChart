import { useState } from "react"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faSortDown, faSortUp, faFolderBlank } from "@fortawesome/free-solid-svg-icons";
import { tokens } from "config/tokens";
import TokenListItem from "components/TokenListItem";
import { ClipLoader } from 'react-spinners'
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { BEP20_ABI } from "config/abi";
import { RPCURL } from "config";
import { getTokenInfo } from "utils";
import { useDispatch } from "react-redux";
import { selectToken } from 'store/slices/utilSlice';
import { useUtil } from "store/hook";

export default function TokenSelector() {
    const {selectedNetwork} = useUtil();
    const [searchString, setTokenAddress] = useState("");
    const [isDropDown, openDropDown] = useState(false);
    const [tokenList, setTokenList] = useState(tokens[selectedNetwork.chainId]);
    const [isEmpty, setEmpty] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function loadTokenInfo(tokenAddr) {
        try {
            setLoading(true);
            const list = tokenList;
            const token = await getTokenInfo(tokenAddr, selectedNetwork.chainId);
            list.push(token);
            setTokenList(list);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setEmpty(true);
            console.log(e);
        }
    }

    const onChange = (value) => {
        if(String(value).length > 0) {
            openDropDown(true);
        } else {
            openDropDown(false);
        }
        if(tokenList.filter(token => checkSearch(token, value)).length == 0) {
            if (Web3.utils.isAddress(value)) {
                openDropDown(true);
                loadTokenInfo(value);
            } else {
                setEmpty(true);
                setLoading(false);
            }
        } else {
            setLoading(false);
            setEmpty(false);
        }
        
        setTokenAddress(value);
        
    }

    const onSelect = (token) => {
        console.log(token.address);
        setTokenAddress(token.address);
        dispatch(selectToken({token}))
        openDropDown(false);
    }

    const checkSearch = (tokenInfo, str) =>  {
        if(!str) return true;
        const name = String(tokenInfo.name).toLowerCase();
        const symbol = String(tokenInfo.symbol).toLowerCase();
        const addr = String(tokenInfo.addr).toLowerCase();
        const searchStr = String(str).toLowerCase();
        if(name?.includes(searchStr) || symbol?.includes(searchStr) || addr?.includes(searchStr))
            return true;
        return false;
    }

    return (
        <div className="relative mr-[10px]">
            <div className="w-full flex">
                <input 
                    className="w-[420px] h-[40px] text-[white] rounded-l-[8px] px-[10px] bg-[#1E2735] caret-[white]"
                    placeholder="Input Token address"
                    value={searchString}
                    type='text'
                    onChange={(e) => onChange(e.target.value)}>
                </input>
                <div className="rounded-r-[8px] w-[40px] h-[40px] bg-[#1E2735] flex justify-center items-center"
                    onClick={() => openDropDown(!isDropDown)}>
                    <FontAwesomeSvgIcon icon={isDropDown ? faSortUp : faSortDown} className={"w-[16px] h-[16px]" + (isDropDown ? " mt-[8px]" : " -mt-[8px]")}/>
                </div>
            </div>
            { isDropDown &&
                <>
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-40" 
                        onClick={() => openDropDown(false)}>
                    </div>
                    <div className="absolute w-full max-h-[320px] bg-[#1E2735] rounded-[8px] mt-[5px] flex flex-col overflow-scroll overflow-x-auto z-40">
                        {
                            tokenList.filter(token => checkSearch(token, searchString)).map((token, key) =>
                                <TokenListItem key={key} name={token.name} symbol={token.symbol} address={token.addr} isNativeToken={token.isNativeToken} onClickHandler={onSelect}/>
                            )
                        }
                        { isEmpty && 
                            <div className="px-[20px] py-[10px] h-[60px] flex items-center">
                                <FontAwesomeSvgIcon icon={ faFolderBlank } className="w-[40px] h-[40px] text-[gray] ml-[10px]"/>
                                <p className="pl-[30px] text-[#ffffffb2] text-[16px]"> Not found </p>
                            </div>
                        }
                        { isLoading && 
                            <div className="px-[20px] py-[10px] flex items-center h-[64px]">
                                <ClipLoader speedMultiplier={0.5} color='gray' size={50} className="ml-[5px]"/>
                                <p className="pl-[30px] text-[#ffffffb2] text-[16px]"> Loading </p>
                            </div>
                        }
                    </div>
                </> 
            }
        </div>
    )
}