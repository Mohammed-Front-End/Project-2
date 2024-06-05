import ProductCard from "./components/ProductCard";
import { productList } from "./components/data";

interface IProps {
  
}
function App ({}:IProps) {
  //** Renders 
  const renderProductlist = productList.map(pro => <ProductCard key={pro.id} product={pro}description={pro}/>)
  return (
    <div  className="border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4 m-8 md:max-w-2xl">
      {renderProductlist}
    </div>
  )
}

export default App