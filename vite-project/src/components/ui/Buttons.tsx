import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  className?:string,
  width?:"w-full" | "w-fit" | "flex-1"
}
function Buttons ({children,className,width="w-full",...rest}:IProps) {
  console.log({rest})
  return(
    <button className={`${className} ${width} p-4 rounded-md text-white`} {...rest}>
      {children}
    </button>
  )

}

export default Buttons