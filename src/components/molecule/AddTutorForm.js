import {observer} from "mobx-react";
import {Autocomplete, TextField} from "@mui/material";
import {useEffect} from "react";
import {demandeStore} from "../../stores/DemandeStore";

function AddTutorForm({handleSubmit}){
    useEffect(() => {
        demandeStore.getCours()
    },[])
    const cours =  ()=>{
        let formattedData=[]
        demandeStore.cours.forEach(c => {
            formattedData.push({
                label: c.nom
            })
        })
        return formattedData
    }
    return (<form onSubmit={handleSubmit}>
        <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="filterSelectedOptions"
                    placeholder="Favorites"
                />
            )}
        />
    </form>)
}
export const ObserverAddTutorForm = observer(AddTutorForm)