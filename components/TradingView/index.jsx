import { useState, useEffect } from 'react';

export default function TradingView({ selectedToken, AdvancedChart, TickerTape }) {
    return (
        <div className="w-full mt-[20px]">
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
                        "symbol": selectedToken.symbol.length > 0 ? selectedToken.symbol + "USD" : "BNBUSD"
                    }} />
                }
            </div>
        </div>
    )
};