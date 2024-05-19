import Container from "../../utility/react/Container";
import Header from "../../utility/react/Header";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./products.css"
import { useEffect, useRef, useState } from "react";
import { noImage } from "../../utility/constants";


const Products = () => {
    const sliderRef = useRef<HTMLUListElement>(null);
    const [right, setRight] = useState<boolean>(true);
    const products = [
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: "https://images.collectingcars.com/021553/DSC01008.jpg?w=1263&fit=fillmax&crop=edges&auto=format,compress&cs=srgb&q=85",
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
        {
            img: noImage,
            name: "Some Random Product",
            price: "$500"
        },
    ]


    useEffect(() => {
        const slide = setInterval(() => {
            if (sliderRef.current != null) {
                if (right) {
                    sliderRef.current.scrollTo({
                        left: sliderRef.current.scrollLeft + 300,
                        behavior: 'smooth'
                    })
                    console.log("Scroll Left Value:"+sliderRef.current.scrollLeft);
                    if(sliderRef.current.scrollLeft+sliderRef.current.clientWidth>sliderRef.current.clientWidth) {
                        setRight(false);
                    }
                }else {
                    sliderRef.current.scrollTo({
                        left: sliderRef.current.scrollLeft - 300,
                        behavior: 'smooth'
                    })
                    if(sliderRef.current.scrollLeft==0) {
                        setRight(true);
                    }  
                }
            }
        }, 1000)

        return () => {
            clearInterval(slide);
        }
    }, [right]);
    return (
        <Container>
            <div>
                <Header title="Products" />
                <div className="relative w-full mx-auto">
                    <button
                        className="absolute left-0 top-[50%] translate-y-[-50%] w-[50px] h-[50px] bg-black/75  text-white rounded-[50%]"
                        onClick={() => {
                            if (sliderRef.current != null) {
                                sliderRef.current.scrollTo({
                                    left: sliderRef.current.scrollLeft - 300,
                                    behavior: 'smooth'
                                })
                            }

                        }}
                    >
                        <ArrowLeftIcon />

                    </button>
                    <button
                        className="absolute right-0 top-[50%] translate-y-[-50%] w-[50px] h-[50px] bg-black/75  text-white rounded-[50%]"
                        onClick={() => {
                            if (sliderRef.current != null) {
                                sliderRef.current.scrollTo({
                                    left: sliderRef.current.scrollLeft + 300,
                                    behavior: 'smooth'
                                })
                            }

                        }}
                    >
                        <ArrowRightIcon />
                    </button>

                    <ul ref={sliderRef} className="w-[95%] mx-auto flex overflow-x-scroll space-x-5 invis_scroll">
                        {products.map(product => {
                            return <li key={JSON.stringify(product)}>
                                <div className="w-[300px]">
                                    <img
                                        src={product.img || noImage}
                                        className="w-[full] h-[300px] object-cover border" />

                                    <h1 className="text-xl"> {product.name}</h1>
                                    <p className="text-gray-500 text-lg"> {product.price}</p>
                                </div>

                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default Products;