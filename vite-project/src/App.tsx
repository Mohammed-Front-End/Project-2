import ProductCard from "./components/ProductCard";
import { productList } from "./components/data";

interface IProps {
  
}
function App ({}:IProps) {
  //** Renders 
  const renderProductlist = productList.map(pro => <ProductCard key={pro.id} product={pro} description={pro}/>)
  return (
    <main className="container">
      <div  className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-2 md:gap-4 m-8 ">
        {renderProductlist}
      </div>
    </main>
  )
}

export default App