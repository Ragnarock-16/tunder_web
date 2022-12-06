import ButtonAppBar from "../organism/Navbar";
import HoraireForm from "../organism/HoraireForm";
import {horaireStore} from "../../stores/HoraireStore";
import Calendrier from "../molecule/Calendrier";
import {observer} from "mobx-react";
import {useEffect} from "react";
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {toasterStore} from "../../stores/ToasterStore";



function Horaire() {

    const OnSubmit = (event) => {
        event.preventDefault();
        const data = document.getElementById("horaire").value;
        horaireStore.updateHoraire(data);
    }
    useEffect(()=> {
            horaireStore.getHoraire()
        },[])

    return (
        <div>
            <ButtonAppBar/>
            <HoraireForm handleSubmit={OnSubmit}/>
            <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>
            <div>
                {horaireStore.horaires?<Calendrier calendarData={horaireStore.horaires}/> : <h1>Encoder votre lien horaire!</h1>}
            </div>

        </div>
    )
}
export const ObserverHoraire = observer(Horaire);