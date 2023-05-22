'use client';

import {Button, Form, Container, Row, Col, InputGroup} from "react-bootstrap";
import Link from "next/link";


export async function checkCredentials(e) {
    e.preventDefault();
    const fields = e.target;
    const data = {
        email: fields.email.value,
        password: fields.password.value,
    };



    const response = await fetch(`http://localhost:8080/login`,{
        headers: {
            body: JSON.stringify(data),
            'Content-Type': 'application/json',
        },
        method: 'POST'
    }).then( response => response.json());

    console.log(response);

    if (response.status === 204) {
        const userResponse = await fetch(`http://localhost:8080/api/user`,{
            headers: {
                body: JSON.stringify(data),
                'Content-Type': 'application/json',
            },
        });

        console.log(userResponse);
    }
}

export default function LoginForm() {
    return (
        <section className="prose m-6">
            <Form method="post" onSubmit={checkCredentials}>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="LoginForm.Email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required={true} type="email" name={'email'} placeholder="demo@demo.com"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="loginForm.Pass">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required={true} type="password" name={'password'} placeholder="demo123"/>
                            </Form.Group>
                            <Form.Group>
                                    <span>
                                        Not yet a user? <Link href={'/account/register'}
                                                              variant={"secondary"}>Register</Link>
                                    </span>
                                <Button type={"submit"} style={{'float': 'right'}}>Login</Button>
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Form>
        </section>
    )
}