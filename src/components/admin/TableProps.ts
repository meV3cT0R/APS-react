import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { TableObjectType } from "./types"

export interface TableInnerData {
    [key:string] : string | TableObjectType |IconProp | string[],
}
export interface TableData {
    [key:string] : string | TableInnerData
}
export interface TableProps {
    columns: string[],
    datas: TableData[] |null,
    operations?: boolean,
    onClickDelete?: (id:string) => void,
    avoidColumns?: string[],
    editPath?:string,
    deleteURL?:string,
    afterDeletePath?:string,
    XCORSToken?:string,
    editButton?:boolean,
    delErrorMessage ?:string
}

export interface ExtendedTableProps extends TableProps {
    
}