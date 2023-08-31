import React , {useState , useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import {API , graphqlOperation } from 'aws-amplify' ;
import {createContact} from '../../graphql/mutations';


export default function QuoteApi() {

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
                cell : "joke",
                profilePicPath: "joke"
            };

            console.log(jokes.text);

            // Persist new Contact
            await API.graphql(graphqlOperation(createContact, {input: newContact}));
        } catch(err) {
            console.log('error', err);
        }
    }
  return (
    <div>
        {jokes.text}
        {jokes.author}
        <button onClick={getJokes}> Get quote</button>
        <button onClick={addNewContact}>Add quote &gt;&gt;</button>&nbsp; 
    </div>

  )
}
