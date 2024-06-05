import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {

}
function Input ({...rest}:IProps) {
  return (
    <input {...rest}  className="bg-gray-200 appearance-none 
      border-2 border-gray-200 rounded w-full py-2 px-4
    text-gray-700 leading-tight focus:outline-none
    focus:bg-white focus:border-purple-500"  />
  )
}

export default Input