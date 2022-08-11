import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  
  const initialState = {
    isOverlay: false,
    isSpinner: false,
    isSidebar: false,
    isSetting: false,
    isWalletConnector: false,
    selectedNetwork: {
      chainId: 56,
      name: "Binance smart chain Mainnet",
      symbol: "BSC(M)",
      icon: "/images/binance.svg"
    },
    selectedToken: {
      name: "BSC Native Token",
      symbol: "BNB",
      icon: "images/bnb.png",
      addr: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      amount: 0.00,
      decimals: 18,
      isNativeToken: true
    },
  };
  
  export const utilSlice = createSlice({
    name: 'util',
    initialState,
    reducers: {
      
      showSpinner: (state) => {
        state.isOverlay = true;
        state.isSpinner = true;
      },

      hideSpinner: (state) => {
        state.isOverlay = false;
        state.isSpinner = false;
      },

      showOverlay: (state) => {
        state.isOverlay = true;
      },

      hideOverlay: (state) => {
        state.isOverlay = false;
      },

      showSidebar: (state) => {
        state.isSidebar = true;
      },

      hideSidbar: (state) => {
        state.isSidebar = false;
      },

      showWalletConnector: (state) => {
        state.isWalletConnector = true;
      },

      hideWalletConnector: (state) => {
        state.isWalletConnector = false;
      },

      selectNetwork: (state, action) => {
        state.selectedNetwork = action.payload['network'];
      },

      selectToken: (state, action) => {
        state.selectedToken = action.payload['token'];
      },

      showSetting: (state) => {
        state.isSetting = true;
      },

      hideSetting: (state) => {
        state.isSetting = false;
      },
    },
  });
  // Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
  export const {
    showSpinner,
    hideSpinner,
    showOverlay,
    hideOverlay,
    showSidebar,
    hideSidbar,
    showSetting,
    hideSetting,
    showWalletConnector,
    hideWalletConnector,
    selectToken,
    selectNetwork
  } = utilSlice.actions;
  
  // exporting the reducer here, as we need to add this to the store
  export default utilSlice.reducer;