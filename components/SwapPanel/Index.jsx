import TokenButton from "./TokenButton";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import TokenSelectorPanel from "components/TokenSelectorPanel";
import { useEffect, useState } from "react";
import { defaultPairs } from "config/tokens";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { ethers } from "ethers";
import { getTokenPairInfo, getTokenAmount, getSwapData, estimateGas, runSmartContract, callSmartContract, getAllowance } from "utils";
import { hideSpinner, showSpinner, showWalletConnector } from "store/slices/utilSlice";
import { useUtil } from "store/hook";
import { useDispatch } from "react-redux";
import { RPCURL, SWAP } from "config";
import { GoChartABI } from "config/gochartabi";
import { ROUTER_ABI } from "config/swapabi"
import { BEP20_ABI } from "config/abi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SwapPanel() {
    const {account, library, chainId} = useWeb3React();
    const {selectedNetwork} = useUtil();
    const [isTokenSelector, openTokenSelector] = useState(0);
    const [amount0, setAmount0] = useState(0);
    const [tAmount, setMyTokenAmount] = useState(0);
    const [amount1, setAmount1] = useState(0);
    const [pairInfo, setPairInfo] = useState(false);
    const [tokenPair, setTokenPair] = useState(defaultPairs[selectedNetwork.chainId]);
    const [focusInput, selectFocus] = useState(0);
    const [swapStatus, setSwapStatus] = useState("Swap");
    const [approved, setApproved] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTokenPair(defaultPairs[selectedNetwork.chainId]);
        setAmount0(0);
        setAmount1(0);
    }, [selectedNetwork]);

    useEffect(() => {
        loadPairInfo();
        loadTokenAmount();
        setAmount0(0);
        setAmount1(0);
    }, [tokenPair, library, account]);

    const loadTokenAmount = async() => {
        if(!account)
            return ;
        let amount = await getTokenAmount(tokenPair.token0, account, chainId);
        console.log("load token amount : ", amount, tokenPair.token0);
        setMyTokenAmount(amount);
    }

    useEffect(() => {
        calcAmounts();
        checkAvailability();
    }, [amount0, amount1])

    const calcAmounts = async() => {
        if(!pairInfo)
            return ;
        if(focusInput == 0) {
            if(amount0 == "") {
                setAmount1(0);
                return ;
            }
            // let out = ethers.utils.parseUnits("" + amount0, tokenPair.token0.decimals);
            // out = ethers.BigNumber.from(out);
            // console.log(pairInfo)
            // const r1 = ethers.BigNumber.from("" + pairInfo.reserve1);
            // const r0 = ethers.BigNumber.from("" + pairInfo.reserve0);
            // const d0 = ethers.BigNumber.from(ethers.utils.parseUnits("1", tokenPair.token0.decimals));
            // const d1 = ethers.BigNumber.from(ethers.utils.parseUnits("1", tokenPair.token1.decimals));
            // out = out.mul(r1).div(r0);
            // out = out.mul(d0).div(d1);
            // out = ethers.utils.formatUnits(out, tokenPair.token0.decimals);

            let _out = ethers.utils.parseUnits("" + amount0, tokenPair.token0.decimals);
            _out = _out.mul(pairInfo.reserve1).div(pairInfo.reserve0);
            _out = ethers.utils.formatUnits(_out, tokenPair.token1.decimals);

            setAmount1(_out);
        } else {
            if(amount1 == "")
            {
                setAmount0(0);
                return ;
            }
            let _in = ethers.utils.parseUnits("" + amount1, tokenPair.token1.decimals);
            _in = _in.mul(pairInfo.reserve0).div(pairInfo.reserve1);
            _in = ethers.utils.formatUnits(_in, tokenPair.token0.decimals);
            setAmount0(_in);
        }
    }

    const loadPairInfo = async() => {
        const pair = await getTokenPairInfo(tokenPair.token0.addr, tokenPair.token1.addr, selectedNetwork.chainId);
        setPairInfo(pair);
        calcAmounts();
    }

    const onTokenSelect = (token) => {
        const newPair = tokenPair;
        if(isTokenSelector == 1) {
            if(token.addr == tokenPair.token1.addr || token.addr == tokenPair.token0.addr) {
                openTokenSelector(0);
                return ;
            }
            newPair.token0 = token;
        } else {
            if(token.addr == tokenPair.token0.addr || token.addr == tokenPair.token1.addr) {
                openTokenSelector(0);
                return ;
            }
            newPair.token1 = token;
        }
        setTokenPair(newPair);
        openTokenSelector(0);
        loadPairInfo();
    }

    const onInversePair = () => {
        const newPair = {
            token0: tokenPair.token1,
            token1: tokenPair.token0,
        };
        const f = (focusInput + 1) % 2;
        selectFocus(0);
        setAmount0(0);
        setAmount1(0)
        
        setTokenPair(newPair);
    }

    const onAmountChange = (input, value) => {
        let res = Number(value);
        res = res.toString();
        if(input == 0) {
            setAmount0(value);
            setApproved(false);
        } else {
            setAmount1(value);
        }
    }

    const checkAvailability = async() => {
        let f = true;
        try {
            // let amount = await getTokenAmount(tokenPair.token0, account, chainId);
            let ba = ethers.utils.parseUnits("" + amount0, tokenPair.token0.decimals);
            const amount = ethers.BigNumber.from(tAmount); 
            console.log("check ", amount.toString());
            f = amount.lt(ba);
        } catch(e) {
            console.log(e);
        }
        
        if(f) {
            setSwapStatus(1);
        } else {
            setSwapStatus(0);
            
        }
    }

    const setAllowance = async(token, amount) => {
        try {
          console.log("1.0 ", amount);
          dispatch(showSpinner());
          const web3 = new Web3(library.provider);
          const tokenContract = new web3.eth.Contract(BEP20_ABI, token);
          console.log("2.0 ", amount);
    
          let am = ethers.utils.parseUnits("" + amount, tokenPair.token0.decimals);
          console.log("3.0 ", am);

          am = am.toString();
          console.log("amount - ", am);
          const args = [SWAP[selectedNetwork.chainId].router, am];
          const func = "approve";
          const {success, gas, message}  = await estimateGas(account, tokenContract, func, 0, args);
          if(!success) {
              dispatch(hideSpinner());  
              toast.error(message);
              return;
          }
          await runSmartContract(account, tokenContract, func, 0, args)
          dispatch(hideSpinner());
          toast.success("Approve success");
          setApproved(true);
        } catch (e) {
          console.log(e);
          dispatch(hideSpinner());
          toast.error("Transaction failed");
        }
    }

    const onInputKeydown = (input) => {
        selectFocus(input);
    }

    const onApprove = async() => {
        try {
            dispatch(showSpinner());
            const allowance = await getAllowance(tokenPair.token0.addr, account, SWAP[selectedNetwork.chainId].router, selectedNetwork.chainId);
            let ba = ethers.utils.parseUnits(amount0, tokenPair.token0.decimals);
            const amount = ethers.BigNumber.from(allowance); 
            if(amount.lt(ba)) {
                const am = 0 + Number(amount0);
                if(focusInput == 1)
                {
                    am = am * 11 / 10.0;
                }
                await setAllowance(tokenPair.token0.addr, am);
            } else {
                setApproved(true);
                toast.success("Already approved");
            }
            dispatch(hideSpinner());
        } catch (e) {
            dispatch(hideSpinner());
        }
    }

    const onSwap = async() => {
        try {
            dispatch(showSpinner());
            const web3 = new Web3(library.provider);
            const RouterContract = new web3.eth.Contract(selectedNetwork.chainId == 97 ? GoChartABI : ROUTER_ABI, SWAP[selectedNetwork.chainId].router);
            let am = Number(amount0);
            let am1 = Number(amount1);
            if(focusInput != 0 && (tokenPair.token0.isNativeToken || tokenPair.token1.isNativeToken)) {
                console.log(am);
                am = 11 * am / 10.0;
            }
            am = ethers.utils.parseUnits("" + am, tokenPair.token0.decimals);
            am1 = ethers.utils.parseUnits("" + am1, tokenPair.token1.decimals);
            am = am.toString();
            am1 = am1.toString();
            
            const data = getSwapData(focusInput, tokenPair.token0, tokenPair.token1, am, am1, account, selectedNetwork.chainId);
            const {success, gas, message}  = await estimateGas(account, RouterContract, data.func, data.value, data.args);
            if(!success) {
                dispatch(hideSpinner());
                toast.error(message);
                return;
            }
            const res = await runSmartContract(account, RouterContract, data.func, data.value, data.args)
            toast.success("Success");
            setApproved(false);
            setAmount0(0);
            setAmount1(0);
            dispatch(hideSpinner());
        } catch (e) {
            dispatch(hideSpinner());
            console.log(e);
            toast.error("Transaction failed");
        }
    }

    return (
        <div className="mt-[30px] w-full">
            <h1 className="text-[white] mb-[20px] text-[24px]"> Swap </h1>
            <div className="w-full flex flex-col mb-[20px]">
                <p className="text-[white] pl-[10px] mb-[5px]"> From </p>
                <div className="flex">
                    <input className="h-[40px] min-w-[100px] bg-[transparent] border-b-[1px] border-[#1E2735] px-[10px] text-[white] mr-[10px] grow outline-0"
                        type={"number"}
                        onChange={(e) => onAmountChange(0, e.target.value)} value={amount0}
                        onKeyDown={(e) => onInputKeydown(0)}/>
                    <TokenButton label={tokenPair.token0.symbol} id={1} onClickHandler={openTokenSelector}/>
                </div>
            </div>
            <div className="w-full flex justify-center items-center h-[24px]"
                onClick={() => onInversePair()}>
                <FontAwesomeSvgIcon icon={faArrowDown} className="text-[#5cea69] h-[24px] w-[24px]"/>
            </div>
            <div className="w-full flex flex-col mb-[20px]">
                <p className="text-[white] pl-[10px] mb-[5px]"> To </p>
                <div className="flex">
                    <input className="h-[40px] min-w-[100px] bg-[transparent] border-b-[1px] border-[#1E2735] px-[10px] text-[white] mr-[10px] grow outline-0"
                        type={"number"}
                        onChange={(e) => onAmountChange(1, e.target.value)} value={amount1}
                        onKeyDown={(e) => onInputKeydown(1)}/>
                    <TokenButton label={tokenPair.token1.symbol} id={2} onClickHandler={openTokenSelector}/>
                </div>
            </div>
            <div className="w-full flex justify-end mb-[20px]">
                { ( !tokenPair.token0.isNativeToken && swapStatus == 0 && account) &&
                    <button className="flex items-center h-[40px] rounded-[5px] border bg-[#5cea69] px-[10px] mr-[10px]"
                        disabled={approved}
                        onClick={() => onApprove()}>
                        <p className="px-[5px]"> {"Approve " + tokenPair.token0.symbol } </p>
                    </button>
                }
                {  !account &&
                    <button className="flex items-center h-[40px] rounded-[5px] border bg-[#5cea69] px-[10px]"
                        onClick={() => dispatch(showWalletConnector())}>
                        <p className="px-[5px]"> Connect Wallet </p>
                    </button>
                }
                {  (swapStatus == 0 && account) &&
                    <button className="flex items-center h-[40px] rounded-[5px] border bg-[#5cea69] px-[10px]"
                        onClick={() => onSwap()}>
                        <p className="px-[5px]"> Swap </p>
                    </button>
                }
                { (swapStatus == 1 && account) && 
                    <button className="flex items-center h-[40px] rounded-[5px] border bg-[#5cea69] px-[10px]"
                        disabled={true}>
                        <p className="px-[5px]"> Insusficient Funds </p>
                    </button>
                }   
            </div>
            { isTokenSelector > 0 &&
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
                    <div className="z-40 fixed top-0 left-0 w-[100vw] h-[100vh]"
                        onClick={() => openTokenSelector(0)}></div>
                    <TokenSelectorPanel onClickHandler={onTokenSelect}/>
                </div>
            }         
            <ToastContainer/> 
        </div>
    )
};