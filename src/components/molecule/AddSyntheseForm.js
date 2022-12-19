import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {demandeStore} from "../../stores/DemandeStore";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {syntheseStore} from "../../stores/SyntheseStore";
import {CircularWaiting} from "./CircularWaiting";

function AddSyntheseForm({handleSubmit}) {

    useEffect(() => {
        demandeStore.getCours()
    },[])

    const bloc = [{label:"B1"},{label:"B2"},{label:"B3"},{label:"M1"},{label:"M2"}]
    const [selectedBloc, setSelectedBloc] = useState(null);
    const [selectedCours, setSelectedCours] = useState(null);

    const handleBlocChange = (event, newValue) => {
        if(newValue !== null) {
            setSelectedBloc(newValue.label)
            setSelectedCours(null)
        }else{
            setSelectedBloc(null)
            setSelectedCours(null)
        }
    }
    const handleCoursChange = (event, newValue) => {
        if(newValue !== null){
            setSelectedCours(newValue.label);
        }else{
            setSelectedCours(null);
        }
    }

    return (<form id ="erf" onSubmit={handleSubmit}>
        <h1>Faire une demande</h1>

        <Autocomplete
            options={bloc}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={handleBlocChange}
            sx={{ width: 400 ,marginBottom:2}}
            renderInput={(params) => <TextField {...params} name={"bloc"} label="Bloc" />}
        />
        <Autocomplete
            id="cours"
            options={demandeStore.getCoursGivenBloc(selectedBloc)}
            value={selectedCours}
            disabled={selectedBloc === null}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={handleCoursChange}
            sx={{ width: 400 ,marginBottom:2}}
            renderInput={(params) => <TextField {...params} name={"cours"} label="Cours" />}
        />
        <Button sx={{width:'100%',marginBottom:2,marginTop:5}} disabled={selectedCours===null}  variant="contained" color="success" component="label" startIcon={<AttachFileIcon/>}>
            Ajouter un fichier
            <input hidden accept="image/*" name={"syntheseFile"}  type="file" />
        </Button>

        {syntheseStore.isLoading?<CircularWaiting/>: <input
            className={'submit'}
            type="submit"
            value={"Valider"}
        />}






    </form>)
}
export const ObserverAddSyntheseForm = observer(AddSyntheseForm);