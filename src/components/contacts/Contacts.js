import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { hover } from '@testing-library/user-event/dist/hover';
import {FaStar} from 'react-icons/fa'
import { useState } from 'react';

export default function Contacts() {

        const [rating , setRating]= useState(null);
        const [hover , setHover] = useState(null);

  return (
    <Container>
    <Row className="px-4 my-5">
        <Col><h1>Jokes</h1></Col>
    </Row>
    <Row  >
        <Col className="px-2 my-2">
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src="/img/angry-birds.png" />
            <Card.Body>
                <Card.Title>Joke 1 : a man ,  who married </Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                <div className='starRating'>
                {[...Array(5)].map((star,index) => {
                    const currentRating = index + 1 ;
                    return (
                        <label >
                            <input 
                            type="radio"
                            name='rating'
                            value={currentRating}
                            onClick={()=> setRating(currentRating)}
                             />
                             <FaStar
                             className='star'
                             size={30}
                             color ={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9" }
                             onMousEnter={()=> setHover(currentRating)}
                             onMousLeave={()=> setHover(null)}
                             />
                        </label>
                    );
                })}
                <p>your rating is {rating}</p>
                </div>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>

        </Col>

    </Row>
   </Container>
  )
}
