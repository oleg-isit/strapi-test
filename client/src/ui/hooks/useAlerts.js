import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import {lastMessageSelector} from "../../store/statuses/selectors";
import {useSnackbar} from "notistack";

const snackConfig = (snack, handleClose, variant, msg) => {
    snack(msg,
        {
            variant,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            transitionDuration: {enter: 300, exit: 300},
            autoHideDuration: 10000,
            onClose: (event, reason) => {
                handleClose(reason)
            },
            action: (key) => (<Fragment><Box onClick={() => {
                handleClose(key)
            }} sx={{cursor: "pointer"}}><CloseIcon sx={{fontSize: "20px", position: "absolute", top: 5, right: 5}}/></Box></Fragment>)
        });
}

export const useAlerts = () => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const message = useSelector(lastMessageSelector);
    useEffect(() => {
        if (message && message.type === "success") {
            snackConfig(enqueueSnackbar, closeSnackbar, "success", message.text)
        }
        if (message && message.type === "error") {
            snackConfig(enqueueSnackbar, closeSnackbar, "error", message.text);
        }
    }, [message])

};

