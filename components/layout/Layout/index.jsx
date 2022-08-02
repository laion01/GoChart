import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";

import { ClipLoader } from 'react-spinners'
import { useUtil } from "store/hook";
import Sidebar from "../Sidebar";
import Image from "next/image";
import TradingView from "components/TradingView";

import { TradingViewEmbed, widgetType} from "react-tradingview-embed";
import StreamChat from "components/StreamChat";
import SwapPanel from "components/SwapPanel/Index";
import SettingsPanel from "components/SettingsPanel";


export default function Layout({ children }) {
    const { isOverlay, isSpinner, isSidebar, isSetting } = useUtil();

    return (
        <div>
            <Header />
            
            <Sidebar />
            <div className={"mt-[61px] min-h-[200px] flex justify-center bg-[black] flex" + (isSidebar ? " ml-[250px]" : " ml-[70px]")}>
                <div className="w-full flex flex-col m-[10px] justify-start"> 
                    <div className="w-[100%]">
                        <Image alt="" src="/images/banner/banner.png" width={671} height={88} layout={'responsive'}/>
                    </div>
                    <TradingView />
                </div>
                <div className="min-w-[320px] m-[10px] flex flex-col"> 
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