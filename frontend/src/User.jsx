import React, { useState, useEffect } from 'react'
import './User.css'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import axios from 'axios';



function User() {
    const [users, setUsers] = useState([])

   useEffect(() => {
    axios.get('http://localhost:3001/getUser')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
}, []);

  const handelDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id)
        .then(res => {
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        })
        .catch(err => console.log(err));
};
    return (
        <> <div className="gradient-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
<h2 class="text-center mt-4 mb-5 fs-1 fw-bold text-secondary-emphasis border-bottom border-2 pb-2">
   User CRUD Dashboard
</h2>


                            <div className="d-flex justify-content-center mb-4">
                                <Link to="/create" className="btn btn-primary w-25 ">
                                    Add +
                                </Link>
                            </div>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th> Name</th>
                                        <th> Email</th>
                                        <th>Age</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user , index) => {
                                            return <tr key={index}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.age}</td>
                                                <td> <Link to={`/update/${user._id}`} className="btn btn-primary"> Update </Link></td>
                                                <td><button className="btn btn-danger" onClick={(e) => handelDelete(user._id)} >Delete</button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default User 
