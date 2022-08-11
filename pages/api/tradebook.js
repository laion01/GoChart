export default handler = async (req, res) => {
    if (req.method == "POST") {
        if (!req.body.contract_address) {
            res.json({ success: false });
        }

        var nowtime = new Date().toISOString();
        const query = `{
            ethereum(network: bsc) {
              dexTrades(
                options: {limit: 100, desc: "block.height"}
                exchangeName: {in: ["Pancake", "Pancake v2"]}
                baseCurrency: {is: "${req.body.contract_address}"}
                date: {till: "${nowtime}"}
              ) {
                transaction {
                  hash
                }
                smartContract {
                  address {
                    address
                  }
                  contractType
                  currency {
                    name
                  }
                }
                block {
                  height
                  timestamp{
                    time(format:"%Y-%m-%d %H:%M:%S")
                  }
                }
                buyAmount
                buyAmountInUsd: buyAmount(in: USD)
                buyCurrency {
                  symbol
                  address
                }
                sellAmount
                sellAmountInUsd: sellAmount(in: USD)
                sellCurrency {
                  symbol
                  address
                }
                sellAmountInUsd: sellAmount(in: USD)
                tradeAmount(in: USD)
                transaction {
                  txFrom {
                    address
                  }
                }
              }
            }
          }
          `;
        const url = "https://graphql.bitquery.io/";
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQY1cSagvoPHBvgeZtV7fr27IZW9SGDR"
            },
            body: JSON.stringify({
                query
            })
        };
        let data = [];
        await fetch(url, opts)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                data = res.data.ethereum.dexTrades
            })
            .catch(console.error);
        res.json({ success: true, data })
    }
}