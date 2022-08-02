import { TradingViewEmbed, widgetType, AdvancedChart} from "react-tradingview-embed";
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useState, useEffect } from 'react';

export default function TradingView() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        showTradingView();
    }, []);

    const showTradingView = () => {
        setIsLoaded(true);
    }

    return (
        <div className="w-full">
            <div className="mt-[20px]">
                {/* <TradingViewEmbed
                    widgetType={widgetType.TICKER_TAPE}
                    widgetConfig={{
                    colorTheme: "dark",
                    autosize: true
                    }}
                /> */}
            </div>
            <div className="w-full mt-[20px]">
                { isLoaded && <TradingViewEmbed
                    widgetType={widgetType.ADVANCED_CHART}
                    widgetConfig={{
                    colorTheme: "dark",
                    symbol: "BITMEX:XBTUSD"
                    }}
                /> } 
            </div>
            
            {/* <TradingViewEmbed
                widgetType={widgetType.SCREENER_CRYPTOCURRENCY}
                widgetConfig={{
                colorTheme: "dark",
                width: "100%",
                height: "230"
                }}
            /> */}
            
        </div>
    )
};