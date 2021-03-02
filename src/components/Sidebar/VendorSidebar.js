import React from 'react';

export default function VendorSidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
				<div className="logo d-flex align-items-center justify-content-start" style={{background: '#f8f9fa'}}>
					<a className="simple-text" href="#">
						<img src={require("assets/img/logo-4.png").default} style={{width:'210px', height:'50px'}} alt="..." />
					</a>
				</div>
            </div>
        </div>
    );
}