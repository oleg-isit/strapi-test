import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from "moment"

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField,
    Typography
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";


import {resetStatus} from "../store/statuses/reducer";
import {deleteProduct, getAllProducts, updateProduct} from "../store/products/actions";
import {deleteProductStatusSelector, updateProductStatusSelector} from "../store/statuses/selectors";
import {productsSelector} from "../store/products/selectors";



const Product = ({id, name, description, publishedAt, imageUrl, setActive, setActiveType}) => {
    const handlerEdit = () => {
        setActive({id, name, description});
        setActiveType("edit")
    }
    const handlerDelete = () => {
        setActive({id, name, description});
        setActiveType("delete")
    }
    return (
        <Card sx={{minWidth: "22.5%", maxWidth: "22.5%", width: "22.5%", display: "flex", flexDirection: "column"}}>
            <CardMedia
                sx={{paddingTop: '50%', objectFit: "cover", width: "50%", margin: "0 auto"}}
                image={process.env.REACT_APP_URL + imageUrl.data.attributes.url}
                title="green iguana"
            />
            <CardContent sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{flexGrow: 1}} variant="h6" color="text.secondary">
                    {description}
                </Typography>
                <br/>
                <Typography variant="body1" color="text.secondary">
                    {moment(publishedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
            </CardContent>
            <CardActions>
                <Button startIcon={<Delete/>} color={"error"} size="large" onClick={handlerDelete}>Delete</Button>
                <Button startIcon={<Edit/>} size="large" onClick={handlerEdit}>Edit</Button>
            </CardActions>
        </Card>
    )
}

export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(productsSelector);
    const [active, setActive] = useState(null);
    const [activeType, setActiveType] = useState(null);
    useEffect(() => {
        dispatch(getAllProducts())
    }, []);

    return (
        <>
            <Container sx={{minWidth: "90vw", margin: "5vw auto", display: "flex", flexWrap: "wrap", gap: "2.5vw"}}>
                {(products && products.length) ?
                    products.map(({id, attributes: {name, description, publishedAt, image}}) => {
                        return <Product key={id} id={id} name={name} description={description} publishedAt={publishedAt}
                                        imageUrl={image} setActive={setActive} setActiveType={setActiveType}/>
                    }) : ""}
            </Container>
            <DeletePopUp active={active} isOpen={activeType === "delete"} setIsOpen={setActiveType}/>
            <EditPopUp active={active} isOpen={activeType === "edit"} setIsOpen={setActiveType}/>

        </>

    );
};


function DeletePopUp({isOpen, active, setIsOpen}) {
    const dispatch = useDispatch();
    const status = useSelector(deleteProductStatusSelector);
    console.log(status)
    useEffect(() => {
        if(status === "success") {
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
                    <Button color={"error"} onClick={handleDelete} autoFocus>
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

function EditPopUp({isOpen, active, setIsOpen}) {
    const dispatch = useDispatch();
    const status = useSelector(updateProductStatusSelector);
    useEffect(() => {
        if(status === "success") {
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
    const onSubmit = ({name, description}) => {
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
                    '& .MuiTextField-root': {m: 1, width: "100%"},
                    width: "500px"
                }}>

                    <TextField
                        error={errors.name}
                        label="Name"
                        helperText={errors?.name?.message}
                        {...register('name')}
                        defaultValue={active?.name}

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
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color={"error"} onClick={handleSubmit(onSubmit)} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
