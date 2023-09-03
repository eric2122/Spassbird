import React from 'react' ;
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useState ,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {v4 as uuid} from 'uuid';
import {API , graphqlOperation , Storage} from 'aws-amplify' ;
import {createContact , updateContact , deleteContact} from '../../graphql/mutations';


export default function EditcontentForm() {

    const [contacts, setContacts] = useState([]);
    const [contactData , setContactData]= useState ({name:"",email:"",cell:""});
    const [profilePic, setProfilePic] = useState("");
    const [profilePicPaths, setProfilePicPaths] = useState([]);

  return (
    <div>
        <Row className="px-4 my-5">
        <Col sm={3}>
            <h2>Edit New Contact</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Contact name"
                                    value={contactData.name} 
                                    onChange={evt => setContactData({...contactData, name:evt.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Contact email" 
                                    value={contactData.email} 
                                    onChange={evt => setContactData({...contactData, email:evt.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Cell</Form.Label>
                    <Form.Control type="text" placeholder="nnn-nnn-nnnn" 
                                    value={contactData.cell} 
                                    onChange={evt => setContactData({...contactData, cell:evt.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Profile Pic</Form.Label>
                    <Form.Control type="file" accept="image/png" 
                                    onChange={evt => setProfilePic(evt.target.files[0])} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={addNewContact}>Add Contact &gt;&gt;</Button>&nbsp;                        
            </Form>
        </Col>
    </Row>
    </div>
  )
}
