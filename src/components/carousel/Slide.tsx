import SlideType from "./SlideType";

interface ExtendedSlideType extends SlideType {
    className : string;
}
const Slide = ({ image, title, desc, secondImage,className}: ExtendedSlideType) => {
    return (
        <div className={`relative ${className}`}>
            <img src={image} className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-black/75 h-full w-full  justify-between ">
                <div className="flex top-[50%] absolute px-32">
                    <div className="text-white">
                        <h1 className="text-5xl capitalize">{title}</h1>
                        <p className="text-xl"> {desc} </p>
                    </div>
                    <div>
                        <img src={secondImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slide;