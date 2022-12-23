import {observer} from "mobx-react";
import Box from "@mui/material/Box";
import {Tabs} from "@mui/material";
import Tab from '@mui/material/Tab';
import {useEffect, useState} from "react";
import ButtonAppBar from "../organism/Navbar";
import TabPanel from "../molecule/TabPanel";
import Table from "../molecule/Table";
import {demandeStore} from "../../stores/DemandeStore";
import {ObserverAddDemandeModal} from "../organism/AddDemandeModal";
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {toasterStore} from "../../stores/ToasterStore";
import {ObserverAddTutorModal} from "../organism/AddTutorModal";
import Button from "@mui/material/Button";
import {userStore} from "../../stores/UserStore";

function Demande(){

    useEffect(() => {
        demandeStore.getDemandes()
    },[])

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const renderDetailsButton = (params) => {

        return (
            params.value==='waiting'?
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        demandeStore.updateDemande(params.row,"accepted")
                    }}
                >
                    Accepter
                </Button>

                <Button
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        demandeStore.updateDemande(params.row,"rejected");
                    }}
                >
                    Refuser
                </Button>
            </strong>:params.value
        )
    }
    const demandeColumns = [
        {HeaderName:"bloc",field:"Bloc",width:visualViewport.width*0.09,headerAlign:"center",align:"center",headerClassName:"headerColumn"},
        {HeaderName: "cours",field:"Cours",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "tuteur",field:"Tuteur",width:visualViewport.width*0.09,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "date",field:"Date",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "lieu",field:"Lieu",width:visualViewport.width*0.3,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "etat",field:"Etat",width:visualViewport.width*0.12,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
    ]
    const tutorColumns = [
        {HeaderName:"bloc",field:"Bloc",width:visualViewport.width*0.09,headerAlign:"center",align:"center",headerClassName:"headerColumn"},
        {HeaderName: "cours",field:"Cours",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "demandeur",field:"Demandeur",width:visualViewport.width*0.09,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "date",field:"Date",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "lieu",field:"Lieu",width:visualViewport.width*0.2,headerAlign:"center",align:"center",headerClassName:"headerColumn",sortable: false},
        {HeaderName: "etat",field:"Etat",width:visualViewport.width*0.22,headerAlign:"center",align:"center",headerClassName:"headerColumn",renderCell:renderDetailsButton,sortable: false},
    ]
    const tutorRows = demandeStore.demandes.filter((demande) =>
       demande.Tuteur===userStore.getUserName()
    )
    const demandeRows = demandeStore.demandes.filter((demande) =>
        demande.Tuteur!==userStore.getUserName()
    )
    return (
        <div>
            <ButtonAppBar/>
            <h1>Demandes</h1>
            <div className={"demandeBtn"}>
                <ObserverAddDemandeModal/>
                <ObserverAddTutorModal/>
            </div>
            <Box sx={{ width: '100%' }} className={"demande"}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Mes demandes"  />
                        <Tab label="Mes tutorats" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Table rows={demandeRows} columns={demandeColumns}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Table rows={tutorRows} columns={tutorColumns}/>
                </TabPanel>
                <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>
            </Box>
        </div>
       )
}
export const ObserverDemande = observer(Demande);