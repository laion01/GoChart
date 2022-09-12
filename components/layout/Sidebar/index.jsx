import { useState, useEffect } from "react";
import { useUtil } from "store/hook"
import ListItem from "./ListItem";

export default function Sidebar() {
    const { isSidebar } = useUtil();
    const [ selectedItem, selectItem] = useState(0);
    const onItemClick = function(key, link) {
        selectItem(key);
        window.open(link, "_self");
    }

    useEffect(() => {
        switch(window.history.state.url) {
        case "/":
            selectItem(0);
            break;
        case "/honey":
            selectItem(5);
            break;
        default :
            selectItem(0);
            break;
        }
    }, []);

    return (
        <div className={"fixed left-0 top-[61px] h-[100%] bg-[black] p-[8px] z-10" + (isSidebar ? " lg:w-[250px] w-full" : " lg:w-[70px] lg:flex lg:flex-col hidden w-[0px]")}>
            <ListItem link="/" label="Home" onClickHandler={onItemClick} keycode={0} isSelected={selectedItem}/>
            <ListItem link="#" label="Chart" onClickHandler={onItemClick} keycode={1} isSelected={selectedItem}/>
            <ListItem link="#" label="Cryptocurrences" onClickHandler={onItemClick} keycode={2} isSelected={selectedItem}/>
            <ListItem link="#" label="Portfolio" onClickHandler={onItemClick} keycode={3} isSelected={selectedItem}/>
            <ListItem link="#" label="Refer a Chart" onClickHandler={onItemClick} keycode={4} isSelected={selectedItem}/>
            <ListItem link="/honey" label="Honeypot Checker" onClickHandler={onItemClick} keycode={5} isSelected={selectedItem}/>
            <ListItem link="#" label="Tax for Buys and Sells" onClickHandler={onItemClick} keycode={6} isSelected={selectedItem}/>
            <ListItem link="#" label="Promote Your Token" onClickHandler={onItemClick} keycode={7} isSelected={selectedItem}/>
            <ListItem link="#" label="Tools for Teams" onClickHandler={onItemClick} keycode={8} isSelected={selectedItem}/>
            <ListItem link="#" label="Trading Tools" onClickHandler={onItemClick} keycode={9} isSelected={selectedItem}/>
        </div>
    )
}