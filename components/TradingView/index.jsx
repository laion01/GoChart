import { useState, useEffect } from 'react';

let AdvancedChart = false;
let TickerTape = false;
export default function TradingView({ selectedToken }) {
    let [update, setUpdate] = useState(false);

    useEffect(() => {
        const tradingview = require('react-tradingview-embed');
        AdvancedChart = tradingview.AdvancedChart;
        TickerTape = tradingview.TickerTape;
        setUpdate(true);
    }, [update])

    return (
        <div className="w-full mt-[20px]">
            {update && 
            <>
            <div className='mb-[20px]'>
                { TickerTape &&
                    <TickerTape widgetProps={{
                        "theme": "dark",
                    }} />
                }            
            </div>
            <div className='mb-[20px]'>
                { AdvancedChart && 
                    <AdvancedChart widgetProps={{
                        "theme": "dark", 
                        "height": "450px",
                        "symbol": "BNBUSD",
                        // "symbol": selectedToken.symbol.length > 0 ? selectedToken.symbol + "USD" : "BNBUSD"
                    }} />
                }
            </div>
            </>
            }
            
        </div>
    )
};