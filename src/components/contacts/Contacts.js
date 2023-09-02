import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useState ,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {v4 as uuid} from 'uuid';
import {API , graphqlOperation , Storage} from 'aws-amplify' ;
import {createContact , updateContact , deleteContact} from '../../graphql/mutations';
import { listContacts } from '../../graphql/queries';



export default function Contacts() {

      
        const [contacts, setContacts] = useState([]);
        const [contactData , setContactData]= useState ({name:"",email:"",cell:""});
        const [profilePic, setProfilePic] = useState("");
        const [profilePicPaths, setProfilePicPaths] = useState([]);
        const [showForm , setShowForm ] = useState (false) ;

        

        const getContacts = async () => {
            try {
              const contactsData = await API.graphql(graphqlOperation(listContacts));
              console.log(contactsData);
          
              const contactsList = contactsData.data.listContacts.items;
              setContacts(contactsList);
          
              // Fetch image paths
              const promises = contactsList.map(async (contact) => {
                try {
                  const contactProfilePicPathURI = await Storage.get(contact.profilePicPath, { expires: 60 });
                  return contactProfilePicPathURI;
                } catch (err) {
                  console.log('error', err);
                  return null; // Handle the error gracefully
                }
              });
          
              // Wait for all promises to resolve and filter out any null values
              const resolvedProfilePicPaths = (await Promise.all(promises)).filter((path) => path !== null);
              setProfilePicPaths(resolvedProfilePicPaths);
            } catch (err) {
              console.log('error', err);
            }
          };
          
    
        useEffect(() => {
            getContacts() ;
            }, []);

        const addNewContact = async () => {
            try {
                const { name, email, cell } = contactData;
    
                // Upload pic to S3
                Storage.configure({ region: 'eu-central-1' });
                 const { key } = await Storage.put(`${uuid()}.png`, profilePic, {contentType: 'image/png'});
    
                const newContact = {
                    id: uuid(),
                    name,
                    email,
                    cell,
                    profilePicPath: key
                };
    
                // Persist new Contact
                await API.graphql(graphqlOperation(createContact, {input: newContact}));
                // After successfully adding the new contact, refresh the contacts
                await getContacts();
            } catch(err) {
                console.log('error', err);
            }
        }

    const editContent = async (contact) => {
        const { name, email, cell } = contactData;
    
                // Upload pic to S3
                Storage.configure({ region: 'eu-central-1' });
                 const { key } = await Storage.put(`${uuid()}.png`, profilePic, {contentType: 'image/png'});
    

            // Implement your edit logic here
        const updatedContact = {
            id: contact.id,
            name,
            email ,
            cell ,
            profilePicPath: key
        };
    
        try {
            await API.graphql({
            query: updateContact,
            variables: { input: updatedContact },
            });
            // After successfully adding the new contact, refresh the contacts
            await getContacts();
            // Handle success or update state as needed
        } catch (err) {
            // Handle error
            console.log('error', err);
        }
    };

    const deleteContent = async (contact) => {
        // Implement your delete logic here
        const deleteInput = { id: contact.id };

        try {
        await API.graphql({
            query: deleteContact,
            variables: { input: deleteInput },
        });
        // After successfully adding the new contact, refresh the contacts
        await getContacts();

        // Handle success or update state as needed
        } catch (err) {
        // Handle error
        console.log('error', err);
        
        }
    };

  return (
    <Container>
    <Row className="px-4 my-5">
        <Col><h1>Jokes</h1></Col>
        <Col> <button onClick={()=> setShowForm(true)}> Add Joke </button> </Col>
    </Row>
    <Row style={{display: "flex"}} >
        
        {
        contacts.map((contact, indx ) => {
            return (
        <Col className="px-2 my-2" key={indx}>
        <Card style={{ width: '12rem' }}>
       
        <Card.Img 
            src={profilePicPaths[indx] || ''}
            variant="top" />
            <Card.Body>
                <Card.Title>{contact.name} </Card.Title>
                <Card.Text>
                {contact.email}
                <br />{contact.cell}
                
                </Card.Text>
                <div style={{ display: "flex", gap: "10px" }}>
                <Button variant="primary" onClick={()=> {editContent(contact)}}> edit </Button> 
                <Button variant="primary" onClick={()=> {deleteContent(contact)}}> delete </Button>
                </div>
                
            </Card.Body>
        </Card>

        </Col>
            )
            })  
        }
    </Row>
    {showForm && (<Row className="px-4 my-5">
        <Col sm={3}>
            <h2>Add New Contact</h2>
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
    </Row>)}
    </Container>
  )
}
