import { ChartBarNegative } from "@/components/ui/ChartBarNegative";
import Createchrat from "@/conpoenent/chart/Createchrat";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import {  StarIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Github } from 'lucide-react';
type Coin = {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
};

const Home = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [myUnits, setMyUnits] = useState<string[]>([]); 

  // โหลดข้อมูล coin
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.coinlore.net/api/tickers/?start=0&limit=6");
        const coin: Coin[] = res.data.data;
        setData(coin);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myUnits") || "[]");
    setMyUnits(stored);
  }, []);

  if (data.length < 6) return <div>Loading chart...</div>;

  const namesymblo = data.map((s) => ({
    name: s.symbol + "USD",
    id: s.symbol + "USD" + "/" + s.id,
    symbol: s.symbol,
    ids: s.id,
  }));


  const hldCilck = (index: string) => {
    let stored = [...myUnits];

    if (stored.includes(index)) {
      stored = stored.filter((item) => item !== index);
      toast.error("Removed");
    } else {
      stored.push(index);
      toast.success("Added");
    }

    setMyUnits(stored);
    localStorage.setItem("myUnits", JSON.stringify(stored));
  };

  return (
    <div>
      <section className="grid justify-center bg-neutral-950 gap-1 pt-1">
        <div className="grid grid-cols-3 gap-1">
          {namesymblo.slice(0, 6).map((s) => (
            <div key={s.ids} className="bg-black border border-neutral-700 h-[200px] grid">
              <StarIcon
                onClick={() => hldCilck(s.id)}
                className={`text-2xl ml-[230px] cursor-pointer transition-all duration-200 ${
                  myUnits.includes(s.id)
                    ? "text-yellow-300 scale-110 fill-yellow-300"
                    : "text-gray-500 fill-gray-500"
                }`}
              />
              <div className="flex items-end">
                <Link to={`Chart/${s.id}`}>
                  <Createchrat symbols={s.name} w={250} h={160} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full h-[400px] bg-neutral-950 flex justify-center p-[20px] border-b-1 border-neutral-800">
        <ChartBarNegative data={data} />
      </section>

      <div className="w-full h-[100px] bg-neutral-950 text-amber-50 flex justify-end p-4">
          <Link to={'https://github.com/Fable-01'}>
          <Github className="  scale-150 " />
          </Link> 
        
        </div>

        <div className="text-neutral-400 text-[12px] bg-neutral-800"> Power by lightweight-charts</div>
    </div>
  );
};

export default Home;
