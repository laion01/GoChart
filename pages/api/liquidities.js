let recent_liquidities = [];
let fetch = require("node-fetch");

export default handler = async (req, res) => {
    if (req.method == "POST") {
        const FilterString = String(req.body.contract_address).toUpperCase();
        let ans = [];
        for (let i = 0; i < recent_liquidities.length; i++) {
            if (String(recent_liquidities[i].token0).toUpperCase() == FilterString || String(recent_liquidities[i].token1).toUpperCase() == FilterString) {
                ans.push({
                    pairAddress: recent_liquidities[i].pair,
                    symbol: recent_liquidities[i].token0Symbol + '/' + recent_liquidities[i].token1Symbol,
                    token0: recent_liquidities[i].token0,
                    token1: recent_liquidities[i].token1,
                    token0Symbol: recent_liquidities[i].token0Symbol,
                    token1Symbol: recent_liquidities[i].token1Symbol,
                    token0Name: recent_liquidities[i].token0Name,
                    token1Name: recent_liquidities[i].token1Name
                })
            }
        }
        res.json({ success: true, data: ans })
    }
}