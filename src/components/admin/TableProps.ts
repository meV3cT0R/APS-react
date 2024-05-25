export interface TableProps {
    columns: string[],
    datas: any[] |null,
    operations?: boolean,
    onClickDelete?: (id:string) => void,
    avoidColumns?: string[],
    editPath?:string,
    deleteURL?:string,
    afterDeletePath?:string,
    XCORSToken?:string,
    editButton?:boolean
}

export interface ExtendedTableProps extends TableProps {
    
}