import { tokens } from "config/tokens"
import TokenListItem from "components/TokenListItem"
import { useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFolderBlank } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from 'react-spinners';
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getTokenInfo } from "utils";
import { useUtil } from "store/hook";

export default function TokenSelectorPanel({onClickHandler}) {
    const {selectedNetwork} = useUtil();
    const [searchString, setSearch] = useState();
    const [tokenList, setTokenList] = useState(tokens[selectedNetwork.chainId]);
    const [isEmpty, setEmpty] = useState(false);
    const [isLoading, setLoading] = useState(false);

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
        if(tokenList.filter(token => checkSearch(token, value)).length == 0) {
            if (Web3.utils.isAddress(value)) {
                loadTokenInfo(value);
            } else {
                setEmpty(true);
                setLoading(false);
            }
        } else {
            setLoading(false);
            setEmpty(false);
        }
        setSearch(value);
    }

    const onSelect = (token) => {
        onClickHandler(token);
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
        <div className="w-[480px] h-[400px] flex flex-col z-45">
            <input
                className=" bg-[#1E2735] border-b-[3px] border-b-[#2c2c2c] text-[white] caret-[white] rounded-t-[5px] w-full h-[50px] py-[10px] px-[20px]"
                type="text" placeholder="Select token"
                onChange={(e) => onChange(e.target.value)}
            ></input>
            <div className="w-full h-[320px] bg-[#1E2735] rounded-b-[8px] flex flex-col overflow-scroll overflow-x-auto">
                {
                    tokenList.filter(token => checkSearch(token, searchString)).map((token, key) =>
                        <TokenListItem key={key} name={token.name} symbol={token.symbol} address={token.addr} onClickHandler={onSelect}/>
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
        </div>
    )
}