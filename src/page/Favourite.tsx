import {StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from "react-router";
import { toast } from 'react-toastify';
const Favourite = () => {

  const [myUnits, setMyUnits] = useState<string[]>([]); // ใช้ state แทน




  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myUnits") || "[]");
    setMyUnits(stored);
  }, []);





  const hld = (s:string) => {

    getData(s)

  }

  const getData = (s:string) => {

    let stored = JSON.parse(localStorage.getItem("myUnits") || "[]");

    if (stored.includes(s)) {
      stored = stored.filter((item: string) => item !== s); // filter เป็นการแยกตัวที่ไม่เหมือนกันออกมา เช่น ตัวที่ส่งเข้ามาเป็น a 
      toast.error('Remove Success')
    }
    localStorage.setItem("myUnits", JSON.stringify(stored));
    setMyUnits(stored); // อัปเดต state → ทำให้ component render ใหม่
  }

  // ab 


  useEffect(() => {


  }, [])
  return (
<div className='flex  justify-center bg-neutral-800'>

    <div className='bg-neutral-800 h-[1000px] pt-5  '>
      {myUnits.map((s) => {
        
        return (<div className=' w-[1300px]'>
          <Link to={`/Chart/${s}`} >
            <div className=' bg-neutral-950  mb-3.5 flex justify-between border border-neutral-400 py-1 px-8 rounded-4xl  hover:scale-105 duration-200' >

              <div className='text-white'>{s.split('/',1)}</div>

              <button
                
                
                onClick={(e) => {
                  e.preventDefault();
                  hld(s);
                }}
                >
                <StarIcon className=' text-yellow-300 fill-yellow-300'/>
              </button>
            </div>
          </Link>
        </div>
        )
      })}

    </div>
      </div>
  );
};

export default Favourite;
