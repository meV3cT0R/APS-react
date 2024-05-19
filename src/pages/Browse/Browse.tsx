import { products } from "../../dummy_data/products";
import Container from "../../utility/react/Container";
import Filter from "./Filter";
import Prods from "./Prods";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
    const [params,_] = useSearchParams();
    
    return (
        <Container>
            <div className="px-32">
                <div className="flex space-x-10 items-start ">
                    <Filter cat={params.get("cat")}/>
                    <Prods products={products}/>
                </div>
            </div>
        </Container>

    )
}

export default Browse;