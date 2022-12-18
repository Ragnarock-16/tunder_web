import {observer} from "mobx-react";
import ButtonAppBar from "../organism/Navbar";
import Table from "../molecule/Table";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {syntheseStore} from "../../stores/SyntheseStore";
import DownloadIcon from '@mui/icons-material/Download';
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {toasterStore} from "../../stores/ToasterStore";
import {ObserverAddSyntheseModal} from "../organism/AddSyntheseModal";
function Synthese (){

    useEffect(() => {
         syntheseStore.getAllSyntheses()
        },[])

    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 ,backgroundColor: "rgba(6,21,44,0.68)"}}
                    onClick={() => {
                        syntheseStore.downloadSynthese(params.row.File_Name)
                    }}
                >
                    <DownloadIcon/>
                </Button>

            </strong>
        )
    }
    const columns = [
        {HeaderName:"bloc",field:"Bloc",width:visualViewport.width*0.15,headerAlign:"center",align:"center",headerClassName:"headerColumn"},
        {HeaderName: "cours",field:"Cours",width:visualViewport.width*0.25,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "date",field:"Date",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "auteur",field:"Auteur",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName:"telecharger",field:"Telecharger",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",renderCell:renderDetailsButton,sortable: false}
    ]
    const gridRowsProp = syntheseStore.syntheses;
    return <div>
        <ButtonAppBar/>
        <h1>Synthèses</h1>
        <div className={"demandeBtn"}>
           <ObserverAddSyntheseModal />
        </div>
        <div className={"synthese"}>
            <Table columns={columns} rows={gridRowsProp} />
        </div>
        <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>

    </div>
}export const ObserverSynthese = observer(Synthese);