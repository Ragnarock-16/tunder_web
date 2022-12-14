import ButtonAppBar from "../organism/Navbar";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";

export default function TutoratRequest(){

    const [block, setBlock] = useState("B1");
    const [cours, setCours] = useState("");
    const [tutorant, setTutorant] = useState("");
    const [test, setTest] = useState({results: [{gender: 'male'}]});
    fetch("https://randomuser.me/api/?results=5").then(data => data.json()).then(r => {setTest(r)});

    let coursList = ["",""];
    let tutorantList = ["",""];


    function handleBlock(event){
        setBlock(event.target.value);
    }

    function handleCours(event){
        setCours(event.target.value);
    }

    function handleTutorant(event){
        setCours(event.target.value);
    }

    return(
        <div>
            <ButtonAppBar/>
            <h1>Demande de tutorat</h1>

            {
                console.log(test.results[0].gender)
            }
            <p>{test.results[0].gender}</p>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bloc</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={block}
                    label="Age"
                    onChange={handleBlock}
                >
                    <MenuItem value={"B1"}>Bloc 1</MenuItem>
                    <MenuItem value={"B2"}>Bloc 2</MenuItem>
                    <MenuItem value={"B3"}>Bloc 3</MenuItem>
                    <MenuItem value={"M1"}>Master 1</MenuItem>
                    <MenuItem value={"M2"}>Master 2</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cours</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cours}
                    label="Age"
                    onChange={handleCours}
                >
                    {coursList.map(data => {
                            return (<MenuItem value={data}>{data}</MenuItem>);
                        })
                    }
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tutorant</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tutorant}
                    label="Age"
                    onChange={handleTutorant}
                >
                    {tutorantList.map(data => {
                        return (<MenuItem value={data}>{data}</MenuItem>);
                    })
                    }
                </Select>
            </FormControl>
            <Button variant="contained">Demander</Button>
        </div>
    )
}