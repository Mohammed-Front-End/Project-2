import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import {
  categories,
  colors,
  formInputsList,
  productList,
} from "./components/data";
import Modal from "./components/ui/Dialog";
import Buttons from "./components/ui/Buttons";
import Input from "./components/ui/input";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/error/ErrorMsg";
import CircleColor from "./components/CircleColor";
import { v4 as uuidv4 } from "uuid";
import Select from "./components/ui/Select";
import { ProductName } from "./components/types";

function App() {
  const defaultProductObj = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // ** State
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj); 
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [productToDelete, setProductToDelete] = useState<string | null>(null); 


  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal,setIsOpenConfirmModal] = useState(false);

  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[3]);

  // ** Renders
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // Is Open Edit Modal
  function closeEditModal() {
    setIsOpenEditModal(false);
  }
  function openEditModal() {
    setIsOpenEditModal(true);
  }

  // Is Open Confirm Modal   
  function closeConfirmModal(){
    setIsOpenConfirmModal(false)
    setProductToDelete(null); 
  }
  function openConfirmModal(id: string){
    setIsOpenConfirmModal(true)
    setProductToDelete(id);
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  function onCancle() {
    setProduct(defaultProductObj);
    closeModal();
    setProductToEdit(defaultProductObj);
    closeEditModal()
  }
  
  function removeProductHandler() {
    if (productToDelete){
      const filtered = products.filter(product => product.id !== productToDelete)
      setProducts(filtered);
      closeConfirmModal()
    }
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    const hasErrorsMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuidv4(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  }

  function editItem(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    const hasErrorsMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    const updateProducts = [...products];
    updateProducts[productToEditIdx] = {...productToEdit,colors: tempColors.concat(productToEdit.colors)}
    setProducts(updateProducts)
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  }

  // ** Handler
  const renderProductlist = products.map((product,idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={() => openConfirmModal(product.id)}
    />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col text-xl	 mb-4" key={input.id}>
      <label
        className="lock uppercase tracking-wide mb-2 text-sm	font-bold text-cyan-950"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((col) => (
    <CircleColor
      key={col}
      color={col}
      onClick={() => {
        if (tempColors.includes(col)) {
          setTempColors((prev) => prev.filter((item) => item !== col));
          return;
        }

        if (productToEdit.colors.includes(col)) {
          setTempColors((prev) => prev.filter((item) => item !== col));
          return;
        }
        setTempColors((prev) => [...prev, col]);
      }}
    />
  ));

  function renderProductEditWithErrorMsh(
    id: string,
    label: string,
    name: ProductName
  ) {
    return (
      <div className="flex flex-col text-xl	 mb-4">
        <label
          className="lock uppercase tracking-wide mb-2 text-sm	font-bold text-cyan-950"
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  }




  return (
    <main className="container">
      {/*Start ADD Product Modal */}
      <Buttons
        className=" hover:bg-indigo-800 bg-indigo-700 "
        onClick={() => {
          openModal();
        }}
      >
        Build Now
      </Buttons>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-2 md:gap-4 m-8 ">
        {renderProductlist}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Protuct">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center my-4 space-x-1">
            {renderProductColors}
          </div>
          <div className="flex flex-wrap items-center my-4 space-x-1">
            {tempColors.map((e) => (
              <span
                className="cursor-pointer p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: e }}
                key={e}
              >
                {e}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Buttons className=" hover:bg-indigo-800 bg-indigo-700 ">
              Submit
            </Buttons>
            <Buttons
              className=" hover:bg-gray-500 bg-gray-400 "
              onClick={onCancle}
            >
              Cancel
            </Buttons>
          </div>
        </form>
      </Modal>
      {/*End ADD Product Modal */}

      {/* Start Edit Product Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="Edit Modal Protuct"
      >
        <form className="space-y-3" onSubmit={editItem}>
          {renderProductEditWithErrorMsh("title", "Product Title", "title")}
          {renderProductEditWithErrorMsh(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsh(
            "imagURL",
            "Product imag URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsh("PRICE", " PRICE", "price")}

          <Select selected={productToEdit.category} setSelected={(value)=> setProductToEdit({...productToEdit, category:value})}
          />

          <div className="flex items-center my-4 space-x-1">{renderProductColors}</div>
          <div className="flex flex-wrap items-center my-4 space-x-1">{
            [...tempColors,...productToEdit.colors].map(e => 
            <span 
              className="cursor-pointer p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{backgroundColor:e}} key={e}>{e}
            </span>)
          }</div>

          {/* titel */}
          <div className="flex items-center space-x-3">
            <Buttons className=" hover:bg-indigo-800 bg-indigo-700 ">
              Submit
            </Buttons>
            <Buttons
              className=" hover:bg-gray-500 bg-gray-400 "
              onClick={onCancle}>
              Cancel
            </Buttons>
          </div>
        </form>
      </Modal>
      {/* End Edit Product Modal */}

      

      {/* Start Delete Product Confirm Modal */}
      <Modal 
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this product from your store?"
        description=" Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
        <div className="flex items-center space-x-3">
          <Buttons className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Buttons>
          <Buttons className="bg-[#a7a7a9] hover:bg-gray-600 text-white" onClick={closeConfirmModal}>
            Cancel
          </Buttons>
        </div>
      </Modal>

      {/* End Delete Product Confirm Modal */}
    </main>
  );
}

export default App;
