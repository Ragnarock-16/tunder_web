import Tooltip from '@mui/material/Tooltip';

export default function Tip({child,title}) {
    return(
        <Tooltip title={title}>
            {child}
        </Tooltip>
    )
}