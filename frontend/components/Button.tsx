import React from "react"

const Button = ({onClick, children}:{onClick:()=>void, children:React.ReactNode}) => {
  return (
    <button onClick={onClick} className="bg-[#779556] font-semibold text-xl px-6 py-3 rounded-xl cursor-pointer">
        {children}                   
    </button>
  )
}

export default Button
