import { ReactNode } from "react";

const Wrapper = ({children,className} : {children:ReactNode,className?:string})=> {
    return <div className={"md:px-20 lg:px-0 lg:max-w-[1320px] mx-auto "+className}>
                {children}
        </div>
}

export default Wrapper;