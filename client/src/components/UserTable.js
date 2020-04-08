import React, {useEffect, useState} from 'react';
import baseApi from '../apiConfig';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
function UserTable() {
    const [userData, setUserData] = useState([]);
    const [singleUser, setSingleUser] = useState({});
    const history = useHistory();
    useEffect(() => {
        baseApi.get('/user/basic-users').then(res => {
            setUserData(res.data);
        })
    },[])
     const handleButton = (e) => {
         let id = e.target.value;
         baseApi.put(`/user/basic-users/${id}`).then(res => {
            setSingleUser(res.data);
            window.location.reload();

         })
         .catch(() => alert("Something went wrong!"))
     }
     useEffect(() => {
     },[singleUser])
    return (
        <div>
            <h1 className='mt-3 p-2'>List of Users</h1><hr></hr>
            <table className='table'>
                <thead className='thead-dark'>
                    <tr>
                        <th scope='col'>User Name</th>
                        <th scope='col'>User Email</th>
                        <th scope='col'>Last Active</th>
                        <th scope='col'>Password</th>
                        <th scope='col'>login Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.length > 0 ?
                        (
                            userData.map(data => {
                                let time = moment(data.lastActive).format("h:mm a, MMMM Do YYYY ")
                                return(
                                    <tr key={data._id}>
                                        <td className='text-capitalize font-weight-bolder'>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{time}</td>
                                        <td>{data.password}</td>
                                        <td>
                                            <button className={data.disable ? "btn btn-danger" : "btn btn-info"} value={data._id} onClick={handleButton}>
                                                {data.disable ? "Enable": "Disable"}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ):
                        "Loading..."
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable
