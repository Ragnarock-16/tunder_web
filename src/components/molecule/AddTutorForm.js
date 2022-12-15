import {observer} from "mobx-react";
import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {demandeStore} from "../../stores/DemandeStore";

function AddTutorForm(){
    useEffect(() => {
        demandeStore.getCours()
    },[])
    const [value,setValue]= useState([])
    const cours = demandeStore.inputCoursFormat(demandeStore.cours)

    const handleSubmit = (event) => {
        event.preventDefault();
        demandeStore.beTutor(value)
    }

    return (<form onSubmit={handleSubmit}>
        <h1>Devenir un tuteur</h1>
        <Autocomplete
            id={"cours"}
            multiple
            options={cours}
            value={value}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={(event, newValue) => {setValue(newValue)}}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Cours"
                    name={"cours"}
                    placeholder="Ajouter un cours"
                />
            )}
            sx={{ width: 400 ,marginBottom:2}}
        />
        <input
            className={'submit'}
            type="submit"
            value={"Valider"}
        >
        </input>
    </form>)
}
export const ObserverAddTutorForm = observer(AddTutorForm)