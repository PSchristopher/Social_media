import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { AiTwotoneBell } from "react-icons/ai";

function BottomNavbar() {

    const Menus=[
        {name:'Settings',link:'#',icon:AiFillHome,dis:"translate-x-64"},
        {name:'Enquire',link:'/enquire-form',icon:RiMessage2Fill,dis:"translate-x-82"},
        {name:'Company',link:'/companies',icon:MdAddBox,dis:"translate-x-32"},
        {name:'Home',link:'/',icon:AiTwotoneBell,dis:"translate-x-0"},
    ]

    const [active,setActive]=useState()

  return (
    <div className='bg-[#152442] max-h-[4.4rem] px-6 pb-5 rounded-t-xl md:hidden fixed inset-x-0 bottom-0'>
        <ul className='flex relative justify-between'>
                {/* <span className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-white h-16 w-16  -top-5 rounded-full`}></span> */}

            {Menus.map((menu,i)=>(
                <li key={i} className="w-16 text-white">
                    <Link to={menu?.link} className='flex flex-col  pt-6' onClick={()=>setActive(i)}>
                    <span className={`text-xl pl-2 cursor-pointer duration-500 ${i=== active && "-mt-6 text-blue-900"}`}>{React.createElement(menu?.icon,{size:"20"})}</span>

                    <span className={`text-xs text-white ${active === i ? "translate-y-4 duration-700 opacity-100 " : "opacity-0 translate-y-10 hidden "}` }>{menu.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default BottomNavbar