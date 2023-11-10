import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import CoinCard from "./components/CoinCard";

const App = () => {
  const [coinPrices, setCoinPrices] = useState();

  const getCoinPrices = async () => {
    try {
      const response = await axios.get(
        "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-MATIC,KRW-DOGE"
      );

      console.log(response);
      setCoinPrices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCoinPrices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {coinPrices ? (
        <ul className="w-96">
          <Slider
            autoplay={true}
            autoplaySpeed={2000}
            arrows={false}
            dots={true}
          >
            {coinPrices.map((v, i) => {
              return (
                <CoinCard
                  key={i}
                  coinPrice={v}
                  btcPrice={coinPrices[0].trade_price}
                />
              );
            })}
          </Slider>
        </ul>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
