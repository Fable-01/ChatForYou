import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { TrendingUpDown} from 'lucide-react';
const Logo = () => {
  return (

    <Button className="w-[300px] h-[50px] text-2xl font-serif border border-gray-300
      hover:bg-neutral-800 duration-200">
      <Link to='/'>
   <div className="flex gap-5"> 
     <TrendingUpDown className=" scale-200 mt-2"/>
     <div className="  text-white font-bold">Chart-For-You</div>
   </div>
          
    
      </Link>
    </Button>
  )
}
export default Logo