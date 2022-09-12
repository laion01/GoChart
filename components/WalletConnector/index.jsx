import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import WalletButton from './WalletButton';

import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";


import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLock, faUnlock} from '@fortawesome/free-solid-svg-icons'
import { useUtil } from 'store/hook';

const MetamaskWallet = new InjectedConnector({
  supportedChainIds: [1, 56, 97, 137]
});

const CoinbaseWallet = new WalletLinkConnector({
    url: `https://data-seed-prebsc-2-s2.binance.org:8545`,
    appName: "GoChart Platform",
    supportedChainIds: [1, 56, 97, 137],
});

const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://data-seed-prebsc-2-s2.binance.org:8545`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

export default function WalletConnector() {

    const { deactivate, activate, account, library, chainId, provider } = useWeb3React();
    const [ loading, setLoading] = useState(false);
    const { selectedNetwork } = useUtil();
    useEffect(() => {
        switchNetwork();
    }, [account, chainId, provider])


    const handleConnectProvider = async(provider) => {
        // Set the UI state to loading to prevent further interaction
        setLoading(true);
        switch(provider) {
            case 'WalletConnect':
                await activate(WalletConnect);
                break;
            case 'Coinbase':
                await activate(CoinbaseWallet);
                break;
            case 'MetaMask':
                await activate(MetamaskWallet);
                break;
            default:
                await activate(MetamaskWallet);
        }
        setLoading(false);
        await switchNetwork();
    };

    // example of switching or adding network with Harmony Mainnet
    const switchNetwork = async () => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: '0x' + Number(selectedNetwork.chainId).toString(16) }],
            });
        } catch (switchError) {
            // 4902 error code indicates the chain is missing on the wallet
            if (switchError.code === 4902) {
                try {
                await library.provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                    {
                        chainId: '0x' + Number(selectedNetwork.chainId).toString(16),
                        rpcUrls: [selectedNetwork.rpcurl],
                        chainName: selectedNetwork.name,
                        nativeCurrency: selectedNetwork.nativeCurrency,
                        blockExplorerUrls: selectedNetwork.blockExplorerUrls,
                        // iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
                    }
                    ],
                });
                } catch (error) {
                console.error(error)
                }
            }
        }
    };

    return (
        <div className="z-50 fixed lg:absolute flex flex-col justify-center  top-[20px] right-[20px] p-[20px] bg-[#151B24] lg:top-[70px] lg:right-[20px] border border-[lightgray] min-w-[280px] rounded-[5px] shadow">
            <div className="w-full my-[20px] flex justify-center items-center">
                {/* <Image
                    src= { account ? '/images/svg/unlock.png' : '/images/svg/lock.png'}
                    alt=''
                    width={80}
                    height={80}
                /> */}
                { account &&
                    <FontAwesomeSvgIcon icon={faUnlock} className="w-[80px] h-[80px] text-[#5cea69]"/>
                }
                { !account &&
                    <FontAwesomeSvgIcon icon={faLock} className="w-[80px] h-[80px] text-[#5cea69]"/>
                }
            </div>
            <p className='mb-[20px] text-[24px] text-center text-[white]'>{account ? account.substring(0, 6) + "..." + account.substring(account.length - 4) : loading ? 'Connecting...' : 'Connect your wallet'}</p>
                { !account &&
                    <div className='flex flex-col'>
                        <WalletButton label={'Coinbase'} icon={'/images/coinbaseicon.svg'} handleConnect={handleConnectProvider}/>
                        <WalletButton label={'MetaMask'} icon={'/images/metamaskicon.svg'} handleConnect={handleConnectProvider}/>
                        <WalletButton label={'WalletConnect'} icon={'/images/WalletConnecticon.svg'} handleConnect={handleConnectProvider}/>
                    </div>
                }
                { account &&
                    <div className='flex flex-col'>
                        <WalletButton label={'Disconnect'} icon={'/images/svg/lock.png'} handleConnect={deactivate}/>
                    </div>
                }
        </div>
    );
}