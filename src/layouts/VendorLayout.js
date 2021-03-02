import VendorNavbar from 'components/Navbars/VendorNavbar';
import VendorSidebar from 'components/Sidebar/VendorSidebar';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from "react-router-dom";
import Profile from 'views/vendor/Profile';

function VendorLayout() {
    return (
        <div className="wrapper">
            <ToastContainer />
            <VendorSidebar />

            <div className="main-panel">
                <VendorNavbar />

                <div className="content">
                    <Switch>
                        <Route exact path="/vendor/profile" component={Profile} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default VendorLayout;