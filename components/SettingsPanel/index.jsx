import { useDispatch } from 'react-redux';
import { hideSetting } from 'store/slices/utilSlice';

export default function SettingsPanel() {
    const dispatch = useDispatch();

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-[#00000020] z-40">
            <div className="absolute top-0 left-0 w-[100vw] h-[100vh]  bg-[#00000020]"
                onClick={() => dispatch(hideSetting())}></div>
            <div className="fixed w-[480px] bg-[#1E2735] rounded-[5px] shadow">
                <div className="w-full rounded-t-[5px] flex items-center px-[20px] h-[60px] bg-[#313D50] text-[1.25rem] text-[white]">
                    <p> Settings </p>
                </div>
                <div className="w-full rounded-b-[5px] flex flex-col p-[16px]">
                    <div className="border-b-[1px] border-b-[#313D50] p-[10px]">
                        <div className="flex justify-between items-center mb-[10px] text-[white]">
                            <p>Portfolio Piechart</p>
                            <p className="text-[#5cea69]">2%</p>
                        </div>
                        <p className="text-[#55647d]">Min. %to show in portfolio piechart(requires refresh).</p>
                    </div>
                    <div className="border-b-[1px] border-b-[#313D50] p-[10px]">
                        <div className="flex justify-between items-center mb-[10px] text-[white]">
                            <p>Use Modified Scientific Notation</p>
                            <p className="text-[#5cea69]">2%</p>
                        </div>
                        <p className="text-[#55647d]">Truncated(0.043) vs Modified Scientific Notation(0.043 e-5).</p>
                    </div>
                    <div className="border-b-[1px] border-b-[#313D50] p-[10px]">
                        <div className="flex justify-between items-center mb-[10px] text-[white]">
                            <p>Keep BogSwap open</p>
                            <p className="text-[#5cea69]">2%</p>
                        </div>
                        <p className="text-[#55647d]">Open BogSwap on launch (Desktop only).</p>
                    </div>
                </div>
            </div>
        </div>       
    )
}