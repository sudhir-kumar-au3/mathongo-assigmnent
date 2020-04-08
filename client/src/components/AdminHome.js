import React from 'react'
import Dashboard from './Dashboard';
import UserTable from './UserTable';
function AdminHome() {
    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-md-3'>
                    <Dashboard></Dashboard>
                </div>
                <div className='col-md-9'>
                    <UserTable></UserTable>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminHome
