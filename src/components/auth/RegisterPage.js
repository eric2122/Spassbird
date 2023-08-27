import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function RegisterPage() {
  return (
    <Container>
        <Row className="px-4 my-5">
            <Col><h1>Register</h1></Col>
        </Row>
        <Row className="px-4 my-5">
            <Col sm={6}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className='text-muted'>
                            We'll never share your email!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" minlength="8" placeholder="Enter your password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm</Form.Label>
                        <Form.Control type="password" minlength="8" placeholder="Enter your password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">Login &gt;&gt;</Button> &nbsp;
                </Form>
                </Col>
        </Row>
    </Container>
  )
}
