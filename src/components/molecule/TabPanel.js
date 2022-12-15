import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div className={"tabPanel"} hidden={value !== index}>
            {value === index && (
                <Box sx={{ paddingLeft:3,paddingRight:3  }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}