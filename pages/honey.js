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
import Link from 'next/link';

let AdvancedChart, TickerTape, TechnicalAnalysis;

export default function Honey() {
  const isSidebar = useSelector((state) => state.util.isSidebar);
  const selectedToken = useSelector((state) => state.util.selectedToken);
  const [tokenAddress, setTokenAddress] = useState("");
  let [update, setUpdate] = useState(false);

  const onChange = async(str) => {
    setTokenAddress(str);
  }

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
                <div className='w-full flex flex-col items-center'>
                    <h3 className='text-white text-[24px] mt-[30px]'>Honeypot Detector for BSC Network.</h3>
                    <div className='flex flex-col lg:flex-row text-white text-[14px] text-center'>
                        <Link href="#">
                            <a target='_blank' className="px-[10px] hover:text-[blue] border-r-[0px] lg:border-r-[1px] border-r-[white]">
                                Ethereum Detector (Uniswap V2)
                            </a>
                        </Link>
                        <Link href="https://t.me/honeypotis">
                            <a target='_blank' className="px-[10px] hover:text-[blue] border-r-[0px] lg:border-r-[1px] border-r-[white]">
                                https://t.me/honeypotis
                            </a>
                        </Link>
                        <p className='px-[10px]  border-r-[0px] lg:border-r-[1px] border-r-[white]'> Telegram: @ishoneypot </p>
                        <Link href="https://t.me/honeypotis">
                            <a target='_blank' className="px-[10px] hover:text-[blue]">
                                Legacy Version
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col items-center text-white'>
                    <h3 className='text-[14px] mt-[20px]'>How does it work ?</h3>
                    <p className='text-[12px] text-center'>Honeypot detector simulates a buy and a sell transaction to determine if a token is a honeypot.<br/>It includes a lot of extra checks to reduce. the amount of false results, including a time jump between the buy and sell transaction.<br/> This is not a foolproof method. Just because it's not a honeypot now, does not mean it can't be turned into one!</p>
                    <h3 className='text-[14px] mt-[20px]'>Token Address</h3>
                    <input 
                        className="mt-[20px] outline-none text-black min-w-[320px] h-[40px] rounded-[8px] px-[10px] text-center"
                        placeholder="Input Token address"
                        value={tokenAddress}
                        type='text'
                        onChange={(e) => onChange(e.target.value)}>
                    </input>
                    <button 
                        className='relative bg-[#5cea69] hover:bg-[#40A349] mt-[10px] text-black rounded-[6px] h-[40px] px-[20px] flex items-center justify-center mr-[10px] text-[1.1rem]'
                            
                        > Is it Honeypot?
                    </button>
                </div>
            </div>
            <div className="min-w-[320px] m-[10px] flex flex-col"> 
                <StreamChat />
                <SwapPanel />
            </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}