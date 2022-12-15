import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {demandeStore} from "../../stores/DemandeStore";
import InputMessageField from "./InputMessageField";
import DateTimePicker from "./DateTimeField";
import moment from "moment";

function AddDemandeForm({handleSubmit}) {

    useEffect(() => {
        demandeStore.getCours()
    },[])

    const bloc = [{label:"B1"},{label:"B2"},{label:"B3"},{label:"M1"},{label:"M2"}]
    const [selectedBloc, setSelectedBloc] = useState(null);
    const [selectedCours, setSelectedCours] = useState(null);
    const [selectedTuteur, setSelectedTuteur] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleBlocChange = (event, newValue) => {
        setSelectedBloc(newValue.label);
        setSelectedCours(null);
        setSelectedTuteur(null);
    }
    const handleCoursChange = (event, newValue) => {
        setSelectedCours(newValue.label);
        setSelectedTuteur(null);
        demandeStore.getTutors(selectedBloc,newValue.label)
    }

    return (<form onSubmit={handleSubmit}>
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
        <Autocomplete
            id="tuteur"
            value={selectedTuteur}
            options={demandeStore.getTutorGivenCours()}
            disabled={selectedCours === null}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={(event, newValue) => {setSelectedTuteur(newValue.label)}}
            sx={{ width: 400 ,marginBottom:2}}
            renderInput={(params) => <TextField {...params} name={"tuteur"} label="Tuteur" />}
        />


        <div hidden={!selectedTuteur}>
        <DateTimePicker minDateTime={moment()} value={selectedDate} onChange={(newValue) => {setSelectedDate(newValue)}}/>
            <TextField name={"dateTime"} value={selectedDate!=null?selectedDate.toISOString():""}  style={{display:'none'}}/>

            <div>
                <TextField label="Rue" name={"rue"} variant="outlined" sx={{paddingRight:1}} required/>
                <TextField label="N°" name={"num"} variant="outlined" required/>
            </div>
            <div className={"demandeComment"}>
                <InputMessageField label={"Commentaire"}/>
            </div>
        </div>
        <input
            className={'submit'}
            type="submit"
            value={"Demander"}
        >
        </input>

    </form>)
}
export const ObserverAddDemandeForm = observer(AddDemandeForm);