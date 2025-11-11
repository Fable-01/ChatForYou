import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className=" flex flex-row justify-between px-10 sm:flex-row  bg-neutral-900 shadow-neutral-700 border-b-sm-neutral-500 w-full h-[50px] pt-1.5">
     <Link to='/'>
     <Button className=" border border-neutral-400 hover:bg-neutral-800" >HOME</Button>
     </Link>
       <Link to='favourite'>
       <Button className=" border border-neutral-400 hover:bg-neutral-800">Favourite</Button>
       </Link>
    </div>
  );
};
export default Navbar;
