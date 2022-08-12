import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";

import { ClipLoader } from 'react-spinners'
import { useUtil } from "store/hook";
import Sidebar from "../Sidebar";
import Image from "next/image";
import TradingView from "components/TradingView";

import StreamChat from "components/StreamChat";
import SwapPanel from "components/SwapPanel/Index";
import SettingsPanel from "components/SettingsPanel";
import TrendingBar from "components/TrendingBar";
import PairDetails from "components/PairDetails";
import LogBox from "components/LogBox";
import { useSelector } from "react-redux";

let AdvancedChart, TickerTape, TechnicalAnalysis;

export default function Layout({ children }) {
    // const { isOverlay, isSpinner, isSidebar, isSetting } = useUtil();
    const isOverlay = useSelector((state) => state.util.isOverlay);
    const isSpinner = useSelector((state) => state.util.isSpinner);
    const isSidebar = useSelector((state) => state.util.isSidebar);
    const isSetting = useSelector((state) => state.util.isSetting);
    const selectedToken = useSelector((state) => state.util.selectedToken);
    let [update, setUpdate] = useState(false);

    useEffect(() => {
        const tradingview = require('react-tradingview-embed');
        AdvancedChart = tradingview.AdvancedChart;
        TickerTape = tradingview.TickerTape;
        TechnicalAnalysis = tradingview.TechnicalAnalysis;
        setUpdate(!update);
        console.log("trading view rended")
    }, [])

    return (
        <div>
            <Header />
            <Sidebar />
            <div className={"mt-[61px] min-h-[200px] flex justify-center bg-[black] flex flex-col lg:flex-row" + (isSidebar ? " ml-[250px]" : " lg:ml-[70px] ml-[0px]")}>
                <div className="flex flex-col m-[10px] justify-start grow"> 
                    <div className="w-full">
                        <Image alt="" src="/images/banner/banner.png" width={671} height={88} layout={'responsive'}/>
                    </div>
                    <TrendingBar/>
                    <PairDetails/>
                    <TradingView selectedToken={ selectedToken } AdvancedChart={AdvancedChart} TickerTape={TickerTape}/>
                    <LogBox/>
                </div>
                <div className="min-w-[320px] m-[10px] flex flex-col"> 
                    <div className="mb-[10px] flex tradingAnalysis:justify-center items-center overflow-x-auto">
                        { TechnicalAnalysis &&
                            <TechnicalAnalysis widgetProps={{
                                "theme": "dark",
                                "symbol": selectedToken.symbol.length > 0 ? selectedToken.symbol + "USD" : "BNBUSD"
                            }} 
                            />
                        }
                    </div>
                    <StreamChat />
                    <SwapPanel />
                </div>
            </div>
            { isSetting &&
                <SettingsPanel />
            }
            { isSpinner &&
                <div className='z-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <ClipLoader speedMultiplier={0.5} color='blue' size={50}/>
                </div>
            }
            { isOverlay &&
                <div className='z-100 fixed w-screen h-screen top-0 left-0 bg-[#00000070]'>
                </div>
            }
        </div>
    )
}