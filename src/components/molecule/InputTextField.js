import {TextField} from "@mui/material";

export default function InputTextField({type, label, id}){
    return <TextField
        sx={{margin: '1%'}}
        required
        disabled={false}
        margin={'normal'}
        fullWidth
        type={type}
        id={id}
        label={label}
        name={id}
  />
}