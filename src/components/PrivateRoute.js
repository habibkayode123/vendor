import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from "react-router";
import rolesPerms from "../roles-actions"
import { checkPageAccess } from '../utils/permissionsHelper'
import auth from '../auth/auth-helper';


const privateRoute = ({ component: Component, path, permittedPages, ...rest }) => {
    if (!auth.isAuthenticated())
        return <Route {...rest} render={(props) => (
        
            <Redirect to={{pathname: "/admin/login"}}/>
        )} />;
    const userRole = auth.isAuthenticated().user.role;
    const pages = rolesPerms.find(x => x.role === userRole).pages;
    const checkAccess = checkPageAccess(path, pages);
    const rests = {...rest, path};
    return <Route {...rests} render={(props) => (
        (checkAccess.isUserAuthorised != false && typeof checkAccess.isUserAuthorised != undefined) ?
        <Component {...props} actions={checkAccess.allowedActionsName} /> :
        <Redirect to={{pathname: "/admin"}}/>
    )} />;
}

export default privateRoute;
