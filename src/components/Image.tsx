import { imageURL, noImage } from "../utility/constants";

const Image = ({ className, src, alt }:{className?:string, src:string, alt?:string}) => {
    return (
        <>
            {src === imageURL || !src ? (
                <img
                    src={noImage}
                    className={className}
                    alt="Default Logo"
                />
            ) : (
                <img src={src} className={className} alt={alt} />
            )}
        </>
    );
};

export default Image;