import React, {useEffect} from 'react';
import Typography from '@mui/material/Typography';

const Alert = ({type,msg,removeAlert, list}) => {
    useEffect(() => {
        const timeout = setTimeout (() => {
            removeAlert()
        },1000000)
        return () => clearTimeout(timeout)
    },[list])
	return <Typography  className={`alert alert-${type}`}>{msg}</Typography>
}

export default Alert

