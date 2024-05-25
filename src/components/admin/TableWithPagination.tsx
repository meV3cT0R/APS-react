import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ExtendedTableProps } from "./TableProps";
import Table from "./Table";

const TableWithPagination = ({ columns, datas, operations = true, onClickDelete, avoidColumns, deleteURL, afterDeletePath,editPath,editButton=true }: ExtendedTableProps) => {
    const [searchText, setSearchText] = useState<string>("");
    const [entries, setEntries] = useState<number>(datas?.length || 0);
    const [page, _] = useState<number>(0);
    const [filteredData, setFilteredData] = useState<any[] | null>(datas);
    const rightRef = useRef<HTMLButtonElement>(null);
    const leftRef = useRef<HTMLButtonElement>(null);


    const handleData = () => {
        if (datas) {
            const data = [...datas.slice(page * entries, (page * entries) + entries)];
            if (leftRef.current) {
                if (page == 0) leftRef.current.disabled = true;
                else leftRef.current.disabled = false;
            }

            if (rightRef.current) {
                if ((page * entries) + entries >= datas.length) rightRef.current.disabled = true;
                else rightRef.current.disabled = false;
            }
            return data;
        }
        return [];
    }
    useEffect(() => {
        setFilteredData(handleData());
    }, [page, entries, datas]);

    useEffect(()=> {
        setFilteredData(datas);
    },[datas])
    const func = useCallback((dat: any) => {
        for (const [_, value] of Object.entries(dat)) {
            if (typeof (value) == "object") { if (func(value)) return true}
            else if (value && value.toString().toLowerCase().includes(searchText.toLowerCase())) return true;
        }
        return false;
    }, [searchText])

    useEffect(() => {
        setFilteredData(handleData().filter((dat: any) => func(dat)));
    }, [searchText]);

    return (
        <div className="space-y-10">
            <div className="flex w-full justify-between flex-col  space-y-5 md:space-y-0 md:flex-row">
                <div>
                    <input
                        type="text"
                        value={entries}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (isNaN(Number(e.target.value))) return
                            setEntries(Number(e.target.value))
                        }}
                        className="border-2 w-[55px] h-[40px] px-4 "
                    />
                    <span className="text-gray-600"> entries per page</span>
                </div>

                <div>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                        className="border-2 px-2 py-3 rounded-lg shadow"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <Table
                columns={columns}
                datas={filteredData}
                onClickDelete={onClickDelete}
                operations={operations}
                avoidColumns={avoidColumns}
                deleteURL={deleteURL}
                afterDeletePath={afterDeletePath}
                editPath={editPath}
                editButton={editButton}
            />
            <div className="text-3xl">
                {/* <button
                    onClick={()=>setPage(page-1)}
                    ref={leftRef}
                >
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </button>
                {page+1}
                <button
                    onClick={()=>setPage(page+1)}
                    ref={rightRef}
                >
                    <FontAwesomeIcon icon={faAngleRight}/>
                </button> */}
            </div>
        </div>
    )
}

export default TableWithPagination;