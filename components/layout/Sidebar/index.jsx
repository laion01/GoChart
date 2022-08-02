import { useState } from "react";
import { useUtil } from "store/hook"
import ListItem from "./ListItem";

export default function Sidebar() {
    const { isSidebar } = useUtil();
    const [ selectedItem, selectItem] = useState(0);
    const onItemClick = function(key) {
        selectItem(key);
        console.log(key);
    }

    return (
        <div className={"fixed left-0 top-[61px] h-[100%] bg-[black] p-[8px]" + (isSidebar ? " w-[250px]" : " w-[70px]")}>
            <ListItem label="Home" onClickHandler={onItemClick} keycode={0} isSelected={selectedItem}/>
            <ListItem label="Chart" onClickHandler={onItemClick} keycode={1} isSelected={selectedItem}/>
            <ListItem label="Cryptocurrences" onClickHandler={onItemClick} keycode={2} isSelected={selectedItem}/>
            <ListItem label="Portfolio" onClickHandler={onItemClick} keycode={3} isSelected={selectedItem}/>
            <ListItem label="Refer a Chart" onClickHandler={onItemClick} keycode={4} isSelected={selectedItem}/>
            <ListItem label="Honeypot Checker" onClickHandler={onItemClick} keycode={5} isSelected={selectedItem}/>
            <ListItem label="Tax for Buys and Sells" onClickHandler={onItemClick} keycode={6} isSelected={selectedItem}/>
            <ListItem label="Promote Your Token" onClickHandler={onItemClick} keycode={7} isSelected={selectedItem}/>
            <ListItem label="Tools for Teams" onClickHandler={onItemClick} keycode={8} isSelected={selectedItem}/>
            <ListItem label="Trading Tools" onClickHandler={onItemClick} keycode={9} isSelected={selectedItem}/>
        </div>
    )
}