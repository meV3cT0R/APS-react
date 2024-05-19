import AboutUs from "../components/aboutUs/AboutUs";
import AutoSpareParts from "../components/autoSpareParts/AutoSpareParts";
import Carousel from "../components/carousel/Carousel";
import Products from "../components/products/Products";

const Home = () => {
    return (
        <div>

            <div className="px-32">
                <Carousel />
                <AutoSpareParts />
                <Products />
                <AboutUs/>
            </div>

        </div>

    )
}

export default Home;