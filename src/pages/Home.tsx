import AboutUs from "../components/aboutUs/AboutUs";
import AutoSpareParts from "../components/autoSpareParts/AutoSpareParts";
import Carousel from "../components/carousel/Carousel";
import Products from "../components/products/Products";
import Wrapper from "../utility/react/Wrapper";

const Home = () => {
    return (
        <div>

            <Wrapper >

                <Carousel />
                <AutoSpareParts />
                <Products />
                <AboutUs />

            </Wrapper>

        </div>

    )
}

export default Home;