import { ReactNode } from "react";

const Container = ({children,className} : {children:ReactNode,className?:string})=> {
    return <div className={`my-10 py-10 ${className}`}>
                {children}
        </div>
}

export default Container;