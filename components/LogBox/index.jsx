import { useState, useEffect } from "react";
import TailwindConfig from "tailwind.config";
import { getTradeBook } from "utils/api";
import { useSelector } from "react-redux";

export default function() {
    const selectedToken = useSelector((state) => state.util.selectedToken);
    const [tradeBook, setTradeBook] = useState([]);
    const [selectedTab, selectTab] = useState("Holders");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async() => {
        console.log("loading data");
        const data = await getTradeBook(selectedToken.addr);
        console.log("data", data);
    }

    const onSelectTab = (label) => {
        selectTab(label);
        switch(label) {
            case "Tradebook" : 
                break;
            case "Holders" :
                break;
            case "Details":
                break;
            case "Liquidity":
        }
    }

    return (
        <div className="w-full rounded-[5px] bg-[#1E2735] mt-[20px]">
            <div className="flex justify-start items-center p-[10px]">
                <button className={(selectedTab=="Tradebook" ? "bg-[#2c3542] " : "") + "px-[20px] py-[5px] text-center rounded-[.25rem] text-white mr-[10px]"}
                    onClick={() => onSelectTab("Tradebook")}>
                    Tradebook
                </button>
                <button className={(selectedTab=="Holders" ? "bg-[#2c3542] " : "") + "px-[20px] py-[5px] text-center rounded-[.25rem] text-white mr-[10px]"}
                    onClick={() => onSelectTab("Holders")}>
                    Holders
                </button>
                <button className={(selectedTab=="Details" ? "bg-[#2c3542] " : "") + "px-[20px] py-[5px] text-center rounded-[.25rem] text-white mr-[10px]"}
                    onClick={() => onSelectTab("Details")}>
                    Details
                </button>
                <button className={(selectedTab=="Liquidity" ? "bg-[#2c3542] " : "") + "px-[20px] py-[5px] text-center rounded-[.25rem] text-white mr-[10px]"}
                    onClick={() => onSelectTab("Liquidity")}>
                    Liquidity
                </button>
            </div>
            <div className="p-[10px]">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[black] text-[white] py-[10px] text-[.75rem] h-[40px] border-b-[#5cea69] border-b-[1px]">
                            <th className="px-[10px] min-w-[120px] text-left">Time</th>
                            <th className="px-[10px] min-w-[120px] text-left">Traded</th>
                            <th className="px-[10px] min-w-[120px] text-left">Token Price</th>
                            <th className="px-[10px] min-w-[120px] text-left">Type</th>
                            <th className="px-[10px] min-w-[240px] text-left">Wallet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tradeBook.map((data, index)=>{
                                return(
                                    <tr key={data.transaction.hash} className={String(data.sellCurrency.address).toUpperCase() === String(selectedToken.contract_address).toUpperCase() ? 'sell' : 'buy'}>
                                        <td><div><p>{data.block.timestamp.time}</p></div></td>
                                        <td><div><p>{data.tradeAmount}</p></div></td>
                                        <td><div><p>{String(data.sellCurrency.address).toUpperCase() === String(selectedToken.contract_address).toUpperCase() ? data.tradeAmount / data.sellAmount : data.tradeAmount / data.buyAmount}</p></div></td>
                                        <td><div><p>{String(data.sellCurrency.address).toUpperCase() === String(selectedToken.contract_address).toUpperCase() ? 'Sell' : 'Buy'}</p></div></td>
                                        <td><div><p>{data.transaction.txFrom.address}</p></div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                </table>
                {
                    tradeBook.length == 0 &&
                    <div className="w-full text-center h-50px py-[5px] text-[white]">
                        No data
                    </div>
                }
            </div>
        </div>
    )
}