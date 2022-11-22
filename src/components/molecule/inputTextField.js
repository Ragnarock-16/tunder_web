import {TextField} from "@mui/material";

export default function InputTextField({id, label, value}){
    return <TextField
        sx={{margin: '1%'}}
        required
        disabled={false}
        variant={"standard"}
        margin={'normal'}
        type={id}
        value={value}
        id={id}
        label={label}
        name={id}
        autoComplete={id}
$    />
}