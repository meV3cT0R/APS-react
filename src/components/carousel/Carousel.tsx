import Slide from "./Slide";
import SlideType from "./SlideType";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useEffect, useState } from "react";

const Carousel = () => {

    const [index,setIndex] = useState(0);
    const [slides, _] = useState<SlideType[]>([
        {
            image: "https://images.collectingcars.com/021553/DSC01008.jpg?w=1263&fit=fillmax&crop=edges&auto=format,compress&cs=srgb&q=85",
            title: "some Random Shit",
            desc: "Again Some Random Shit here too",
            secondImage: "",
        },
        {
            image: "https://www.mustangspecs.com/wp-content/uploads/2023/05/1977105_12.jpg",
            title: "some Random Shit version 2",
            desc: "again same random junks you prolly will never read",
            secondImage: "",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/1969_Dodge_Charger_%2821572136732%29.jpg/1200px-1969_Dodge_Charger_%2821572136732%29.jpg",
            title: "some Random Shit",
            desc: "what else did you expect?",
            secondImage: "",
        },
        
    ])
    useEffect(()=> {
        const autoSlide = setInterval(()=> {
            setIndex((index + 1) % slides.length);
        },3000);

        return ()=> {
            clearInterval(autoSlide)
        }
    },[index,setIndex,slides])
    return (
        <div className="relative overflow-hidden">

            <Slide {...slides[index]} className=""/>
            <button
                className="prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 text-primary px-4 py-2 rounded-md"
                onClick={()=> {
                    setIndex(index - 1<0?slides.length-1:index-1);
                }}  
            >
                <ArrowLeftIcon /> </button>
            <button
                className="next absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 text-primary px-4 py-2 rounded-md"
                onClick={()=> {
                    setIndex((index + 1) % slides.length)
                }}  
            >
                <ArrowRightIcon />
            </button>
        </div>
    )
}

export default Carousel;