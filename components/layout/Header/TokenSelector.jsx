import { useState } from "react"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { tokens } from "config/tokens";
import TokenListItem from "components/TokenListItem";

export default function TokenSelector() {
    const [tokenAddress, setTokenAddress] = useState();
    const [isDropDown, openDropDown] = useState(false);
    const [tokenList, setTokenList] = useState(tokens[56]);

    const onChange = (value) => {
        setTokenAddress(value)
        if(String(value).length) {
            openDropDown(true);
        } else {
            openDropDown(false);
        }
    }

    const onSelect = (token) => {
        console.log(token);
    }
    return (
        <div className="relative mr-[10px]">
            <div className="w-full flex">
                <input 
                    className="w-[420px] h-[40px] text-[white] rounded-l-[8px] px-[10px] bg-[#1E2735] caret-[white]"
                    placeholder="Input Token address"
                    value={tokenAddress}
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
                    <div className="absolute w-full h-[320px] bg-[#1E2735] rounded-[8px] mt-[5px] flex flex-col overflow-scroll overflow-x-auto">
                        {
                            tokenList.map((token, key) =>
                                <TokenListItem key={key} name={token.name} symbol={token.symbol} address={token.addr} onClickHandler={onSelect}/>
                            )
                        }
                    </div>
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-40" 
                        onClick={() => openDropDown(false)}>
                    </div>
                </> 
            }
        </div>
    )
}