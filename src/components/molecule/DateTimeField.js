import {TextField} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function DateTimeField({minDateTime,value,onChange}){


    return <div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
                label="Date"

                onChange={onChange}
                inputFormat={"DD/MM/YYYY hh:mm"}
                minDateTime={minDateTime}
                value={value}
                renderInput={(params) => <TextField sx={{width:'100%',marginTop:2,marginBottom:2}} {...params} required />}
            />
        </LocalizationProvider>
    </div>
}