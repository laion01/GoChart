import { useState } from 'react';
import { useUtil } from 'store/hook';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faHouse, faImages, faChartLine, faChalkboardUser, faBitcoinSign } from '@fortawesome/free-solid-svg-icons';

export default function ListItem({label, keycode, onClickHandler, isSelected}) {
    const [isHover, setHover] = useState(isSelected == keycode);
    const { isSidebar } = useUtil();

    const getIcon = (type) => {
        switch (type) {
            case "Home":
                return faHouse;
            case "Chart":
                return faChartLine;
            case "Cryptocurrences":
                return faBitcoinSign;
            case "Portfolio":
                return faImages;
            case "Refer a Chart":
                return faChalkboardUser;
            default:
                return false;
        }
    }

    return (
        <div className={(isSelected == keycode ? "bg-[#5cea69]" : "bg-[black]") + " rounded-[5px] mb-[10px] h-[40px] w-full p-[5px] flex hover:bg-[#5cea69] items-center " + (!isSidebar ? "justify-center" : '')} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}
            onClick={() => onClickHandler(keycode)}>
            <div className="w-[24px] mx-[8px] flex justify-center items-center">
                <FontAwesomeSvgIcon icon={getIcon(label)} className={"w-[24px] h-[24px] " + (isHover || isSelected == keycode ? "text-[black]" : "text-[#ffffffb2]")}/>
            </div>
            { isSidebar && 
                <p className={(isHover || isSelected == keycode ? "text-[black]" : "text-[#ffffffb2]")}> {label} </p>
            }
        </div>
    )
}