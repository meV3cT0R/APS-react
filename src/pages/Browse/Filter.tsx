import { useFormik } from "formik";
import SearchBox from "../../utility/react/SearchBox";
import Select from "../../components/form/Select";

const Filter = () => {
    const categories = ["alternator", "Engine parts", "Brake parts", "Wiper Blade"]
    const formik = useFormik({
        initialValues: {
            category: "all",
            brand: "all",
            price : 8000,
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
                        categories.map(cat => {
                            return <li>
                                {cat}
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