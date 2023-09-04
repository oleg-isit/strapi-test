import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import moment from "moment/moment";
import {Delete, Edit} from "@mui/icons-material";
import React from "react";

export const Product = ({id, name, description, publishedAt, imageUrl, setActive, setActiveType}) => {
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
