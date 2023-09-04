import {useDispatch, useSelector} from "react-redux";
import {deleteProductStatusSelector, updateProductStatusSelector} from "../../store/statuses/selectors";
import React, {useEffect, useState} from "react";
import {resetStatus} from "../../store/statuses/reducer";
import {deleteProduct, updateProduct} from "../../store/products/actions";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export function DeletePopUp({isOpen, active, setIsOpen}) {
    const dispatch = useDispatch();
    const status = useSelector(deleteProductStatusSelector);
    useEffect(() => {
        if (status === "success") {
            setIsOpen(false);
        }
    }, [status]);
    useEffect(() => {
        return () => {
            dispatch(resetStatus("deleteProduct"))
        }
    }, [])
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleDelete = () => {
        dispatch(deleteProduct({id: active.id}))
    }
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Product Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Product deletion is irreversible, are you sure you want to delete it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={status === "pending"} color={"error"} onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const schema = yup.object().shape({
    name: yup.string().min(1, "Min length of name is 1 symbol").required('Name is required field!'),
    description: yup.string().min(1, "Min length of description is 1 symbol").max(40, "Max length 40 symbols").required('Description is required field!'),
});

export function EditPopUp({isOpen, active, setIsOpen}) {
    const dispatch = useDispatch();
    const status = useSelector(updateProductStatusSelector);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    console.log(name, description, "compoen")
    useEffect(() => {
        if (active) {
            setName(active.name);
            setDescription(active.description)

        }
    }, [active])
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        if (status === "success") {
            setIsOpen(false);
        }
    }, [status])
    useEffect(() => {
        return () => {
            dispatch(resetStatus("updateProduct"))
        }
    }, [])
    const handleClose = () => {
        setIsOpen(false);
    };
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(name, description, "submit")

        dispatch(updateProduct({id: active.id, name, description}));
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Product Update"}
                </DialogTitle>
                <DialogContent sx={{
                    '& .MuiTextField-root': {m: 1, width: "90%"},
                    width: "500px"
                }}>

                    <TextField
                        error={errors.name}
                        label="Name"
                        helperText={errors?.name?.message}
                        {...register('name')}
                        value={name}
                        onChange={handleName}

                    />
                    <br/>
                    <TextField
                        error={errors.description}
                        label="Description"
                        helperText={errors?.description?.message}
                        {...register('description')}
                        defaultValue={active?.description}
                        multiline
                        rows={3}
                        value={description}
                        onChange={handleDescription}

                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={status === "pending"} color={"error"} onClick={handleSubmit(onSubmit)} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
