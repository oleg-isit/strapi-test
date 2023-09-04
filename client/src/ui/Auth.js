import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Container from "@mui/material/Container";
import {Box, Button, TextField} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";

import {login} from "../store/auth/actions";
import {authStatusSelector} from "../store/statuses/selectors";


const schema = yup.object().shape({
    identifier: yup.string().email().required('Email is required field!'),
    password: yup.string().min(6, "Min length 6 symbols").required('Password is required field!'),
});
export const Auth = () => {
    const dispatch = useDispatch();
    const status = useSelector(authStatusSelector);
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = ({identifier, password}) => {

        dispatch(login({identifier, password}));
    };
    return (
        <Container
            sx={{width: "90vw", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{
                width: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                '& .MuiTextField-root': {width: "100%", height: 85},
            }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)()
                }}>
                    <TextField
                        error={errors.identifier}
                        label="Email"
                        helperText={errors?.identifier?.message}
                        {...register('identifier')}

                    />
                    <br/>
                    <TextField
                        error={errors.password}
                        label="Password"
                        helperText={errors?.password?.message}
                        {...register('password')}

                    />
                    <br/>
                    <input type="submit"  style={{display: "none"}}/>
                </form>

                <Button disabled={status === "pending"} size={"large"} sx={{width: "100%", height: 60}} onClick={handleSubmit(onSubmit)}
                        variant={"contained"}>Login</Button>
            </Box>


        </Container>
    );
};
