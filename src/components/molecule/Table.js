import {DataGrid, GridToolbar} from '@mui/x-data-grid';
export default function Table ({columns,rows}){
    return  <div className={"syntheseGrid"}>

        <DataGrid components={{Toolbar:GridToolbar}} rows={rows} columns={columns} autoHeight={true} checkboxSelection={false}  rowsPerPageOptions={[10]}   pageSize={5}
                   disableSelectionOnClick  disableColumnMenu={true}
                  componentsProps={{
            toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 250 },
            },
        }}
        />

    </div>
}