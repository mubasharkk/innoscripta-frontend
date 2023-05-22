'use client';

import {Button, Form, Container, Row, Col, InputGroup} from "react-bootstrap";

export default function LoginForm() {
    return (
        <section className="prose m-6">
            <Form>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="demo@demo.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="password" placeholder="demo123" />
                            </Form.Group>
                            <Form.Group>
                                <Button type={"submit"}>Login</Button>
                                <Button  href={'/account/register'} variant={"secondary"} style={{'float': 'right'}}>
                                    Register
                                </Button>
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Form>
        </section>
    )
}