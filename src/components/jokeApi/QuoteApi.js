import React , {useState , useEffect} from 'react';
import {FaStar} from 'react-icons/fa';
import {v4 as uuid} from 'uuid';
import {API , graphqlOperation } from 'aws-amplify' ;
import {createContact} from '../../graphql/mutations';


export default function QuoteApi() {
    
    const [rating , setRating]= useState(null);
    const [hover , setHover] = useState(null);
    const [jokes,setJokes] = useState ("");
    
    const getJokes = () =>{
        fetch("https://type.fit/api/quotes")
        .then ((res) => res.json())
        .then ((data) => {
            let randumNum = Math.floor(Math.random() * data.length);
            setJokes(data[randumNum]);
        });
    }

    useEffect(() => {
        getJokes();
    },[]);

    const addNewContact = async () => {
        try {
            const newContact = {
                id: uuid(),
                name : jokes.text,
                email :jokes.author ,
                cell : rating ,
                profilePicPath: "joke"
            };

            

            // Persist new Contact
            await API.graphql(graphqlOperation(createContact, {input: newContact}));
        } catch(err) {
            console.log('error', err);
        }
    }

     
  return (
    <div>
       <p> {jokes.text}</p> 
       <br />
       <div className='starRating' >
            {[...Array(5)].map((star,index) => {
                const currentRating = index + 1 ;
                return (
                    <label key={index} >
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
                            onMouseEnter={()=> setHover(currentRating)}
                            onMouseLeave={()=> setHover(null)}
                            />
                    </label>
                );
            })}
            <p>your rating is {rating}</p>
        </div>
        
        <button onClick={getJokes}> Next quote</button>
        <button onClick={addNewContact}>Add quote &gt;&gt;</button>&nbsp; 
    </div>

  )
}
