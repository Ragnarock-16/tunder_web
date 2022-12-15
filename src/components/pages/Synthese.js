import {observer} from "mobx-react";
import ButtonAppBar from "../organism/Navbar";
import Table from "../molecule/Table";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import {syntheseStore} from "../../stores/SyntheseStore";

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
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        console.log(params.row);
                    }}
                >
                    More Info
                </Button>
            </strong>
        )
    }
    const columns = [
        {HeaderName:"bloc",field:"Bloc",width:visualViewport.width/5,headerAlign:"center",align:"center",headerClassName:"headerColumn"},
        {HeaderName: "cours",field:"Cours",width:visualViewport.width/5,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "date",field:"Date",width:visualViewport.width/5,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "auteur",field:"Auteur",width:visualViewport.width/5,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName:"telecharger",field:"Telecharger",width:visualViewport.width/5,headerAlign:"center",align:"center",headerClassName:"headerColumn",renderCell:renderDetailsButton,sortable: false}
    ]
    const gridRowsProp = syntheseStore.syntheses;
    return <div>
        <ButtonAppBar/>
        <h1>Synthéses</h1>
        <div className={"synthese"}>
            <Table columns={columns} rows={gridRowsProp} />
        </div>
    </div>
}export const ObserverSynthese = observer(Synthese);