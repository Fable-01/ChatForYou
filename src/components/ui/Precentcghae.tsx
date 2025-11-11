import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Precentcghae({ data, data2, data3 }) {
  return (
    <div className="">
      <Card className="  bg-neutral-900 w-[400px] ">
        <CardHeader>
          <CardAction>
            <Badge variant="outline" className="text-white">
              {(Number(data)+Number(data2)+Number(data3)).toFixed(2)} %
            </Badge>
          </CardAction>


          <CardTitle className="text-[14px] font-semibold tabular-nums @[250px]/card:text-2xl text-white">
             <div className="   capitalize line-clamp-1 flex gap-2 font-medium text-white ">
            percent_change_1h
          </div>
          {data >= 0 ? (
            <div className=" text-green-500 capitalize">{data} %</div>
          ) : (
            <div className=" text-red-500 capitalize">{data} %</div>
          )}

          <div className="  capitalize line-clamp-1 flex gap-2 font-medium text-white ">
            percent_change_24h
          </div>
          {data2 >= 0 ? (
            <div className="text-green-500 capitalize">{data2} %</div>
          ) : (
            <div className="text-red-500 capitalize">{data2} %</div>
          )}

          <div className="  capitalize line-clamp-1 flex gap-2 font-medium text-white ">
            percent_change_7d
          </div>

          {data3 >= 0 ? (
            <div className="text-green-500 capitalize">{data3} %</div>
          ) : (
            <div className="text-red-500 capitalize">{data3} %</div>
          )}</CardTitle>
   
        </CardHeader>

        
      </Card>
    </div>
  );
}
