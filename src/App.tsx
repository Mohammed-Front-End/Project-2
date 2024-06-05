import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./components/data";
import Modal from "./components/ui/Dialog";
import Buttons from "./components/ui/Buttons";
import Input from "./components/ui/input";

// interface IProps {
  
// }
function App () {
  // ** State 
  const [isOpen, setIsOpen] = useState(false)
  // ** Renders 
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  // ** Renders 
  const renderProductlist = productList.map(pro => <ProductCard key={pro.id} product={pro} description={pro}/>)
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col text-xl	 mb-4" >
      <label className="lock uppercase tracking-wide mb-2 text-sm	font-bold text-cyan-950"  htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name}/>
    </div>
  ))
  return (
    <main className="container">
      <Buttons className=" hover:bg-indigo-800 bg-indigo-700 "onClick={()=>{openModal()}} >Build Now</Buttons>
      <div  className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-2 md:gap-4 m-8 ">
        {renderProductlist}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Protuct">

        <div>
        {renderFormInputList}
        </div>

        <div className="flex items-center space-x-3">
          <Buttons className=" hover:bg-indigo-800 bg-indigo-700 " >Submit</Buttons>
          <Buttons className=" hover:bg-gray-500 bg-gray-400 " >Cancel</Buttons>
        </div>
      </Modal>
    </main>
  )
}

export default App