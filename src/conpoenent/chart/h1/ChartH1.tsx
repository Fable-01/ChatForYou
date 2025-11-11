import axios from "axios";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type CandlestickData,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";



type ChartH1 = {
  symbol: string;
  timrfarm: string; 
};


const ChartH1:React.FC<ChartH1> = ({symbol,timrfarm}) => {


 
  const apiKey = import.meta.env.VITE_API_KEY;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CandlestickData[]>([]);

  // โหลดข้อมูลจาก API
  useEffect(() => {
    
    const api = async () => {
      try {
   
        const res = await axios.get(
          `https://financialmodelingprep.com/api/v3/historical-chart/${timrfarm}/${symbol}?`,
          {params:{
              from:"2025-07-07",
              apikey:apiKey
          }}
        );

        const formattedData: CandlestickData[] = res.data.reverse().map((s: any) => ({
          time: Math.floor(new Date(s.date).getTime() / 1000),
          open: s.open,
          high: s.high,
          low: s.low,
          close: s.close,
        }));


        setData(formattedData);
      } catch (error) {
        console.log("API Error:", error);
      }
    };

    api();
  }, [symbol]);

  // วาดกราฟเมื่อมีข้อมูลพร้อม
  useEffect(() => {
  
if (!chartContainerRef.current) {
  return 
} 

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "black" },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      width: 500,
      height: 300,
    });

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: "green",
      downColor: "red",
      borderVisible: true,
     borderUpColor: "green",   // สีขอบต่างจาก fill
      borderDownColor: "red",
      wickUpColor: "green",
      wickDownColor: "red",
    });

    newSeries.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default ChartH1;
