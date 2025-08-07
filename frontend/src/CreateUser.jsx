import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser/", { name, email, age })
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
            <Form onSubmit={Submit}
                className="p-4 shadow rounded"
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <h2 className="text-center mb-4">Add New User</h2>

                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary w-100" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateUser;
