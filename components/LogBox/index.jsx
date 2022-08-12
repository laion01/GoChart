import { useState, useEffect } from "react";
import TailwindConfig from "tailwind.config";
import { getTradeBook, getYourTrades, getHolders, getDetails, getLiquidity } from "utils/api";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { ClipLoader } from 'react-spinners'
import { reduceNumebrs } from "utils";

export default function LogBox() {
    const selectedToken = useSelector((state) => state.util.selectedToken);
    const [isLoading, setLoading] = useState(false);
    const [tradeBook, setTradeBook] = useState([]);
    const [myTrades, setMyTrades] = useState([]);
    const [liquidities, setLiquidtyData] = useState([]);
    const [selectedTab, selectTab] = useState("Tradebook");
    const {account} = useWeb3React();

    useEffect(() => {
        loadData();
    }, [selectedTab, account, selectedToken]);

    const loadData = async() => {
        setLoading(true);
        console.log("loading data", selectedTab);
        let data;
        switch(selectedTab) {
            case "Tradebook" : 
                data = await getTradeBook(selectedToken.addr);
                if(data.success)
                    setTradeBook(data.data);
                break;
            case "Your Trades":
                data = await getYourTrades(selectedToken.addr, account);
                if(data.success) {
                    setMyTrades(data.data);
                }
                break;
            case "Holders" :
                data = await getHolders(selectedToken.addr);
                if(data.success) {
                    setLiquidtyData(data.data);
                }
                break;
            case "Details":
                data = await getDetails(selectedToken.addr);
                break;
            case "Liquidity":
                data = await getLiquidity(selectedToken.addr);
        }
        setLoading(false);
        console.log("-- data", data);
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
        <div className="w-full rounded-[5px] bg-[#1E2735] mt-[20px] overflow-x-auto overflow-y-auto lg:max-h-[calc(100vh-80px)] max-h-[calc(100vh-140px)] min-h-[160px]">
            <div className="flex justify-start items-center p-[10px]">
                <button className={(selectedTab=="Tradebook" ? "bg-[#2c3542] " : "") + "px-[20px] py-[5px] text-center rounded-[.25rem] text-white mr-[10px]"}
                    onClick={() => onSelectTab("Tradebook")}>
                    Tradebook
                </button>
                { account && 
                <button className={(selectedTab=="Your Trades" ? "bg-[#2c3542] " : "") + "px-[20px] py-[5px] text-center rounded-[.25rem] text-white mr-[10px]"}
                    onClick={() => onSelectTab("Your Trades")}>
                    Your Trades
                </button>
                }
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
            {selectedTab=="Tradebook" &&
            <div className="p-[10px]">
                <table className="w-full text-[12px]">
                    <thead>
                        <tr className="bg-[black] text-[white] py-[10px] text-[.75rem] h-[40px] border-b-[#5cea69] border-b-[1px]">
                            <th className="px-[10px] min-w-[140px] text-left">Time</th>
                            <th className="px-[10px] min-w-[80px] text-left">Traded</th>
                            <th className="px-[10px] min-w-[80px] text-left">Token Price</th>
                            <th className="px-[10px] min-w-[80px] text-left">Type</th>
                            <th className="px-[10px] min-w-[240px] text-left">Wallet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tradeBook.map((data, index)=>{
                                return(
                                    <tr key={index} className={" px-[10px] py-[5px] h-[30px] text-[gray]"}>
                                        <td className="h-[30px]"><div><p>{data.block.timestamp.time}</p></div></td>
                                        <td><div><p>{ reduceNumebrs(data.tradeAmount)}</p></div></td>
                                        <td><div><p>{ reduceNumebrs(String(data.sellCurrency.address).toUpperCase() === String(selectedToken.addr).toUpperCase() ? data.tradeAmount / data.sellAmount : data.tradeAmount / data.buyAmount)}</p></div></td>
                                        <td><div><p className={(String(data.sellCurrency.address).toUpperCase() === String(selectedToken.addr).toUpperCase() ? "text-[red]" : "text-[green]")}>{String(data.sellCurrency.address).toUpperCase() === String(selectedToken.addr).toUpperCase() ? 'Sell' : 'Buy'}</p></div></td>
                                        <td><div><p>{data.transaction.txFrom.address}</p></div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                </table>
                {
                    tradeBook.length == 0 &&
                    <div className="w-full text-center h-50px py-[5px] text-[white] flex justify-center items-center">
                        {isLoading && 
                        <>
                            <ClipLoader speedMultiplier={0.5} color='gray' size={24}/>
                            <p className="ml-[10px]"> Loading... </p>
                        </>
                        }
                        { !isLoading &&
                            <p className="ml-[10px]"> No data </p>
                        }
                        
                    </div>
                }
            </div>
            }
            {selectedTab=="Your Trades" &&
            <div className="p-[10px]">
            <table className="w-full text-[12px]">
                <thead>
                    <tr className="bg-[black] text-[white] py-[10px] text-[.75rem] h-[40px] border-b-[#5cea69] border-b-[1px]">
                        <th className="px-[10px] min-w-[140px] text-left">Time</th>
                        <th className="px-[10px] min-w-[80px] text-left">Traded</th>
                        <th className="px-[10px] min-w-[80px] text-left">Token Price</th>
                        <th className="px-[10px] min-w-[80px] text-left">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myTrades.map((data, index)=>{
                            return(
                                <tr key={index} className={" px-[10px] py-[5px] h-[30px] text-[gray]"}>
                                    <td className="h-[30px]"><div><p>{data.block.timestamp.time}</p></div></td>
                                    <td><div><p>{ reduceNumebrs(data.tradeAmount)}</p></div></td>
                                    <td><div><p>{ reduceNumebrs(String(data.sellCurrency.address).toUpperCase() === String(selectedToken.addr).toUpperCase() ? data.tradeAmount / data.sellAmount : data.tradeAmount / data.buyAmount)}</p></div></td>
                                    <td><div><p className={(String(data.sellCurrency.address).toUpperCase() === String(selectedToken.addr).toUpperCase() ? "text-[red]" : "text-[green]")}>{String(data.sellCurrency.address).toUpperCase() === String(selectedToken.addr).toUpperCase() ? 'Sell' : 'Buy'}</p></div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                myTrades.length == 0 &&
                <div className="w-full text-center h-50px py-[5px] text-[white] flex justify-center items-center">
                    {isLoading && 
                    <>
                        <ClipLoader speedMultiplier={0.5} color='gray' size={24}/>
                        <p className="ml-[10px]"> Loading... </p>
                    </>
                    }
                    { !isLoading &&
                        <p className="ml-[10px]"> No data </p>
                    }
                </div>
            }
            </div>
            }
            {selectedTab=="Liquidity" &&
            <div className="p-[10px]">
            <table className="w-full text-[12px]">
                <thead>
                    <tr className="bg-[black] text-[white] py-[10px] text-[.75rem] h-[40px] border-b-[#5cea69] border-b-[1px]">
                        <th className="px-[10px] min-w-[140px] text-left">Pair</th>
                        <th className="px-[10px] min-w-[80px] text-left">Pair address</th>
                        <th className="px-[10px] min-w-[80px] text-left">Token</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        liquidities.map((data, index)=>{
                            return(
                                <tr key={index} className={" px-[10px] py-[5px] h-[30px] text-[gray]"}>
                                    <td className="h-[30px]"><div><p>{data.block.timestamp.time}</p></div></td>
                                    <td><div><p>{ data.symbol}</p></div></td>
                                    <td><div><p>{ data.pairAddress}</p></div></td>
                                    <td><div><p>{ data.token0 }</p></div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                
            </table>
            {
                liquidities.length == 0 &&
                <div className="w-full text-center h-50px py-[5px] text-[white] flex justify-center items-center">
                    {isLoading && 
                    <>
                        <ClipLoader speedMultiplier={0.5} color='gray' size={24}/>
                        <p className="ml-[10px]"> Loading... </p>
                    </>
                    }
                    { !isLoading &&
                        <p className="ml-[10px]"> No data </p>
                    }
                    
                </div>
            }
            </div>
            }
        </div>
    )
}