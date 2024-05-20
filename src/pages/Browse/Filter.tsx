import { useFormik } from "formik";
import SearchBox from "../../utility/react/SearchBox";
import Select from "../../components/form/Select";

const Filter = ({cat} : {cat:string |null}) => {
    const categories = ["all","alternator", "Engine parts", "Brake parts", "Wiper Blade"]
    const formik = useFormik({
        initialValues: {
            keyword: "",
            category: cat?.toLowerCase() || "all",
            brand: "all",
            price : 2000,
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

    });
    return (
        <div className="flex flex-col w-[200px] space-y-10">
            <div>
                <SearchBox />
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Category </h1>
                <ul className="space-y-1 text-gray-500 text-lg">
                    {
                        categories.map(c => {
                            return <li 
                            className={`${formik.values.category.toLowerCase()==c.toLowerCase()?"text-primary":""} cursor-pointer hover:text-primary duration-300`}
                            onClick={()=> {
                                formik.setFieldValue("category",c);
                                console.log(c);
                            }}
                            >
                                {c}
                            </li>
                        })
                    }
                </ul>
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Brand </h1>
                <Select formik={formik} name="brand" map={
                    {
                        BMW: "BMW",
                        BMW2: "BMW",
                        BMW3: "BMW",
                    }
                }
                />
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Price </h1>
                <p id="output">$ {formik.values.price}</p>
                <input type="range" min="1" max="4100"
                    value={formik.values.price }
                    className="cursor-pointer"
                    onInput={(e) => {
                        formik.setFieldValue("price",e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export default Filter;