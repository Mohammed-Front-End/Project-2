import CircleColor from "./CircleColor";
import Imag from "./Images";
import { IProduct } from "./interfaces";
import Buttons from "./ui/Buttons";
import { textSlicer } from "./utils/function";
interface IProps {
  product:IProduct,
  setProductToEdit:(product: IProduct) => void,
  openEditModal: () => void,
  idx:number,
  setProductToEditIdx: (value:number)=>void,
}
/**
 * A card component that displays product details including image, title, description, price, and actions.
 *
 * @param {Object} props - The props for the ProductCard component.
 * @param {Object} props.product - The product details.
 * @param {string} props.product.title - The title of the product.
 * @param {string} props.product.description - The description of the product.
 * @param {string} props.product.imageURL - The URL of the product image.
 * @param {number} props.product.price - The price of the product.
 * @returns {JSX.Element} The rendered ProductCard component.
 */
function ProductCard ({product,setProductToEdit,openEditModal,idx,setProductToEditIdx}:IProps) {
  const {title,description,imageURL,price,colors,category} = product;
  // Render
  const renderProductColors = colors.map(event => (
    <CircleColor key={event} color={event}/>
  ))

  // Hendler
  const onEdit = () =>{
    setProductToEdit(product);
    openEditModal()
    setProductToEditIdx(idx)
  }

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border border-solid border-blue-200 rounded-md p-2 flex flex-col justify-between">
      <Imag imgURL={imageURL} alt={"Product name"} className="rounded-md h-52 w-full lg:object-center" />
      
      <h3 className="my-6 ">{title}</h3>
      <p>{textSlicer(description)}</p>
      
      <div className="flex items-center my-4 space-x-1">{renderProductColors}</div>

      
      <div className="flex items-center justify-between" >
        <span>{price}</span>
        <Imag imgURL={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-center" />
      </div>
      
      <div className="flex items-center justify-between space-x-3  my-5">
        <Buttons onClick={onEdit}  className=" hover:bg-indigo-800 bg-indigo-700 " width="flex-1">EDIT</Buttons>
        <Buttons onClick={()=> {console.log("redd")}} className=" hover:bg-red-800 bg-red-700 "width="flex-1">DELETE</Buttons>
      </div>
      
    </div> 
  )
}
export default ProductCard;






