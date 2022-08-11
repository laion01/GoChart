// export const ContractAddress = "0x4B89f4DB80fB930698C62eEA486c90084eb23A31";
// export const TokenAddress = "0xB14a28f39fb73F923B00193aDB7a0E2bDAa16967";
// export const USDTAddress = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684";
// export const TokenName = "CryptoWarriors";
// export const TokenSymbol = "CWS";

// export const CHAINID = 97;
// export const RPCURL = 'https://data-seed-prebsc-2-s2.binance.org:8545';

// export const PAYPAL_CLIENT_ID = 'AejKQzgkVDrZXqyEzBwdtoBkWgOJAi07i691g2izWUPs5Dv106RGgIMLm4tdu0DbNoDgcjyNnYUgvUmE';
// export const PAYPAL_CURRENCY = 'USD';

export const ContractAddress = "0xF9f854187AdEFA4507f32Bd0A79677496154FF3a";
export const TokenAddress = "0xE473423D403b61715EeE24AB9B74bf72038867ce";
export const USDTAddress = "0x55d398326f99059fF775485246999027B3197955";
export const TokenName = "CryptoWarriors";
export const TokenSymbol = "CWS";

export const CHAINID = 56;
export const RPCURL = {
    56: 'https://bsc-dataseed1.binance.org',
    97: 'https://data-seed-prebsc-2-s2.binance.org:8545'
}

export const PAYPAL_CLIENT_ID = 'AejKQzgkVDrZXqyEzBwdtoBkWgOJAi07i691g2izWUPs5Dv106RGgIMLm4tdu0DbNoDgcjyNnYUgvUmE';
export const PAYPAL_CURRENCY = 'USD';


export const NETWORKS = [
    {
        chainId: 56,
        name: "Binance smart chain Mainnet",
        symbol: "BSC(M)",
        icon: "/images/binance.svg",
        rpcurl: "https://bsc-dataseed1.binance.org",
        nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
        blockExplorerUrls: ["https://bscscan.com"],
    }, {
        chainId: 97,
        name: "Binance smart chain Testnet",
        symbol: "BSC(T)",
        icon: "/images/binance.svg",
        rpcurl: "https://data-seed-prebsc-2-s2.binance.org:8545",
        nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
        blockExplorerUrls: ["https://bscscan.com"],
    }, {
        chainId: 137,
        name: "Polygon",
        symbol: "Polygon",
        icon: "/images/polygon.svg",
        rpcurl: "https://polygon-rpc.com/",
        nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
        blockExplorerUrls: ["https://polygonscan.com"],
    }, {
        chainId: 1,
        name: "Ethereum Mainnet",
        symbol: "Ethereum",
        icon: "/images/ethereum.svg",
        rpcurl: "https://mainnet.infura.io/v3/",
        nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
        blockExplorerUrls: ["https://etherscan.io"],
    }
]

export const SWAP = {
    56: {
        router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
        factory: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73"
    },
    97: {
        router: "0x7e1af6b62951db3c90c1fbeef2178cba2b337698",
        factory: "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc"
    }
}

export const SERVER_ADDR = "/api";