export const tokens = {
    56 : [
        {
            name: "BSC Native Token",
            symbol: "BNB",
            icon: "images/bnb.png",
            addr: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            amount: 0.00,
            decimals: 18,
            isNativeToken: true
        },
        {
            name: "CashCow Token",
            symbol: "COW",
            icon: "images/gc.png",
            addr: "0x8B6fA031c7D2E60fbFe4E663EC1B8f37Df1ba483",
            amount: 0.00,
            decimals: 9,
            isNativeToken: false
        },
        {
            addr: '0x40E46dE174dfB776BB89E04dF1C47d8a66855EB3',
            symbol: 'BSCDEFI',
            name: 'BSC Defi blue chips token',
            site: 'https://powerpool.finance/',
            icon: "images/gc.png",
            amount: 0.00,
            decimals: 18,
            isNativeToken: false
        },
        {
            addr: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            site: 'https://www.makerdao.com/',
            icon: "images/gc.png",
            amount: 0.00,
            decimals: 18,
            isNativeToken: false
        },
        {
            addr: "0x55d398326f99059fF775485246999027B3197955",
            symbol: 'USDT',
            name: 'Tether USD',
            site: 'https://tether.to/',
            icon: "images/gc.png",
            amount: 0.00,
            decimals: 18,
            isNativeToken: false
        },
        {
            addr: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
            symbol: 'BTCB',
            name: 'Binance BTC',
            site: 'https://bitcoin.org/',
            icon: "images/gc.png",
            amount: 0.00,
            decimals: 18,
            isNativeToken: false
        },
    ],
    97: [
        {
            name: "BSC Native Token",
            symbol: "BNB",
            icon: "images/bnb.png",
            addr: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            amount: 0.00,
            decimals: 18,
            isNativeToken: true
        },
        {
            name: "USD Tether",
            symbol: "USDT",
            icon: "images/gc.png",
            addr: "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
            amount: 0.00,
            decimals: 18,
            isNativeToken: false
        },{
            name: "Binance USD",
            symbol: "BUSD",
            icon: "images/gc.png",
            addr: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
            amount: 0.00,
            decimals: 18,
            isNativeToken: false
        }
    ]
}

export const defaultPairs = {
    56: {
        token0: tokens[56][0],
        token1: tokens[56][1],
    },
    97: {
        token0: tokens[97][0],
        token1: tokens[97][1],
    }
}