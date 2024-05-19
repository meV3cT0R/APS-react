import Container from "../../utility/react/Container";
import Filter from "./Filter";
import Prods from "./Prods";

const Browse = () => {
    return (
        <Container>
            <div className="px-32">
                <div className="flex space-x-10 items-start ">
                    <Filter />
                    <Prods />
                </div>
            </div>
        </Container>

    )
}

export default Browse;