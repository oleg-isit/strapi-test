import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Header} from "./Header";
import {Main} from "./Main";
import {Auth} from "./Auth";

import {useAlerts} from "./hooks/useAlerts";

import {checkToken} from "../store/auth/actions";
import {isAuthorizedSelector} from "../store/auth/selectors";



export const Routes = React.memo(() => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthorizedSelector);
    console.log(isAuth)
    useEffect(() => {
        if(isAuth === null) {
            dispatch(checkToken());
        }
    }, [])
    useAlerts();
    return (
        <div>
            <Header/>
            {isAuth !== null ? isAuth ? <Main/> : <Auth/> : null}
        </div>

    )
})


