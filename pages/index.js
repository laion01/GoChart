import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import TrendingBar from 'components/TrendingBar';
import PairDetails from 'components/PairDetails';
import TradingView from 'components/TradingView';
import LogBox from 'components/LogBox';
import StreamChat from 'components/StreamChat';
import SwapPanel from 'components/SwapPanel/Index';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
let AdvancedChart, TickerTape, TechnicalAnalysis;


export default function Home() {
  const isSidebar = useSelector((state) => state.util.isSidebar);
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
        <div className={styles.container}>
      <Head>
        <title>GoChart</title>
        <meta name="description" content="GoChart" />
        <link rel="icon" href="/images/logo-white.png" />
      </Head>

      <main>
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
      </main>
      <footer></footer>
    </div>
  );
}