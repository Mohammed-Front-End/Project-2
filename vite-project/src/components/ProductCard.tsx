import Thailand from "../assets/Product/1.jpg";
import Imag from "./Images";
import { IProduct } from "./interfaces";
import Buttons from "./ui/Buttons";

interface IProps {
  product:IProduct
}




function ProductCard ({product}:IProps) {
  const {title,description,imageURL,price} = product;
  return (
    <div className="border rounded-md p-2 flex flex-col">
      <Imag imgURL={imageURL} alt={"Product name"} className="rounded-md mb-2" />
      
      <h3 className="my-6 ">{title}</h3>
      <p>{description}</p>

      <div className="flex items-center my-4 space-x-3">
        <span className="w-5 h-5 bg-white rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-cyan-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-emerald-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-red-600 rounded-full  cursor-pointer"></span>
      </div>
      
      <div className="flex items-center justify-between" >
        <span>{price}</span>
        <Imag imgURL={imageURL} alt={"Product name"} className="w-10 h-10 rounded-full object-center" />
      </div>

      <div className="flex items-center justify-between space-x-3  my-5">
        <Buttons onClick={()=> {console.log("redd")}}  className="bg-indigo-700 " width="flex-1">EDIT</Buttons>
        <Buttons onClick={()=> {console.log("redd")}} className="bg-red-700 "width="flex-1">DELETE</Buttons>
      </div>

    </div> 
  )
}
export default ProductCard;






