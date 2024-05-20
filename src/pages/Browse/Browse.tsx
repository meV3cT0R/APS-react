import { products } from "../../dummy_data/products";
import Container from "../../utility/react/Container";
import Wrapper from "../../utility/react/Wrapper";
import Filter from "./Filter";
import Prods from "./Prods";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
    const [params,_] = useSearchParams();
    
    return (
        <Container>
            <Wrapper className="">
                <div className="flex space-x-10 items-start ">
                    <Filter cat={params.get("cat")}/>
                    <Prods products={products}/>
                </div>
            </Wrapper>
        </Container>

    )
}

export default Browse;