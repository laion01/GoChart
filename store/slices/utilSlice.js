import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  
  const initialState = {
    isOverlay: false,
    isSpinner: false,
    isSidebar: true,
    isSetting: false,
    isWalletConnector: false,
    selectedNetwork: 'Polygon',
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

      selectNetwork: (state) => {
        state.selectedNetwork = "bsc";
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
    hideWalletConnector
  } = utilSlice.actions;
  
  // exporting the reducer here, as we need to add this to the store
  export default utilSlice.reducer;