import axios from "axios";
import { SERVER_ADDR } from "config";

export const fetchSettings = async () => {
    
    return axios.get(SERVER_ADDR + ``).then((response) => {
        return response;
    });
}

export const fetchChats = async (token) => {
    
    let _response = await axios.post(SERVER_ADDR + `/token/chat`, {token: token}).then((response) => {
        return response;
    });
    return _response.data;
}

export const sendMsgTo = async (token, msg) => {
    
    let _response = await axios.post(SERVER_ADDR + `/token/chat/add`, {token: token, msg: msg}).then((response) => {
        return response;
    });
    return _response.data;
}

export const getTokenList = async () => {
    let _response = await axios.post(SERVER_ADDR + `/tokens`).then((response) => {
        return response;
    });
    return _response.data;
}

export const getTradeBook = async (contract_address) => {
    let _response = await axios.post(SERVER_ADDR + `/tradebook`, {contract_address}).then((response) => {
        return response;
    });
    return _response.data;
}

export const getYourTrades = async (contract_address, wallet_address) => {
    let _response = await axios.post(SERVER_ADDR + `/mtrades`, {contract_address, wallet_address}).then((response) => {
        return response;
    });
    return _response.data;
}

export const getHolders = async (contract_address) => {
    let _response = await axios.post(SERVER_ADDR + `/holders`, {contract_address}).then((response) => {
        return response;
    });
    return _response.data;
}

export const getDetails = async (contract_address) => {
    let _response = await axios.post(SERVER_ADDR + `/details`, {contract_address}).then((response) => {
        return response;
    });
    return _response.data;
}

export const getLiquidity = async (contract_address) => {
    let _response = await axios.post(SERVER_ADDR + `/liquidities`, {contract_address}).then((response) => {
        return response;
    });
    return _response.data;
}
