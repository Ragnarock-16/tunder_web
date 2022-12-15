import {TextField} from "@mui/material";

export default function InputMessageField({id,label}){
    return <TextField
        id={id}
        name={"message"}
        label={label}
        multiline
        rows={4}
        variant="filled"
        sx={{width: '60%', margin: '2%'}}
    />
}