import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';



function UpdateUser() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()




    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' + id)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })
            .catch(err => console.log(err))

    }, [id])

    const Update = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/updateUser/' + id, { name, email, age })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }






    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '100vh',
                background: 'linear-gradient(135deg, #b1cee3ff, #ffffff)',
                padding: '20px',
            }}
        >
            <Form onSubmit={Update}
                className="p-4 shadow rounded"
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <h2 className="text-center mb-4">Update User</h2>

                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary w-100" type="submit">
                        Update
                    </Button>
                </div>
            </Form>
        </div>)
}

export default UpdateUser;