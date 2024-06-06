import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./components/data";
import Modal from "./components/ui/Dialog";
import Buttons from "./components/ui/Buttons";
import Input from "./components/ui/input";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/error/ErrorMsg";


function App () {
  const defaultProductObj = {
    id:"",
    title:"",
    description:"",
    imageURL:"",
    price:"",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    }
  }
  // ** State 
  const [product,setProduct] = useState<IProduct>(defaultProductObj)
  const [errors, setErrors] = useState({
    title:"",
    description:"",
    imageURL:"",
    price:"",
  })
  
  const [isOpen, setIsOpen] = useState(false)
  // ** Renders 
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
    const {value,name} = e.target;
    setProduct({
      ...product,
      [name]:value
    })
    setErrors({
      ...errors,
      [name]: ''
    })
  }



  function onCancle(){
    setProduct(defaultProductObj)
    closeModal()
  }
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const { title,description,imageURL, price} = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    })
    const hasErrorsMsg = Object.values(errors).some(value =>value === '')
      && Object.values(errors).every(value => value === "");
    console.log(errors);

    if(!hasErrorsMsg){
      setErrors(errors)
      return;
    }
    console.log("Send this product to uor server");
  }



  // ** Renders 
  const renderProductlist = productList.map(pro => <ProductCard key={pro.id} product={pro}/>)
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col text-xl	 mb-4" key={input.id} >
      <label className="lock uppercase tracking-wide mb-2 text-sm	font-bold text-cyan-950"  htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
      <ErrorMsg msg={errors[input.name]}/>
    </div>
  ))
  return (
    <main className="container">
      <Buttons className=" hover:bg-indigo-800 bg-indigo-700 "onClick={()=>{openModal()}} >Build Now</Buttons>
      <div  className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-2 md:gap-4 m-8 ">
        {renderProductlist}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Protuct">

        <form className="space-y-3" onSubmit={submitHandler} >
        {renderFormInputList}

          <div className="flex items-center space-x-3">
            <Buttons className=" hover:bg-indigo-800 bg-indigo-700 " >Submit</Buttons>
            <Buttons className=" hover:bg-gray-500 bg-gray-400 "onClick={onCancle} >Cancel</Buttons>
          </div>
        </form>

      </Modal>
    </main>
  )
}

export default App