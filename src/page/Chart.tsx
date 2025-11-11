import axios from "axios";
import { useEffect, useState } from "react";
import ChartH1 from "@/conpoenent/chart/h1/ChartH1";
import { SectionCards } from "@/components/ui/SectionCards";
import { Precentcghae } from "@/components/ui/Precentcghae";


type CoinData = {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  market_cap_usd: string;
  volume24: number;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
};

const Chart = () => {
  const [symbol, setSymbol] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState<CoinData | null>(null);

  useEffect(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    
    if (parts.length >= 2) {
      setSymbol(parts[parts.length - 2].toUpperCase());
      setId(parts[parts.length - 1]);
    }
  }, []);

  useEffect(() => {
    const api = async () => {
      try {
        const res = await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`);
        setData(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) api();
  }, [id]);

  if (!data) {
    return <>Please wait a second...</>;
  }

  return (
    <div>
      <div className="flex justify-center bg-neutral-950 ">
        <div className="mb-7">
          <div className="text-white bg-neutral-950">
             {symbol}
          </div>
          <ChartH1 symbol={symbol} timrfarm={"1hour"} />
        </div>
      </div>
      <div className="flex justify-center gap-30 w-full h-[400px] bg-neutral-950">
        
        <SectionCards
          data={data.name}
          data2={data.rank}
          data3={data.price_usd}
          data4={data.market_cap_usd}
          data5={data.volume24}
        />

        <Precentcghae
          data={data.percent_change_1h}
          data2={data.percent_change_24h}
          data3={data.percent_change_7d}
        />
      </div>
      <div className="h-[200px] bg-neutral-950"></div>
    </div>
  );
};

export default Chart;
