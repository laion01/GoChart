import Web3 from "web3";
import { RPCURL, SWAP } from "config";
import { ROUTER_ABI, PAIR_ABI, FACTORY_ABI } from "config/swapabi";
import { BEP20_ABI } from "config/abi";

export const callSmartContract = async (contract, func, args) => {
    if(!contract) return false;
    if(!contract.methods[func]) return false;
    return contract.methods[func](...args).call();
}

export const runSmartContract = async (account, contract, func, value, args) => {
    if(!account) return false;
    if(!contract) return false;
    if(!contract.methods[func]) return false;
    console.log("account : ", account);
    return await contract.methods[func](...args).send({ from: account, value: value })
}

export const estimateGas = async(account, contract, func, value, args) => {
    try {
        const gasAmount = await contract.methods[func](...args).estimateGas({from: account, value: value});
        return {
            success: true,
            gas: gasAmount
        }
    } catch(e) {
        if(e.message.startsWith("Internal JSON-RPC error.")) {
            e = JSON.parse(e.message.substr(24));
        }
        return {
            success: false,
            gas: -1,
            message: e.message
        }
    }
}

export const getTokenPairInfo = async(token0, token1, chainId) => {
    try {
        console.log(token0, token1, RPCURL[chainId])
        const web3 = new Web3(RPCURL[chainId]);
        const FactoryContract = new web3.eth.Contract(FACTORY_ABI, SWAP[chainId].factory);
        console.log("1.0");
        const pairAddress = await callSmartContract(FactoryContract, "getPair", [token0, token1]);
        console.log("2.0 ", pairAddress);
        const PairContract = new web3.eth.Contract(PAIR_ABI, pairAddress)
        const _token0 = await callSmartContract(PairContract, "token0", []);
        const reserves = await callSmartContract(PairContract, "getReserves", []);
        if(_token0 == token0) {
            return {pairAddress, reserve0: reserves._reserve0, reserve1: reserves._reserve1};
        }
        return {pairAddress, reserve0: reserves._reserve1, reserve1: reserves._reserve0};
    } catch (e) {
        console.log(e);
    }
}

export const getTokenInfo = async(address, chainId) => {
    try {
        const web3 = new Web3(RPCURL[chainId])
        const tokenContract = new web3.eth.Contract(BEP20_ABI, address);
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const decimals = await tokenContract.methods.decimals().call();
        console.log("new token: ", {name, symbol, addr: address, decimals, icon: ""});
        return {name, symbol, addr: address, decimals, icon: "", isNativeToken: false};
        
    } catch(e) {
        console.log(e);
    }
}

export const getTokenAmount = async(token, address, chainId) => {
    try {
        if(!token.isNativeToken) {
            console.log("Not Native token", token, address);
            const web3 = new Web3(RPCURL[chainId])
            const tokenContract = new web3.eth.Contract(BEP20_ABI, token.addr);
            console.log("2.0")
            const amount = await tokenContract.methods.balanceOf(address).call();
            return amount;
        } else {
            console.log("Native token", RPCURL[chainId])
            const web3 = new Web3(RPCURL[chainId]);
            const amount = await web3.eth.getBalance(address);
            return amount;
        }
    } catch(e) {
        console.log("load amount error: ", e);
    }
}

export const getAllowance = async(token, account, dest, chainId) => {
    try {
        console.log("getAllowance- ", token, account, dest)
        const web3 = new Web3(RPCURL[chainId])
        const tokenContract = new web3.eth.Contract(BEP20_ABI, token);
        const amount = await tokenContract.methods.allowance(account, dest).call();
        return amount;
    } catch(e) {
        console.log("load amount error: ", e);
    }
}

export const getSwapData = (f, token0, token1, amount, account) => {
    const func = "";
    const args = [];
    let time = new Date().getTime();
    time = (time - time % 1000) / 1000 + 300;
    if(f == 0) {
        if(token0.isNativeToken) {
            func = "swapExactETHForTokens";
            args = ["0",[token0.addr, token1.addr], account, time];
            return {func, args, value: amount};
        } else {
            if(token1.isNativeToken) {
                func = "swapExactTokensForETH";
                args = [amount, 0, [token0.addr, token1.addr], account, time];
                return {func, args, value: 0};
            } else {
                func = "swapExactTokensForTokens";
                args = [amount, 0, [token0.addr, token1.addr], account, time];
                return {func, args, value:0};
            }
        }
    } else {
        if(token0.isNativeToken) {
            func = "swapETHforExactTokens";
            args = [amount, [token0.addr, token1.addr], account, time];
            return {func, args, value: 0};

        } else {
            if(token1.isNativeToken) {
                args = [0, amount, [token0.addr, token1.addr], account, time]
                func = "swapTokensForExactETH";
                return {func, args, value: 0};
            } else {
                func = "swapTokensForExactTokens";
                args = [0, amount, [token0.addr, token1.addr], account, time];
            }
        }
    }
}