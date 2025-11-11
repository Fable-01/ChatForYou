// ChartContainer.tsx
import React, { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  createChart,
  createTextWatermark,
} from "lightweight-charts";
import axios from "axios";





interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;

}

type CreateChart = {
  symbols: string,
  w: number,
  h: number
}



const Createchrat: React.FC<CreateChart> = ({ symbols, w, h }) => {
  
  const chartContainerRef = useRef<HTMLDivElement>(null);


  if (symbols.length < 6) return <div>Loading chart...</div>;

  useEffect(() => {

    const today = new Date();
    const DaysAgo = new Date();

    const apiKey = import.meta.env.VITE_API_KEY;
    const day = 30;


    DaysAgo.setDate(today.getDate() - day);
 
    const formattedDate = DaysAgo.toISOString().split("T")[0];
   console.log(formattedDate);

    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: {  color: "black" },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      width: w,
      height: h,
    });

    chart.timeScale().applyOptions({
      borderColor: "red",
      rightOffset: 5,
      barSpacing: 10,
     
      

    });

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: "green",
      downColor: "red",
      wickUpColor: "green",
      wickDownColor: "red",
    });

    axios
      .get(
        "https://financialmodelingprep.com/stable/historical-price-eod/full?",
        {
          params: {
            symbol: symbols,
            from: formattedDate,
            apikey: apiKey,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        const formattedData: CandlestickData[] = data
          .reverse()
          .map((d: any) => ({
            time: d.date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }));

        createTextWatermark(chart.panes()[0], {
          horzAlign: "left",
          vertAlign: "top",
          lines: [
            {
              text: symbols,
              color: "red",
              fontSize: 14,
            },
          ],
        });

        newSeries.setData(formattedData);
      })
      .catch((err) => console.error("Error loading data:", err));


    return () => {
      chart.remove();
    };
  }, []);

  return (

    <div ref={chartContainerRef} />

  );
};

export default Createchrat;
