import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  className?:string,
  width?:"w-full" | "w-fit" | "flex-1"
}
/**
 * A utility button component that accepts various props to customize its appearance and behavior.
 *
 * @param {Object} props - The props for the button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.width="w-full"] - The width of the button, defaults to full width.
 * @param {Object} [props.rest] - Any other props to be passed to the button element.
 * @returns {JSX.Element} The rendered button component.
 */
function Buttons ({children,className,width="w-full",...rest}:IProps) {
  return(
    <button className={`${className} ${width} p-4 rounded-md text-white`} {...rest}>
      {children}
    </button>
  )

}

export default Buttons