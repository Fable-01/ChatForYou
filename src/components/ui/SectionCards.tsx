

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({data,data2,data3,data4,data5}) {


  
const nawdata = data
  console.log(nawdata);
if (!nawdata) {
  return <>loding</>
}
  return (
    <div className="">
      
      
      <Card className="  bg-neutral-900 w-[400px] ">
        <CardHeader >
          <CardDescription>Coin Rank {data2}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
       {data}
          </CardTitle>
          <CardAction >
            <Badge variant="outline" className="text-white">

              {data3}|USD
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="  capitalize line-clamp-1 flex gap-2 font-medium text-white ">
          marketcap {data4}
          </div>
          <div className="text-muted-foreground capitalize">volume {data5}</div>
        </CardFooter>
      </Card>
    
    </div>
  )
}
