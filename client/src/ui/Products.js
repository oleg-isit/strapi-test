import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Container} from "@mui/material";

import {getAllProducts} from "../store/products/actions";

import {productsSelector} from "../store/products/selectors";
import {Product} from "./Components/Product";
import {DeletePopUp, EditPopUp} from "./Components/PopUps";

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

